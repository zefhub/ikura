import { Fragment, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHotkeys } from "react-hotkeys-hook";
import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";
import { FormikHelpers } from "formik";
import NewTransactionForm, {
  NewTransactionFormValues,
} from "../forms/NewTransactionForm";

const ADD_TRANSACTION_MUTATION = gql`
  mutation addTransaction($user: UserRef!, $amount: Float!, $when: DateTime!) {
    addTransaction(input: { user: $user, amount: $amount, when: $when }) {
      transaction {
        id
      }
    }
  }
`;

const NewTransaction: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const [addTransaction] = useMutation(ADD_TRANSACTION_MUTATION);

  // Register a keyboard shortcut
  useHotkeys("shift+t", () => setShow(true));

  const onSubmit = async (
    values: NewTransactionFormValues,
    { setSubmitting }: FormikHelpers<NewTransactionFormValues>
  ) => {
    console.log("values", values);
    try {
      await addTransaction({
        variables: {
          user: {
            username: "thedanielforum@gmail.com",
          },
          amount: Number(values.amount),
          when: DateTime.fromISO(values.when),
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
            <h4 className="card-header-title" id="exampleModalCenterTitle">
              Reigster Transaction
            </h4>
          </div>
          <div className="card-body">
            <NewTransactionForm
              onSubmit={onSubmit}
              onCancel={() => setShow(false)}
              initialValues={{ amount: "" }}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default NewTransaction;
