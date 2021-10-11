import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import { getAccessToken } from "@auth0/nextjs-auth0";
import merge from "deepmerge";
import isEqual from "lodash.isequal";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

const httpLink = new HttpLink({
  uri: "https://throbbing-field-190027.us-west-2.aws.cloud.dgraph.io/graphql",
  // credentials: "same-origin",
  headers: (headers) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    console.log(getAccessToken());

    return { ...headers, authorization: token ? `Bearer ${token}` : "" };
  },
});

/*
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
*/

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

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
