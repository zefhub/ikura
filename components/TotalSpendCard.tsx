import { memo } from "react";
import { DateTime } from "luxon";
import { gql, useQuery } from "@apollo/client";

const GET_AMOUNT_MAX = gql`
  query totalTransactionsSum($from: DateTime!) {
    aggregateTransaction(
      filter: { and: { when: { ge: $from }, type: { eq: EXPENSE } } }
    ) {
      amountSum
    }
  }
`;

const TotalSpendCard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_AMOUNT_MAX, {
    variables: { from: DateTime.local().startOf("month").toString() },
  });
  if (error) {
    console.error(error);
  }

  const getAmount = (): number => {
    if (
      data &&
      data.aggregateTransaction &&
      data.aggregateTransaction.amountSum
    ) {
      return data.aggregateTransaction.amountSum.toLocaleString();
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
                Total Spend (month)
              </h6>
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span className="h2 mb-0">{getAmount()} 円</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TotalSpendCard);
