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
import Loading from "components/Loading";
import MobileNavbar from "components/MobileNavbar";

const GET_USER = gql`
  query queryUser($filter: UserFilter) {
    queryUser(filter: $filter) {
      id
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

    onAuthStateChanged(auth, (user: any) => {
      apolloClient
        .query({
          query: GET_USER,
          variables: { filter: { firebaseID: { eq: user.uid } } },
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
          }

          // Redirect if not loged in
          if (!user && pathname !== "/signin" && pathname !== "/signup") {
            replace("/signin");
          }
        });
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
            {loading ? <Loading /> : <Component {...pageProps} />}
            {user && <MobileNavbar />}
          </div>
        </UserContext.Provider>
        <Toaster />
      </ApolloProvider>
    </IntlProvider>
  );
}

export default CustomApp;
