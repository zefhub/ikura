import "../styles/theme.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { useApollo } from "../lib/apolloClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  console.log("pageProps", pageProps);

  return (
    <UserProvider>
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
    </UserProvider>
  );
}
export default MyApp;
