import type { NextPage } from "next";
import { useIntl } from "react-intl";

const Analytics: NextPage = () => {
  const intl = useIntl();

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "Analytics" })}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
