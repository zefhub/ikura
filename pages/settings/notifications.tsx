import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import loadIntlMessages from "../../helpers/loadIntlMessages";

const SettingsNotifications: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="header">
            <div className="header-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="header-pretitle">Overview</h6>
                  <h1 className="header-title">
                    {intl.formatMessage({
                      defaultMessage: "Settings",
                      description: "settings page-header settings",
                    })}
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <ul className="nav nav-tabs nav-overflow header-tabs">
                    <li className="nav-item">
                      <Link href="/settings">
                        <a className="nav-link">
                          {intl.formatMessage({
                            defaultMessage: "General",
                            description: "settings menu general",
                          })}
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/categories">
                        <a className="nav-link">
                          {intl.formatMessage({
                            defaultMessage: "Categories",
                            description: "settings menu categories",
                          })}
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/notifications">
                        <a className="nav-link active">
                          {intl.formatMessage({
                            defaultMessage: "Notifications",
                            description: "settings menu notifications",
                          })}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p>Coming soon</p>
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

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsNotifications);
