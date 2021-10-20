import { Fragment, memo } from "react";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";

const GET_AMOUNT_MAX = gql`
  query totalTransactionsSum($from: DateTime!) {
    aggregateTransaction(
      filter: { and: { when: { ge: $from }, type: { eq: EXPENSE } } }
    ) {
      amountSum
    }
  }
`;

const DailySpendCard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_AMOUNT_MAX, {
    variables: { from: DateTime.local().startOf("month").toString() },
  });
  if (error) {
    console.error(error);
  }

  const days = Math.ceil(
    DateTime.local().diff(DateTime.local().startOf("month"), ["days"]).days
  );

  const getAmount = (): number => {
    if (
      data &&
      data.aggregateTransaction &&
      data.aggregateTransaction.amountSum
    ) {
      return Math.ceil(data.aggregateTransaction.amountSum / days);
    }
    return 0;
  };

  return (
    <div className="col-12 col-lg-6 col-xl">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">Daily spend</h6>
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Fragment>
                  <span className="h2 mb-0">
                    {getAmount().toLocaleString()} 円
                  </span>
                  {false && (
                    <span
                      className="badge bg-danger-soft mt-n1"
                      style={{ marginLeft: 5 }}
                    >
                      +0.3%
                    </span>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DailySpendCard);
