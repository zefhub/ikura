import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    queryCategory {
      id
      name
      icon
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($order: TransactionOrder) {
    queryTransaction(order: $order) {
      id
      amount
      date
      category {
        icon
        name
      }
    }
  }
`;

export const TRANSACTION_AMOUNT_AGGREGATE = gql`
  query TransactionAmountAggregate($filter: TransactionFilter) {
    aggregateTransaction(filter: $filter) {
      amountSum
    }
  }
`;
