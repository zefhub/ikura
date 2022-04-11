import React from "react";
import RecentTransactions from "components/RecentTransactions";

const Transactions: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <RecentTransactions />
    </div>
  );
};

export default Transactions;
