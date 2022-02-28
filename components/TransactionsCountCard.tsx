import { memo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useIntl } from "react-intl";
import { DateTime } from "luxon";

const GET_TOTOAL_TRANSACTIONS = gql`
  query transactionsCount($from: DateTime!) {
    aggregateTransaction(
      filter: { and: { when: { ge: $from }, type: { eq: EXPENSE } } }
    ) {
      count
    }
  }
`;

const TransactionsCountCard: React.FC = () => {
  const intl = useIntl();

  const { loading, error, data } = useQuery(GET_TOTOAL_TRANSACTIONS, {
    variables: { from: DateTime.local().startOf("month").toString() },
  });
  if (error) {
    console.error(error);
  }

  const getCount = (): number => {
    if (data && data.aggregateTransaction && data.aggregateTransaction.count) {
      return data.aggregateTransaction.count.toLocaleString();
    }
    return 0;
  };

  return (
    <div className="card border-left-warning shadow h-100 py-2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              Count Purchases
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">
                    {intl.formatMessage({
                      defaultMessage: "Loading...",
                      description: "default loading",
                    })}
                  </span>
                </div>
              ) : (
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {getCount()}
                </div>
              )}
            </div>
          </div>
          <div className="col-auto">
            <i className="fas fa-calendar fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionsCountCard);
