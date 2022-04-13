import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

const Settings: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-center mt-4 mx-4">
        <Link href="/account">
          <a className="mr-2">
            <ArrowBack />
          </a>
        </Link>
        <h1 className="text-2xl font-semibold">
          {intl.formatMessage({ defaultMessage: "Settings" })}
        </h1>
      </div>
    </div>
  );
};

export default Settings;
