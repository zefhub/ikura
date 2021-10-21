import type { NextPage } from "next";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import loadIntlMessages from "../helpers/loadIntlMessages";
import NewTransaction from "../components/NewTransaction";
import Header from "../components/Header";
import TransactionsCountCard from "../components/TransactionsCountCard";
import DailySpendCard from "../components/DailySpendCard";
import TotalSpendCard from "../components/TotalSpendCard";
import RecentTransactions from "../components/RecentTransactions";

const Home: NextPage = (props) => {
  const intl = useIntl();

  return (
    <Fragment>
      <Header
        title={intl.formatMessage({
          defaultMessage: "Dashboard",
          description: "index header title",
        })}
        subTitle={intl.formatMessage({
          defaultMessage: "Overview",
          description: "index header subTitle",
        })}
      >
        <NewTransaction />
      </Header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      Net Worth
                    </h6>
                    <span className="h2 mb-0">$0</span>
                    {false && (
                      <span
                        className="badge bg-success-soft mt-n1"
                        style={{ marginLeft: 5 }}
                      >
                        +3.5%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TotalSpendCard />
          <DailySpendCard />
          <TransactionsCountCard />
        </div>
        <div className="row">
          <div className="col-12">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (ctx: any) => {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
