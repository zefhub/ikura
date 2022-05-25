/**
 * Copyright 2022 Synchronous Technologies Pte Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { useIntl } from "react-intl";
import { DateTime } from "luxon";
import classNames from "classnames";
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
      <h1
        className={classNames("text-lg font-semibold", {
          "text-green-700": props.amount > 0,
          "text-red-500": props.amount < 0,
        })}
      >
        {Dinero({ amount: props.amount, precision: 2 }).toFormat("$0,0.00")}
      </h1>
    </div>
  );
};

export default Transaction;
