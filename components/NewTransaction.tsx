import { Fragment, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHotkeys } from "react-hotkeys-hook";
import { useAuthUser } from "next-firebase-auth";
import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";
import { FormikHelpers } from "formik";
import NewTransactionForm, {
  NewTransactionFormValues,
} from "../forms/NewTransactionForm";

const ADD_TRANSACTION_MUTATION = gql`
  mutation addTransaction(
    $user: UserRef!
    $amount: Float!
    $when: DateTime!
    $category: CategoryRef!
  ) {
    addTransaction(
      input: { user: $user, amount: $amount, when: $when, category: $category }
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
      title
    }
  }
`;

const NewTransaction: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  // Register a keyboard shortcut
  useHotkeys("shift+t", () => setShow(true));

  const user = useAuthUser();
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
            id: user?.id,
          },
          amount: Number(values.amount),
          when: DateTime.fromISO(values.when),
          category: {
            id: values.category,
          },
        },
      });
      setSubmitting(false);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary lift"
        onClick={() => setShow(true)}
      >
        New Transaction
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard
      >
        <div className="modal-card card">
          <div className="card-header">
            <h4 className="card-header-title">Reigster Transaction</h4>
          </div>
          <div className="card-body" style={{ maxHeight: "none" }}>
            <NewTransactionForm
              onSubmit={onSubmit}
              onCancel={() => setShow(false)}
              initialValues={{ amount: "" }}
              loading={categories.loading}
              categories={categories.data?.queryCategory}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default NewTransaction;
