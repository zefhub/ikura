import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import Dinero from "dinero.js";
import { DateTime } from "luxon";
import { GET_TRANSACTION, GET_TRANSACTIONS } from "constants/queries";
import Protected from "components/Protected";
import UpdateTransactionForm, {
  UpdateTransactionFormValues,
} from "forms/UpdateTransactionForm";
import Button from "components/Button";
import Loading from "components/Loading";
import { parseCurrency } from "utils/currency";

const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: [ID!]) {
    deleteTransaction(filter: { id: $id }) {
      count
    }
  }
`;

const Transaction: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS],
  });
  const { data, loading, error } = useQuery(GET_TRANSACTION, {
    variables: { id: router.query.id },
  });
  if (error) {
    console.error(error);
  }

  const onUpdate = async (values: UpdateTransactionFormValues) => {
    try {
      console.log("values", values);

      toast.success(
        intl.formatMessage({ defaultMessage: "Transaction updated" })
      );
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          id: [router.query.id],
        },
      });
      toast.success(
        intl.formatMessage({ defaultMessage: "Transaction deleted" })
      );
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const getInitialValues = () => {
    if (!data?.getTransaction) {
      return {};
    }

    const { amount, date, category } = data.getTransaction;
    return {
      amount: Dinero({ amount: amount, precision: 2 }).toFormat("$0,0.00"),
      date: DateTime.fromISO(date).toFormat("yyyy-MM-dd"),
      category: category.id,
    };
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Protected>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <button type="button" className="mr-2" onClick={() => router.back()}>
            <ArrowBack />
          </button>
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "Transaction" })}
          </h1>
        </div>
        <div className="mx-6">
          {data.getTransaction && (
            <UpdateTransactionForm
              onSubmit={onUpdate}
              initialValues={getInitialValues()}
            />
          )}
          <div className="flex flex-row justify-center mt-6">
            <Button
              type="button"
              onClick={onDelete}
              className="bg-gradient-to-br from-red-500 to-ikura-dark text-white mt-2"
            >
              {intl.formatMessage({ defaultMessage: "Delete" })}
            </Button>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Transaction;
