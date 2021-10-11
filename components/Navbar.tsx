/* eslint-disable @next/next/no-html-link-for-pages */
import { Fragment, forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Navbar as StrapNavbar, Nav, Dropdown } from "react-bootstrap";
import NavbarSearch from "./NavbarSearch";
import { classNames } from "../utils";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <StrapNavbar expand="lg">
      <div className="container">
        <StrapNavbar.Toggle className="me-auto" aria-controls="navbar">
          <span className="navbar-toggler-icon" />
        </StrapNavbar.Toggle>
        {user ? (
          <Fragment>
            <Link href="/dashboard">
              <a className="navbar-brand me-auto">
                <img
                  src="/img/logo.svg"
                  alt="logo"
                  className="navbar-brand-img"
                />
              </a>
            </Link>
            <NavbarSearch />
            <div className="navbar-user">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <img
                    src={user?.picture || "/img/avatars/profiles/avatar-1.jpg"}
                    alt="profile"
                    className="avatar-img rounded-circle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end mt-3">
                  <Link href="/profile">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                  <Link href="/settings">
                    <a className="dropdown-item">Settings</a>
                  </Link>
                  <hr className="dropdown-divider" />
                  <a href="/api/auth/logout" className="dropdown-item">
                    Logout
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <StrapNavbar.Collapse className="me-lg-auto order-lg-first">
              <Nav>
                <Link href="/dashboard">
                  <a
                    className={classNames(
                      "nav-link",
                      router.asPath === "/dashboard" && "active"
                    )}
                  >
                    Dashboard
                  </a>
                </Link>
              </Nav>
            </StrapNavbar.Collapse>
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/">
              <a className="navbar-brand me-auto">
                <img
                  src="/img/logo.svg"
                  alt="logo"
                  className="navbar-brand-img"
                />
              </a>
            </Link>
            <StrapNavbar.Collapse className="me-lg-auto order-lg-last">
              <Nav>
                <Link href="/">
                  <a
                    className={classNames(
                      "nav-link",
                      router.asPath === "/" && "active"
                    )}
                  >
                    Features
                  </a>
                </Link>
              </Nav>
              <Nav>
                <a
                  href="/api/auth/login?returnTo=/dashboard"
                  className="nav-link"
                >
                  Login
                </a>
              </Nav>
            </StrapNavbar.Collapse>
          </Fragment>
        )}
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
