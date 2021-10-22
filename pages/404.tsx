import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import loadIntlMessages from "../helpers/loadIntlMessages";

const Err404: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 col-xl-4 my-5">
          <div className="text-center">
            <h6 className="text-uppercase text-muted mb-4">404 error</h6>
            <h1 className="display-4 mb-3">There’s no page here 😭</h1>
            <p className="text-muted mb-4">
              Looks like you ended up here by accident?
            </p>
            <Link href="/">
              <a className="btn btn-lg btn-primary">Return to your dashboard</a>
            </Link>
          </div>
        </div>
      </div>
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
