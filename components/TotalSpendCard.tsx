import { memo } from "react";
import { useIntl } from "react-intl";
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
  const intl = useIntl();

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
      return data.aggregateTransaction.amountSum;
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
                {intl.formatMessage({
                  defaultMessage: "Total Spend (month)",
                  description: "TotalSpendCard title",
                })}
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
                <span className="h2 mb-0">
                  {intl.formatMessage(
                    {
                      defaultMessage: "{amount} $",
                      description: "monetary amount readout",
                    },
                    {
                      amount: intl.formatNumber(getAmount()),
                    }
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TotalSpendCard);
