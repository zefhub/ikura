import type { NextPage } from "next";
import { useIntl } from "react-intl";
import loadIntlMessages from "utils/loadIntlMessages";
import NewTransaction from "components/NewTransaction";
import TransactionsCountCard from "components/TransactionsCountCard";
import DailySpendCard from "components/DailySpendCard";
import TotalSpendCard from "components/TotalSpendCard";
import RecentTransactions from "components/RecentTransactions";

const Home: NextPage = (props) => {
  const intl = useIntl();

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          {intl.formatMessage({
            defaultMessage: "Dashboard",
            description: "index page title",
          })}
        </h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-plus fa-sm text-white-50"></i> New Transaction
        </a>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Net Worth
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $40,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <TotalSpendCard />
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <DailySpendCard />
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <TransactionsCountCard />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
    },
  };
};

export default Home;
