/* eslint-disable @next/next/no-html-link-for-pages */
import { forwardRef } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useAuthUser } from "next-firebase-auth";
import Link from "next/link";
import { Navbar as StrapNavbar, Nav, Dropdown } from "react-bootstrap";
import NavbarSearch from "./NavbarSearch";
import { classNames } from "../utils";

const Navbar: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();
  const user = useAuthUser();

  if (!user.id) {
    return null;
  }

  return (
    <StrapNavbar expand="lg">
      <div className="container">
        <StrapNavbar.Toggle className="me-auto" aria-controls="navbar">
          <span className="navbar-toggler-icon" />
        </StrapNavbar.Toggle>
        <Link href="/">
          <a className="navbar-brand me-auto">
            <img src="/img/logo.png" alt="logo" className="navbar-brand-img" />
          </a>
        </Link>
        <NavbarSearch />
        <div className="navbar-user">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <img
                src={user?.photoURL || "/img/avatars/default.png"}
                alt="profile"
                className="avatar-img rounded-circle"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end mt-3">
              <Link href="/settings">
                <a className="dropdown-item">
                  {intl.formatMessage({
                    defaultMessage: "Settings",
                    description: "navbar dropdown option",
                  })}
                </a>
              </Link>
              <hr className="dropdown-divider" />
              <a onClick={() => user.signOut()} className="dropdown-item">
                {intl.formatMessage({
                  defaultMessage: "Logout",
                  description: "navbar dropdown option",
                })}
              </a>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <StrapNavbar.Collapse className="me-lg-auto order-lg-first">
          <Nav>
            <Link href="/">
              <a
                className={classNames(
                  "nav-link",
                  router.asPath === "/" && "active"
                )}
              >
                {intl.formatMessage({
                  defaultMessage: "Dashboard",
                  description: "navbar",
                })}
              </a>
            </Link>
          </Nav>
        </StrapNavbar.Collapse>
      </div>
    </StrapNavbar>
  );
};

// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef(({ children, onClick }: any, ref: any) => (
  <a
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="avatar avatar-sm dropdown-toggle"
  >
    {children}
  </a>
));

export default Navbar;
