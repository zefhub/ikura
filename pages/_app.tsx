import "styles/sb-admin-2/scss/sb-admin-2.scss";
import "styles/sb-admin-2/vendor/fontawesome-free/css/all.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "firebase/analytics";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { IntlProvider } from "react-intl";
import classNames from "classnames";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebaseApp from "lib/firebase";
import { UserContext } from "contexts/User";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Loading from "components/Loading";

function CustomApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale, replace, pathname } = useRouter();
  const auth = getAuth(firebaseApp);
  const apolloClient = useApollo(pageProps, auth);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analytics = getAnalytics(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user && pathname !== "/signin" && pathname !== "/signup") {
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
          <div id="wrapper" className={classNames("", { "vh-100": loading })}>
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div className="content">
                <Navbar />
                {loading ? <Loading /> : <Component {...pageProps} />}
              </div>
              <Footer />
            </div>
          </div>
        </UserContext.Provider>
        <Toaster />
      </ApolloProvider>
    </IntlProvider>
  );
}

export default CustomApp;
