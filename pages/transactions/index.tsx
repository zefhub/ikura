import type { NextPage } from "next";
import Link from "next/link";
import { useIntl } from "react-intl";

const Transactions: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Transactions</h1>
      <p className="mb-4">
        DataTables is a third party plugin that is used to generate the demo
        table below. For more information about DataTables, please visit the.
      </p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            DataTables Example
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper dt-bootstrap4">
              <div className="row">
                <div className="col-sm-12"></div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered dataTable">
                    <thead>
                      <tr role="row"></tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div className="dataTables_info">
                    Showing 1 to 10 of 57 entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
