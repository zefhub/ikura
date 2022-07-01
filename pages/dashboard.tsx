import type { NextPage } from "next";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import { useQuery, gql } from "@apollo/client";
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

  const { data: transactions, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      order: { desc: "date" },
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
    </Protected>
  );
};

export default Dashboard;
