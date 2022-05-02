import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import loadIntlMessages from "utils/loadIntlMessages";

const Err404: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center mt-8">
      <h6 className="text-4xl mb-5">
        {intl.formatMessage({ defaultMessage: "404" })}
      </h6>
      <h1>There’s no page here 😭</h1>
      <p className="mb-6">Looks like you ended up here by accident?</p>
      <Link href="/">
        <a className="px-6 py-3 rounded-full drop-shadow-lg bg-ikura-dark text-white">
          {intl.formatMessage({ defaultMessage: "Return to your dashboard" })}
        </a>
      </Link>
    </div>
  );
};

export async function getStaticProps(ctx: any) {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
    },
  };
}

export default Err404;
