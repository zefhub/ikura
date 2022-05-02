import React from "react";
import { useIntl } from "react-intl";
import { DateTime } from "luxon";
import Dinero from "dinero.js";

export interface TransactionProps {
  amount: number;
  date: string;
  category: {
    icon: string;
    name: string;
  };
}

const Transaction: React.FC<TransactionProps> = (props) => {
  const intl = useIntl();

  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="flex flex-row">
        <div className="flex flex-row justify-center items-center w-12 h-12 bg-blue-100 rounded-lg">
          <span className="text-3xl">{props.category?.icon}</span>
        </div>
        <div className="flex flex-col justify-center ml-2">
          <h1 className="font-semibold">{props.category?.name}</h1>
          <h2 className="text-sm">
            {props.date && DateTime.fromISO(props.date).toFormat("dd/MM/yyyy")}
          </h2>
        </div>
      </div>
      <h1 className="text-lg font-semibold text-green-700">
        {Dinero({ amount: props.amount, precision: 2 }).toFormat("$0,0.00")}
      </h1>
    </div>
  );
};

export default Transaction;
