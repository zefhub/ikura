import "styles/global.scss";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { IntlProvider } from "react-intl";
import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "lib/apolloClient";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { locale, defaultLocale } = useRouter();
  const apolloClient = useApollo(pageProps);

  return (
    <IntlProvider
      locale={locale || ""}
      defaultLocale={defaultLocale}
      messages={pageProps.intlMessages}
    >
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="icon" href="/favicon/favicon.ico" />
            <title>Ikura</title>
          </Head>
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </SessionProvider>
    </IntlProvider>
  );
}

export default CustomApp;
