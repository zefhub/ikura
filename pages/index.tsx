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
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { TRANSACTION_AMOUNT_AGGREGATE } from "constants/queries";
import Protected from "components/Protected";
import LargeNumberCard from "components/LargeNumberCard";
import SmallNumberCard from "components/SmallNumberCard";
import RecentTransactions from "components/RecentTransactions";

const Home: NextPage = () => {
  const intl = useIntl();
  const [dateStart, setDateStart] = useState(DateTime.now().startOf("month"));
  const [dateEnd, setDateEnd] = useState(DateTime.now());

  const { data: income, error: incomeError } = useQuery(
    TRANSACTION_AMOUNT_AGGREGATE,
    {
      variables: {
        filter: {
          and: [
            { amount: { gt: 0 } },
            { date: { between: { min: dateStart, max: dateEnd } } },
          ],
        },
      },
    }
  );
  if (incomeError) {
    console.error(incomeError);
    toast.error(incomeError.message);
  }
  const { data: expense, error: expenseError } = useQuery(
    TRANSACTION_AMOUNT_AGGREGATE,
    {
      variables: {
        filter: {
          and: [
            { amount: { lt: 0 } },
            { date: { between: { min: dateStart, max: dateEnd } } },
          ],
        },
      },
    }
  );
  if (expenseError) {
    console.error(expenseError);
    toast.error(expenseError.message);
  }

  useEffect(() => {
    const width = screen.width;
    if (width > 992) {
      window.location.replace("/dashboard");
    }
  }, []);

  return (
    <Protected>
      <div className="flex flex-col items-center p-5 lg:max-w-screen-md lg:self-center">
        <div className="pr-5 pl-5">
          <div className="flex flex-row justify-between w-full">
            {/* @ts-ignore */}
            <DatePicker
              selected={dateStart.toJSDate()}
              onChange={(date: Date) => setDateStart(DateTime.fromJSDate(date))}
              className="rounded-md w-36"
              wrapperClassName="mr-7"
            />

            {/* @ts-ignore */}
            <DatePicker
              selected={dateEnd.toJSDate()}
              onChange={(date: Date) => setDateEnd(DateTime.fromJSDate(date))}
              className="rounded-md w-36"
              wrapperClassName=""
            />
          </div>
        </div>
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
        <RecentTransactions
          dateStart={dateStart.toJSDate()}
          dateEnd={dateEnd.toJSDate()}
        />
      </div>
    </Protected>
  );
};

export default Home;
