import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { DateTime } from "luxon";
import { useIntl } from "react-intl";
import DatePicker from "react-datepicker";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { TRANSACTION_AMOUNT_AGGREGATE } from "constants/queries";
import { GET_TRANSACTIONS } from "constants/queries";
import Protected from "components/Protected";
import LargeNumberCard from "components/LargeNumberCard";
import SmallNumberCard from "components/SmallNumberCard";
import Transaction from "components/Transaction";
import CategoryChart from "components/CategoryChart";

const Dashboard: NextPage = () => {
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

  const { data: transactions, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      order: { desc: "date" },
      filter: { date: { between: { min: dateStart, max: dateEnd } } },
      limit: 30,
    },
  });
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <Protected>
      <div className="max-w-screen-md ml-auto mr-auto">
        <div className="flex flex-row">
          <div className="w-1/2 mr-2">
            <div className="flex flex-col items-center">
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
            </div>
            <div className="flex flex-row justify-start">
              <CategoryChart />
            </div>
          </div>
          <div className="w-1/2 ml-2 pt-2">
            <div className="flex flex-row justify-between">
              {/* @ts-ignore */}
              <DatePicker
                selected={dateStart.toJSDate()}
                onChange={(date: Date) =>
                  setDateStart(DateTime.fromJSDate(date))
                }
                className="mr-2 rounded-md"
              />
              {/* @ts-ignore */}
              <DatePicker
                selected={dateEnd.toJSDate()}
                onChange={(date: Date) => setDateEnd(DateTime.fromJSDate(date))}
                className="rounded-md"
              />
            </div>
            <div>
              {!transactions?.queryTransaction.length ? (
                <p className="w-full mt-2">
                  {intl.formatMessage({ defaultMessage: "No transactions" })}
                </p>
              ) : (
                <Fragment>
                  {transactions.queryTransaction.map((transaction: any) => (
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
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Dashboard;
