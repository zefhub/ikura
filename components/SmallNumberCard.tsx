import React from "react";
import { useIntl } from "react-intl";
import classNames from "classnames";
import Dinero from "dinero.js";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export interface SmallNumberCardProps {
  amount: number;
  type: "income" | "expense";
}

const SmallNumberCard: React.FC<SmallNumberCardProps> = (props) => {
  const intl = useIntl();

  return (
    <div
      className={classNames(
        "w-full flex flex-row justify-start items-center mx-2 px-4 py-3 rounded-xl",
        {
          "bg-green-300": props.type === "income",
          "bg-red-200": props.type === "expense",
          "bg-slate-200": !props.type,
        }
      )}
    >
      {props.type === "income" && (
        <ArrowUpward className="mr-2 text-green-700" />
      )}
      {props.type === "expense" && (
        <ArrowDownward className="mr-2 text-red-700" />
      )}
      <div>
        <span
          className={classNames("font-light", {
            "text-green-700": props.type === "income",
            "text-red-700": props.type === "expense",
          })}
        >
          {props.type === "income" &&
            intl.formatMessage({ defaultMessage: "Income" })}
          {props.type === "expense" &&
            intl.formatMessage({ defaultMessage: "Expense" })}
        </span>
        <h5
          className={classNames("font-medium", {
            "text-green-700": props.type === "income",
            "text-red-700": props.type === "expense",
          })}
        >
          {Dinero({ amount: props.amount, precision: 2 }).toFormat("$0,0.00")}
        </h5>
      </div>
    </div>
  );
};

export default SmallNumberCard;
