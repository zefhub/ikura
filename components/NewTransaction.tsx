import { Fragment, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHotkeys } from "react-hotkeys-hook";
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

const NewTransaction: React.FC = () => {
  const intl = useIntl();
  const { locale } = useRouter();
  const user = useContext(UserContext);

  const [show, setShow] = useState<boolean>(false);

  // Register a keyboard shortcut
  useHotkeys("shift+t", () => setShow(true));

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
      setShow(false);
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
    <Fragment>
      <button
        type="button"
        className="btn btn-primary lift"
        onClick={() => setShow(true)}
      >
        {intl.formatMessage({
          defaultMessage: "Expense",
          description: "new expense button",
        })}
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard
      >
        <div className="modal-card card">
          <div className="card-header">
            <h4 className="card-header-title">Reigster Expense</h4>
          </div>
          <div className="card-body" style={{ maxHeight: "none" }}>
            <NewTransactionForm
              onSubmit={onSubmit}
              onCancel={() => setShow(false)}
              initialValues={{ amount: "" }}
              loading={categories.loading}
              categories={getCategories()}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default NewTransaction;
