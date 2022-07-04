import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";
import { parseCurrency } from "utils/currency";
import { Dialog, Menu } from "@headlessui/react";
import TransactionForm, { TransactionFormValues } from "forms/TransactionForm";
import {
  GET_TRANSACTIONS,
  TRANSACTION_AMOUNT_AGGREGATE,
} from "constants/queries";
import logo from "assets/images/logo.png";

const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: [AddTransactionInput!]!) {
    addTransaction(input: $input) {
      transaction {
        id
      }
    }
  }
`;

const HeaderNavbar: React.FC = () => {
  const intl = useIntl();
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
              description: values.description,
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
    <header className="sticky top-0 h-12 border-b-2 border-gray-500 w-full mb-2">
      <div className="max-w-screen-md ml-auto mr-auto">
        <div className="flex justify-between pt-2">
          <button
            type="button"
            className="rounded-full bg-gradient-to-br from-ikura-light to-ikura-dark text-white pr-2 pl-2 h-7"
            onClick={() => setOpen(true)}
          >
            Add transaction
          </button>
          <Link href="/dashboard">
            <a>
              <Image src={logo} alt="logo" width={30} height={30} />
            </a>
          </Link>
          <Menu>
            <Menu.Button>
              <Image
                src={session?.user?.image || "https://via.placeholder.com/150"}
                alt="profile"
                className="rounded-full"
                width={30}
                height={30}
              />
            </Menu.Button>
            <Menu.Items
              className="z-50 absolute bg-white rounded-md shadow-xl top-14 p-4 border-2 border-gray-100 flex flex-col"
              style={{ right: "85vh" }}
            >
              <Menu.Item>
                <Link href="/account/settings">
                  <a className="mb-3">Account settings</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/account/categories">
                  <a>Categories</a>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black opacity-30" />
        <div className="mr-auto ml-auto" style={{ width: "55vh" }}>
          <div
            className="z-50 w-full absolute top-0 m-4 p-4 bg-white rounded-md shadow-xl"
            style={{ width: 400 }}
          >
            <TransactionForm onSubmit={onNewTransaction} initialValues={{}} />
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default HeaderNavbar;
