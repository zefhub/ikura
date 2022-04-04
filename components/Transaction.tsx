import React from "react";
import { useIntl } from "react-intl";

const Transaction: React.FC = () => {
  const intl = useIntl();

  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="flex flex-row">
        <div className="flex flex-row justify-center items-center w-12 h-12 bg-blue-100 rounded-lg">
          <span className="text-3xl">🚕</span>
        </div>
        <div className="flex flex-col justify-center ml-2">
          <h1 className="font-semibold">Taxi</h1>
          <h2 className="text-sm">Transportation</h2>
        </div>
      </div>
      <h1 className="text-lg font-semibold text-green-700">
        + $ {intl.formatNumber(9384)}
      </h1>
    </div>
  );
};

export default Transaction;
