import React from "react";
import { useIntl } from "react-intl";
import { useQuery, gql } from "@apollo/client";
import { PieChart, Pie, LabelList } from "recharts";
import Dinero from "dinero.js";
import Loading from "components/Loading";

const GET_CATEGORY_CHART_DATA = gql`
  query categoryChartData($filter: TransactionFilter) {
    queryTransaction(filter: $filter) {
      id
      amount
      category {
        id
        icon
        name
      }
    }
  }
`;

export interface CategoryChartProps {
  dateStart?: Date;
  dateEnd?: Date;
}

const CategoryChart: React.FC<CategoryChartProps> = (props) => {
  const intl = useIntl();
  const {
    data: pieChartData,
    loading,
    error,
  } = useQuery(GET_CATEGORY_CHART_DATA, {
    variables: {
      filter:
        props.dateStart && props.dateEnd
          ? { date: { between: { min: props.dateStart, max: props.dateEnd } } }
          : {},
    },
  });
  if (error) {
    console.error(error);
  }

  const formatChartData = () => {
    let data: {
      name: string;
      icon: string;
      value: number;
      categoryId: string;
    }[] = [];

    if (!pieChartData || !pieChartData.queryTransaction) {
      return data;
    }

    pieChartData.queryTransaction.forEach((item: any) => {
      const categoryIndex = data.findIndex(
        (c) => c.categoryId === item.category.id
      );
      if (item.amount < 0) {
        if (categoryIndex !== -1) {
          data[categoryIndex].value += Math.abs(item.amount);
        } else {
          data.push({
            icon: item.category.icon,
            name: item.category.name,
            value: Math.abs(item.amount),
            categoryId: item.category.id,
          });
        }
      }
    });

    return data;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          data={formatChartData()}
          dataKey="value"
          nameKey="icon"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#82ca9d"
          // label
        >
          <LabelList
            dataKey="icon"
            position="outside"
            offset={5}
            color="#000"
            fill="#000"
            fontSize={23}
            fontWeight="bold"
            // formatter={(value: any) => {
            //   console.log("value", value);
            //   return value;
            // }}
          />
        </Pie>
      </PieChart>
      <div>
        <h2 className="text-lg font-semibold">
          {intl.formatMessage({ defaultMessage: "Spend by category" })}
        </h2>
        {formatChartData().map((item: any) => (
          <div
            key={`row-${item.categoryId}`}
            className="flex flex-row justify-between items-center py-2"
          >
            <div className="flex flex-row">
              <div className="flex flex-row justify-center items-center w-12 h-12 bg-blue-100 rounded-lg">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <div className="flex flex-col justify-center ml-2">
                <h1 className="font-semibold">{item.name}</h1>
              </div>
            </div>
            <h1 className="text-lg font-semibold text-red-500">
              -&nbsp;
              {Dinero({ amount: item.value, precision: 2 }).toFormat("$0,0.00")}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
