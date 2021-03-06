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

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useSession } from "next-auth/react";
import classNames from "classnames";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import {
  House,
  TableRows,
  Insights,
  AccountCircle,
  Add,
} from "@mui/icons-material";
import { parseCurrency } from "utils/currency";
import {
  GET_TRANSACTIONS,
  TRANSACTION_AMOUNT_AGGREGATE,
} from "constants/queries";
import TransactionForm, { TransactionFormValues } from "forms/TransactionForm";

const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: [AddTransactionInput!]!) {
    addTransaction(input: $input) {
      transaction {
        id
      }
    }
  }
`;

const MobileNavbar: React.FC = () => {
  const intl = useIntl();
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const [addTransaction] = useMutation(ADD_TRANSACTION, {});

  const [open, setOpen] = useState<boolean>(false);

  const onNewTransaction = async (values: TransactionFormValues) => {
    try {
      let amount = values.type === "income" ? values.amount : -values.amount;

      await addTransaction({
        variables: {
          input: [
            {
              amount: parseCurrency(amount),
              date: values.date,
              category: { id: values.category },
              user: {
                // @ts-ignore
                id: session.user?.id,
              },
            },
          ],
        },
        refetchQueries: [GET_TRANSACTIONS, TRANSACTION_AMOUNT_AGGREGATE],
      });
      toast.success(
        intl.formatMessage({ defaultMessage: "Transaction added" })
      );
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="w-full h-12 fixed bottom-0 shadow-reversed bg-white lg:hidden">
        <div className="h-full flex flex-row items-center justify-between px-6">
          <Link href="/">
            <a
              className={classNames("", {
                "text-ikura-dark": pathname === "/",
              })}
            >
              <House />
            </a>
          </Link>
          <Link href="/transactions">
            <a
              className={classNames("", {
                "text-ikura-dark": pathname.startsWith("/transaction"),
              })}
            >
              <TableRows />
            </a>
          </Link>
          <button
            type="button"
            className="w-12 h-12 rounded-full drop-shadow-xl mb-12 bg-gradient-to-br from-ikura-light to-ikura-dark text-white"
            onClick={() => setOpen(true)}
          >
            <Add />
          </button>
          <Link href="/analytics">
            <a
              className={classNames("", {
                "text-ikura-dark": pathname.startsWith("/analytics"),
              })}
            >
              <Insights />
            </a>
          </Link>
          <Link href="/account">
            <a
              className={classNames("", {
                "text-ikura-dark": pathname.startsWith("/account"),
              })}
            >
              <AccountCircle />
            </a>
          </Link>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black opacity-30" />
        <div
          className="flex flex-col items-start z-50 w-11/12 absolute top-0 m-4 p-4 bg-white rounded-md shadow-xl"
          style={{ maxWidth: "400" }}
        >
          <TransactionForm onSubmit={onNewTransaction} initialValues={{}} />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default MobileNavbar;
