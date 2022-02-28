import { useContext } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";
import { FormikHelpers } from "formik";
import { getTitleLang } from "utils";
import UserContext from "contexts/User";
import NewTransactionForm, {
  NewTransactionFormValues,
} from "forms/NewTransactionForm";

const ADD_TRANSACTION_MUTATION = gql`
  mutation addTransaction(
    $user: UserRef!
    $type: TransactionType!
    $amount: Float!
    $when: DateTime!
    $category: CategoryRef!
  ) {
    addTransaction(
      input: {
        user: $user
        type: $type
        amount: $amount
        when: $when
        category: $category
      }
    ) {
      transaction {
        id
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query allCategories {
    queryCategory(order: { desc: createdAt }) {
      id
      type
      title
      titleLangEn
      titleLangJa
    }
  }
`;

export interface NewTransactionProps {
  show: boolean;
  onHide: (arg: boolean) => void;
}

const NewTransaction: React.FC<NewTransactionProps> = (props) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const user = useContext(UserContext);

  const [addTransaction] = useMutation(ADD_TRANSACTION_MUTATION);
  const categories = useQuery(GET_CATEGORIES_QUERY);

  if (categories.error) {
    console.error(categories.error);
    return <p>Something whent wrong</p>;
  }

  const onSubmit = async (
    values: NewTransactionFormValues,
    { setSubmitting }: FormikHelpers<NewTransactionFormValues>
  ) => {
    try {
      await addTransaction({
        variables: {
          user: {
            id: user?.uid,
          },
          type: "EXPENSE",
          amount: Number(values.amount),
          when: DateTime.fromISO(values.when),
          category: {
            id: values.category,
          },
        },
        refetchQueries: [
          "totalTransactionsSum",
          "recentTransactionsTable",
          "transactionsCount",
        ],
      });
      // analytics.logEvent("add_transaction");
      setSubmitting(false);
      props.onHide(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = () => {
    if (categories && categories.data && categories.data.queryCategory) {
      return categories.data.queryCategory.map((category: any) => {
        const title =
          category.type === "DEFAULT"
            ? getTitleLang(locale, category)
            : category.title;
        return { ...category, title };
      });
    }
    return [];
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      backdrop="static"
      keyboard
    >
      <div className="modal-card card">
        <div className="card-header text-primary">Reigster Expense</div>
        <div className="card-body" style={{ maxHeight: "none" }}>
          <NewTransactionForm
            onSubmit={onSubmit}
            onCancel={() => props.onHide(false)}
            initialValues={{ amount: "" }}
            loading={categories.loading}
            categories={getCategories()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewTransaction;
