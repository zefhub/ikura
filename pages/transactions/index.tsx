import type { NextPage } from "next";
import Link from "next/link";
import { useIntl } from "react-intl";
import loadIntlMessages from "utils/loadIntlMessages";

const Transactions: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="header">
            <div className="header-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="header-pretitle">
                    {intl.formatMessage({
                      defaultMessage: "Overview",
                      description: "transactions header subTitle",
                    })}
                  </h6>
                  <h1 className="header-title">
                    {intl.formatMessage({
                      defaultMessage: "Transactions",
                      description: "transactions header title",
                    })}
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <ul className="nav nav-tabs nav-overflow header-tabs">
                    <li className="nav-item">
                      <Link href="/transactions">
                        <a className="nav-link text-nowrap active">
                          All transactions{" "}
                          <span className="badge rounded-pill bg-secondary-soft">
                            823
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/transactions">
                        <a className="nav-link text-nowrap">
                          Expenses{" "}
                          <span className="badge rounded-pill bg-secondary-soft">
                            832
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/transactions">
                        <a className="nav-link text-nowrap">
                          Income{" "}
                          <span className="badge rounded-pill bg-secondary-soft">
                            8
                          </span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col"></div>
              <div className="col-auto me-n3">
                <div className="choices"></div>
              </div>
              <div className="col-auto"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-sm table-hover table-nowrap card-table">
              <thead>
                <tr></tr>
              </thead>
            </table>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <ul className="list-pagination-prev pagination pagination-tabs card-pagination">
              <li className="page-item">
                <a className="page-link ps-0 pe-4 border-end" href="#">
                  <i className="fe fe-arrow-left me-1"></i> Prev
                </a>
              </li>
            </ul>
            <ul className="list-pagination pagination pagination-tabs card-pagination">
              <li className="active">
                <a className="page" href="#" data-i="1" data-page="10">
                  1
                </a>
              </li>
              <li>
                <a className="page" href="#" data-i="2" data-page="10">
                  2
                </a>
              </li>
              <li>
                <a className="page" href="#" data-i="3" data-page="10">
                  3
                </a>
              </li>
            </ul>
            <ul className="list-pagination-next pagination pagination-tabs card-pagination">
              <li className="page-item">
                <a className="page-link ps-4 pe-0 border-start" href="#">
                  Next <i className="fe fe-arrow-right ms-1"></i>
                </a>
              </li>
            </ul>
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

export default Transactions;
