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

export const GET_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      amount
      date
      category {
        id
        icon
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      givenName
      familyName
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

/*
export const ANALYTICS_CATEGORIES_SUM = gql`
  query analyticsCategoriesSum($filter: TransactionFilter) {
    queryCategories(filter: $filter) {
      id
    }
  }
`;
*/
