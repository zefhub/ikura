import React from "react";
import { useIntl } from "react-intl";
import classNames from "classnames";
import Dinero from "dinero.js";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export interface SmallNumberCardProps {
  amount: number;
}

const SmallNumberCard: React.FC<SmallNumberCardProps> = (props) => {
  const intl = useIntl();

  return (
    <div
      className={classNames(
        "w-full flex flex-row justify-start items-center mx-2 px-4 py-3 rounded-xl",
        {
          "bg-green-300": props.amount > 0,
          "bg-red-200": props.amount < 0,
          "bg-slate-200": props.amount === 0,
        }
      )}
    >
      {props.amount > 0 ? (
        <ArrowUpward
          className={classNames("mr-2", {
            "text-green-700": props.amount > 0,
            "text-red-700": props.amount < 0,
          })}
        />
      ) : (
        <ArrowDownward
          className={classNames("mr-2", {
            "text-green-700": props.amount > 0,
            "text-red-700": props.amount < 0,
          })}
        />
      )}
      <div>
        <span
          className={classNames("font-light", {
            "text-green-700": props.amount > 0,
            "text-red-700": props.amount < 0,
          })}
        >
          {props.amount > 0
            ? intl.formatMessage({ defaultMessage: "Income" })
            : intl.formatMessage({ defaultMessage: "Expense" })}
        </span>
        <h5
          className={classNames("font-medium", {
            "text-green-700": props.amount > 0,
            "text-red-700": props.amount < 0,
          })}
        >
          {Dinero({ amount: props.amount, precision: 2 }).toFormat("$0,0.00")}
        </h5>
      </div>
    </div>
  );
};

export default SmallNumberCard;
