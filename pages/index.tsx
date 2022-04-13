import type { NextPage } from "next";
import { useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { TRANSACTION_AMOUNT_AGGREGATE } from "constants/queries";
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
    <div className="flex flex-col items-center p-5">
      <LargeNumberCard />
      <div className="w-full flex flex-row justify-between">
        <SmallNumberCard amount={income?.aggregateTransaction.amountSum || 0} />
        <SmallNumberCard
          amount={expense?.aggregateTransaction.amountSum || 0}
        />
      </div>
      <RecentTransactions />
    </div>
  );
};

export default Home;
