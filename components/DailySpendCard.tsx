import { Fragment, memo } from "react";
import { DateTime } from "luxon";
import { gql, useQuery } from "@apollo/client";

const GET_AMOUNT_AVG = gql`
  query totalTransactionsAmountAverage($from: DateTime!) {
    aggregateTransaction(filter: { when: { gt: $from } }) {
      amountAvg
    }
  }
`;

const DailySpendCard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_AMOUNT_AVG, {
    variables: { from: DateTime.local().startOf("month") },
  });
  if (error) {
    console.error(error);
  }

  const getAmount = (): number => {
    if (
      data &&
      data.aggregateTransaction &&
      data.aggregateTransaction.amountAvg
    ) {
      return data.aggregateTransaction.amountAvg;
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
                  <span className="h2 mb-0">{getAmount()} 円</span>
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
            <div className="col-auto">
              <span className="h2 fe fe-dollar-sign text-muted mb-0"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DailySpendCard);
