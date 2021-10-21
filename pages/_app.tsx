import "../styles/theme.scss";
import "sweetalert2/src/sweetalert2.scss";
import "firebase/analytics";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import initAuth from "../lib/initAuth";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import firebase from "firebase/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

initAuth();

function CustomApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale } = useRouter();
  const user = useAuthUser();
  const apolloClient = useApollo(pageProps, user);

  useEffect(() => {
    if (firebase.apps.length > 0) {
      const analytics = firebase.analytics();

      firebase.auth().onIdTokenChanged((user) => {
        if (user) {
          analytics.setUserId(user.uid);
        }
      });
    }
  }, [firebase.apps.length]);

  return (
    <IntlProvider
      locale={locale || ""}
      defaultLocale={defaultLocale}
      messages={pageProps.intlMessages}
    >
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon/favicon.ico" />
          <title>Ikura</title>
        </Head>
        <Navbar />
        <div className="main-content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ApolloProvider>
    </IntlProvider>
  );
}

export default withAuthUser<any>()(CustomApp);
