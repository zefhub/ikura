import NextAuth from "next-auth";
import * as jwt from "jsonwebtoken";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  region: process.env.NEXT_AUTH_AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  adapter: DynamoDBAdapter(client, {
    tableName: process.env.NEXT_AUTH_TABLE_NAME as string,
  }),
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    // maxAge: 60 * 60 * 24 * 30,

    encode: async ({ secret, token }: any) => {
      // Zefhub user object
      let user: any = {};

      // During initial flow the token does not have any user data.
      if (token?.email) {
        // Register user on zefhub to get uid.
        const serverToken = await jwt.sign(
          { ...token, aud: "ikura.app", admin: true },
          secret,
          {
            algorithm: "HS256",
            expiresIn: "1h",
          }
        );

        const client = new ApolloClient({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: {
            "X-Auth-Token": "Bearer " + serverToken,
          },
        });
        const users = await client.mutate({
          mutation: gql`
            mutation upfetchUser($email: String!) {
              upfetchUser(input: [{ email: $email }]) {
                user {
                  id
                }
              }
            }
          `,
          variables: {
            email: token.email,
          },
        });

        // Get user from zefhub.
        if (users.data?.upfetchUser?.user) {
          for (const zefUser of users.data.upfetchUser.user) {
            user.id = zefUser.id;
          }
        }
      }

      return jwt.sign(
        {
          ...token,
          ...user,
          aud: "ikura.app",
          iss: "https://www.ikura.app",
        },
        secret,
        {
          algorithm: "HS256",
          // expiresIn: 30 * 24 * 60 * 60,
        }
      );
    },
    // @ts-ignore
    decode: async ({ secret, token }: any) => {
      return jwt.verify(token, secret, { algorithms: ["HS256"] });
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      session.user = { ...session.user, id: token.id };

      return session;
    },
  },
});
