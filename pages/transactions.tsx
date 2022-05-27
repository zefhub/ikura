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

import type { NextPage } from "next";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "constants/queries";
import Protected from "components/Protected";
import Loading from "components/Loading";
import Transaction from "components/Transaction";

const Transactions: NextPage = () => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      order: { desc: "date" },
    },
  });
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <Protected>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "All transactions" })}
          </h1>
        </div>
      </div>
      <div className="w-full overflow-y-scroll my-3 px-5 pb-12">
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
    </Protected>
  );
};

export default Transactions;
