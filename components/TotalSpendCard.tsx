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
    <div className="card border-left-primary shadow h-100 py-2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              {intl.formatMessage({
                defaultMessage: "Total Spend (month)",
                description: "TotalSpendCard title",
              })}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {intl.formatMessage(
                {
                  defaultMessage: "{amount} $",
                  description: "monetary amount readout",
                },
                {
                  amount: intl.formatNumber(getAmount()),
                }
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

export default memo(TotalSpendCard);
