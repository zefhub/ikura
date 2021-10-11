import type { NextPage } from "next";
import { Fragment } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import NewTransaction from "../components/NewTransaction";

const Home: NextPage = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <div className="header-body">
            <div className="row align-items-end">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">Dashboard</h1>
              </div>
              <div className="col-auto">
                <NewTransaction />
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    <span className="h2 mb-0">$24,500</span>
                    <span
                      className="badge bg-success-soft mt-n1"
                      style={{ marginLeft: 5 }}
                    >
                      +3.5%
                    </span>
                  </div>
                  <div className="col-auto">
                    <span className="h2 fe fe-dollar-sign text-muted mb-0"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      Total Spend (month)
                    </h6>
                    <span className="h2 mb-0">763.5</span>
                  </div>
                  <div className="col-auto">
                    <span className="h2 fe fe-briefcase text-muted mb-0"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      Daily spend
                    </h6>
                    <span className="h2 mb-0">43.6</span>
                    <span
                      className="badge bg-danger-soft mt-n1"
                      style={{ marginLeft: 5 }}
                    >
                      +0.3%
                    </span>
                  </div>
                  <div className="col-auto">
                    <span className="h2 fe fe-briefcase text-muted mb-0"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      Count Purchases
                    </h6>
                    <span className="h2 mb-0">237</span>
                  </div>
                  <div className="col-auto">
                    <span className="h2 fe fe-clock text-muted mb-0"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
