import type { NextPage } from "next";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "constants/queries";
import Protected from "components/Protected";
import Loading from "components/Loading";
import Transaction from "components/Transaction";

const Transactions: NextPage = () => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      order: {},
    },
  });
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <Protected>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "All transactions" })}
          </h1>
        </div>
      </div>
      <div className="w-full overflow-y-scroll my-3 px-5 pb-12">
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
                  <Transaction
                    key={transaction.id}
                    category={transaction.category}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                ))}
              </Fragment>
            )}
          </div>
        )}
      </div>
    </Protected>
  );
};

export default Transactions;
