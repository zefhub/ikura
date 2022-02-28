import { memo, forwardRef } from "react";
import { DateTime } from "luxon";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useIntl } from "react-intl";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const GET_RECENT_TRANSACTIONS = gql`
  query recentTransactionsTable {
    queryTransaction(first: 10, order: { desc: when }) {
      id
      type
      amount
      when
      category {
        id
        title
      }
    }
  }
`;

const DELETE_TRANSACTION_MUTATION = gql`
  mutation deleteTransactionMutation($id: ID!) {
    deleteTransaction(filter: { id: [$id] }) {
      msg
    }
  }
`;

const DeleteAlert = withReactContent(Swal);

const RecentTransactions: React.FC = () => {
  const intl = useIntl();

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: {},
  });
  if (error) {
    console.error(error);
  }

  const getList = (data: any) => {
    if (data && data.queryTransaction) {
      return data.queryTransaction;
    }
    return [];
  };

  const onDelete = async (id: string) => {
    const { isConfirmed } = await DeleteAlert.fire({
      title: "Are you sure?",
      text: "Do you want to delete this transaction?",
      icon: "question",
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      reverseButtons: true,
    });
    if (isConfirmed) {
      await deleteTransaction({
        variables: { id },
        refetchQueries: ["totalTransactionsSum"],
      });
      await refetch();
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Recent Transactions
        </h6>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">
              {intl.formatMessage({
                defaultMessage: "Loading...",
                description: "default loading",
              })}
            </span>
          </div>
        ) : getList(data).length > 0 ? (
          <div className="table-responsive">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <span className="text-muted list-sort">Amount</span>
                      </th>
                      <th>
                        <span className="text-muted list-sort">Type</span>
                      </th>
                      <th>
                        <span className="text-muted list-sort">Date</span>
                      </th>
                      <th>
                        <span className="text-muted list-sort">Categories</span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="list" style={{ borderTop: "0" }}>
                    {getList(data).map((transaction: any) => (
                      <tr key={transaction.id}>
                        <td>
                          {intl.formatMessage(
                            {
                              defaultMessage: "{amount} $",
                              description: "monetary amount readout",
                            },
                            {
                              amount: intl.formatNumber(transaction.amount),
                            }
                          )}
                        </td>
                        <td>
                          {transaction.type === "EXPENSE"
                            ? intl.formatMessage({
                                defaultMessage: "Expense",
                                description: "recent transactions table",
                              })
                            : intl.formatMessage({
                                defaultMessage: "Income",
                                description: "recent transactions table",
                              })}
                        </td>
                        <td>
                          {DateTime.fromISO(transaction.when).toFormat(
                            "dd/MM/yyyy"
                          )}
                        </td>
                        <td>{transaction.category?.title}</td>
                        <td className="text-end">
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => onDelete(transaction.id)}
                              >
                                Delete
                              </button>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="dataTables_info" role="status">
                  Showing 1 to 10 of 57 entries
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body text-center">
            <span>No data</span>
          </div>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef(({ onClick }: any, ref: any) => (
  <a
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="dropdown-ellipses dropdown-toggle"
    style={{ cursor: "pointer" }}
  >
    <i className="fe fe-more-vertical" />
  </a>
));

export default memo(RecentTransactions);
