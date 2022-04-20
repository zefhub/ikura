import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash.isequal";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  // credentials: "include",
});

export async function fetchSession() {
  const res = await fetch("/api/auth/token");
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

const authLink = setContext(async (_, { headers }) => {
  const session = await fetchSession();

  const modifiedHeader = {
    headers: {
      ...headers,
      "X-Auth-Token": session?.accessToken
        ? `Bearer ${session.accessToken}`
        : "",
    },
  };
  return modifiedHeader;
});

function createApolloClient(token) {
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined",
    link: from([authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        TransactionAggregateResult: {
          keyFields: [],
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null, token) {
  // TODO: Fix this, it's just a shit show.
  let _apolloClient = apolloClient ?? createApolloClient(token);
  if (token) {
    _apolloClient = createApolloClient(token);
  }

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
