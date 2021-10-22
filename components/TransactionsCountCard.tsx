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
    <div className="col-12 col-lg-6 col-xl">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                Count Purchases
              </h6>
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
                <span className="h2 mb-0">{getCount()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionsCountCard);
