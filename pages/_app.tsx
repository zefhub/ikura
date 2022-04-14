import "styles/global.scss";
import "firebase/analytics";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { IntlProvider } from "react-intl";
import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebaseApp from "lib/firebase";
import { UserContext, User } from "contexts/User";
import { GET_USER } from "constants/queries";
import Loading from "components/Loading";
import MobileNavbar from "components/MobileNavbar";

const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        id
      }
    }
  }
`;

function CustomApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale, replace, pathname } = useRouter();
  const auth = getAuth(firebaseApp);
  const apolloClient = useApollo(pageProps, auth);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics(firebaseApp);

    // TODO: Clean this up
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        apolloClient
          .query({
            query: GET_USER,
            variables: { filter: { firebaseID: { eq: user?.uid } } },
          })
          .then((firebaseUser: any) => {
            // Make sure we have a user
            if (
              firebaseUser.data.queryUser &&
              firebaseUser.data.queryUser.length > 0
            ) {
              setUser({
                ...user,
                id: firebaseUser.data.queryUser[0].id,
              });
              setLoading(false);
            } else {
              apolloClient
                .mutate({
                  query: ADD_USER,
                  variables: {
                    input: [{ firebaseID: user.uid }],
                  },
                })
                .then((addUser: any) => {
                  console.log("linked firebase user to zef user");
                  setUser({
                    ...user,
                    id: addUser.data.addUser[0].id,
                  });
                  setLoading(false);
                });
            }
          });
      } else {
        setLoading(false);
      }

      // Redirect if not loged in
      if (!user && pathname !== "/signin") {
        replace("/signin");
      }
    });
  }, []);

  return (
    <IntlProvider
      locale={locale || ""}
      defaultLocale={defaultLocale}
      messages={pageProps.intlMessages}
    >
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="icon" href="/favicon/favicon.ico" />
          <title>Ikura</title>
        </Head>
        <UserContext.Provider value={user}>
          <div className="h-screen md:h-full">
            <div className="pb-12">
              {loading ? <Loading /> : <Component {...pageProps} />}
            </div>
            {user && <MobileNavbar />}
          </div>
        </UserContext.Provider>
        <Toaster />
      </ApolloProvider>
    </IntlProvider>
  );
}

export default CustomApp;
