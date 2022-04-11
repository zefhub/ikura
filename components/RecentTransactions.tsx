import React, { Fragment } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";
import Transaction from "components/Transaction";
import Loading from "components/Loading";

const TRANSACTIONS_QUERY = gql`
  query RecentTransactions {
    queryTransaction {
      id
      amount
      date
    }
  }
`;

const RecentTransactions: React.FC = () => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(TRANSACTIONS_QUERY);
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <div className="w-full my-3">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-semibold">
          {intl.formatMessage({ defaultMessage: "Recent Transactions" })}
        </h3>
        <Link href="/transactions">
          <a className="text-gray-400 text-sm">
            {intl.formatMessage({ defaultMessage: "See all" })}
          </a>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!data?.queryTransaction.length ? (
            <p className="w-full mt-2">
              {intl.formatMessage({ defaultMessage: "No transactions" })}
            </p>
          ) : (
            <Fragment>
              {data.queryTransaction.map((transaction: any) => (
                <Transaction key={transaction.id} />
              ))}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
