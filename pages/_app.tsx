import "../styles/theme.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import initAuth from "../lib/initAuth";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

initAuth();

function CustomApp({ Component, pageProps }: AppProps) {
  const user = useAuthUser();
  const apolloClient = useApollo(pageProps, user);

  return (
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
  );
}

export default withAuthUser<any>()(CustomApp);
