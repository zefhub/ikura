import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import UserContext from "contexts/User";

const Sidebar = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <Link href="/">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text">Ikura</div>
        </a>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li
        className={classNames("nav-item", { active: router.pathname === "/" })}
      >
        <Link href="/">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li
        className={classNames("nav-item", {
          active: router.pathname === "/transactions",
        })}
      >
        <Link href="/transactions">
          <a className="nav-link">
            <i className="fas fa-fw fa-coins"></i>
            <span>Transactions</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
