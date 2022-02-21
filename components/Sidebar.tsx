import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "contexts/User";

const Sidebar = () => {
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
      <li className="nav-item active">
        <Link href="/">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
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
