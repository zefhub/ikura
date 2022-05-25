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
import { useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { TRANSACTION_AMOUNT_AGGREGATE } from "constants/queries";
import Protected from "components/Protected";
import LargeNumberCard from "components/LargeNumberCard";
import SmallNumberCard from "components/SmallNumberCard";
import RecentTransactions from "components/RecentTransactions";

const Home: NextPage = () => {
  const intl = useIntl();
  const { data: income, error: incomeError } = useQuery(
    TRANSACTION_AMOUNT_AGGREGATE,
    {
      variables: { filter: { and: [{ amount: { gt: 0 } }] } },
    }
  );
  if (incomeError) {
    console.error(incomeError);
    toast.error(incomeError.message);
  }
  const { data: expense, error: expenseError } = useQuery(
    TRANSACTION_AMOUNT_AGGREGATE,
    {
      variables: { filter: { and: [{ amount: { lt: 0 } }] } },
    }
  );
  if (expenseError) {
    console.error(expenseError);
    toast.error(expenseError.message);
  }

  return (
    <Protected>
      <div className="flex flex-col items-center p-5">
        <LargeNumberCard />
        <div className="w-full flex flex-row justify-between">
          <SmallNumberCard
            amount={income?.aggregateTransaction.amountSum || 0}
            type="income"
          />
          <SmallNumberCard
            amount={expense?.aggregateTransaction.amountSum || 0}
            type="expense"
          />
        </div>
        <RecentTransactions />
      </div>
    </Protected>
  );
};

export default Home;
