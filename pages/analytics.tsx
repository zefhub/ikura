import type { NextPage } from "next";
import { useIntl } from "react-intl";
import { useQuery, gql } from "@apollo/client";
import { PieChart, Pie, LabelList } from "recharts";
import Protected from "components/Protected";
import Loading from "components/Loading";

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const GET_CATEGORY_CHART_DATA = gql`
  query categoryChartData {
    queryTransaction {
      id
      amount
      category {
        id
        icon
      }
    }
  }
`;

const Analytics: NextPage = () => {
  const intl = useIntl();
  const {
    data: pieChartData,
    loading,
    error,
  } = useQuery(GET_CATEGORY_CHART_DATA, {});
  console.log("pieChartData", pieChartData?.queryTransaction);
  const a = pieChartData?.queryTransaction.reduce(
    (total: any[], currentValue: any, currentIndex: number, arr: any[]) => {
      console.log("total", total);
      const itemIndex = total.findIndex(
        (x: any) => x.categoryId === currentValue.category.id
      );
      if (itemIndex !== -1) {
        return (total[itemIndex].value += currentValue.amount);
      }
      return [
        ...total,
        {
          id: currentValue.id,
          categoryId: currentValue.category.id,
          name: currentValue.category.icon,
          value: currentValue.amount,
        },
      ];
    },
    []
  );

  console.log(a);

  return (
    <Protected>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "Analytics" })}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        {loading ? (
          <Loading />
        ) : (
          <PieChart width={300} height={300}>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#82ca9d"
              // label
            >
              <LabelList
                dataKey="name"
                position="outside"
                offset={5}
                color="#000"
                fill="#000"
                fontSize={15}
                fontWeight="bold"
                formatter={(value: any) => {
                  console.log("value", value);
                  return value + "♥️";
                }}
              />
            </Pie>
          </PieChart>
        )}
      </div>
    </Protected>
  );
};

export default Analytics;
