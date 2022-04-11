import type { NextPage } from "next";
import { useIntl } from "react-intl";
import { gql, useQuery } from "@apollo/client";
import LargeNumberCard from "components/LargeNumberCard";
import SmallNumberCard from "components/SmallNumberCard";
import RecentTransactions from "components/RecentTransactions";

const Home: NextPage = () => {
  const intl = useIntl();
  // const {} = useQuery()

  return (
    <div className="flex flex-col items-center p-5">
      <LargeNumberCard />
      <div className="w-full flex flex-row justify-between">
        <SmallNumberCard amount={1022} />
        <SmallNumberCard amount={-9382} />
      </div>
      <RecentTransactions />
    </div>
  );
};

export default Home;
