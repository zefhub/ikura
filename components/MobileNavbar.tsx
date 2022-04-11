import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { gql, useMutation } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import {
  House,
  TableRows,
  Insights,
  AccountCircle,
  Add,
} from "@mui/icons-material";
import TransactionForm, { TransactionFormValues } from "forms/TransactionForm";

const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: TransactionInput!) {
    addTransaction(input: $input) {
      id
    }
  }
`;

const MobileNavbar: React.FC = () => {
  const { pathname } = useRouter();
  const [addTransaction] = useMutation(ADD_TRANSACTION, {});

  const [open, setOpen] = useState<boolean>(false);

  const onNewTransaction = async (values: TransactionFormValues) => {
    console.log(values);
  };

  return (
    <Fragment>
      <div className="w-full h-12 absolute bottom-0 shadow-reversed bg-white">
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
        <div className="flex flex-col items-start z-50 w-11/12 absolute top-0 m-4 p-4 bg-white rounded-md shadow-xl">
          <TransactionForm onSubmit={onNewTransaction} initialValues={{}} />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default MobileNavbar;
