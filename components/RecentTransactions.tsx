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

import React, { Fragment } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "constants/queries";
import Transaction from "components/Transaction";
import Loading from "components/Loading";

export interface RecentTransactionsProps {
  dateStart?: Date;
  dateEnd?: Date;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = (props) => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      order: { desc: "date" },
      filter:
        props.dateStart && props.dateEnd
          ? { date: { between: { min: props.dateStart, max: props.dateEnd } } }
          : {},
    },
  });
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <div className="w-full overflow-y-scroll my-3">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-semibold">
          {intl.formatMessage({ defaultMessage: "Recent Transactions" })}
        </h3>
        <Link href="/transactions">
          <a className="text-gray-400 text-sm">
            {intl.formatMessage({ defaultMessage: "See all" })}
          </a>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!data?.queryTransaction.length ? (
            <p className="w-full mt-2">
              {intl.formatMessage({ defaultMessage: "No transactions" })}
            </p>
          ) : (
            <Fragment>
              {data.queryTransaction.map((transaction: any) => (
                <Transaction
                  key={transaction.id}
                  id={transaction.id}
                  category={transaction.category}
                  amount={transaction.amount}
                  date={transaction.date}
                />
              ))}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
