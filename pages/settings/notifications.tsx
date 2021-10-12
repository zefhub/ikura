import type { NextPage } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const SettingsNotifications: NextPage = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <div className="header-body">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">Settings</h1>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <ul className="nav nav-tabs nav-overflow header-tabs">
                  <li className="nav-item">
                    <Link href="/settings">
                      <a className="nav-link">General</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/settings/categories">
                      <a className="nav-link">Categories</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/settings/notifications">
                      <a className="nav-link active">Notifications</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container"></div>
    </Fragment>
  );
};

export default withPageAuthRequired(SettingsNotifications);
