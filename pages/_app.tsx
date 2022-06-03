/**
 * Copyright 2022 Synchronous Technologies Pte Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "styles/global.scss";
import type { AppProps } from "next/app";
import React from "react";
import Script from "next/script";
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
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-E7Q21JYW7B"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-E7Q21JYW7B');
            `}
          </Script>
          {/* @ts-ignore */}
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </SessionProvider>
    </IntlProvider>
  );
}

export default CustomApp;
