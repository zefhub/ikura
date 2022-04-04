import React from "react";
import { useIntl } from "react-intl";
import Transaction from "components/Transaction";

const RecentTransactions: React.FC = () => {
  const intl = useIntl();

  return (
    <div className="w-full my-3">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-semibold">
          {intl.formatMessage({ defaultMessage: "Recent Transactions" })}
        </h3>
        <button type="button" className="text-gray-400 text-sm">
          {intl.formatMessage({ defaultMessage: "See all" })}
        </button>
      </div>
      <div>
        <Transaction />
        <Transaction />
      </div>
    </div>
  );
};

export default RecentTransactions;
