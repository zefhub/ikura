import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";
import { Navbar as BsNavbar, Nav, Dropdown } from "react-bootstrap";
import UserContext from "contexts/User";
import DropdownToggle from "components/DropdownToggle";

const Navbar: React.FC = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const intl = useIntl();
  const auth = getAuth();

  const onLogout = async () => {
    try {
      await auth.signOut();
      toast.success("signed out");
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <BsNavbar className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"></form>
      <ul className="navbar-nav ml-auto">
        <Dropdown className="nav-item no-arrow">
          <Dropdown.Toggle as={DropdownToggle} className="nav-link">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {auth.currentUser?.displayName || auth.currentUser?.email}
            </span>
            <img
              className="img-profile rounded-circle"
              src={
                auth.currentUser?.photoURL ||
                "https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg"
              }
              alt="profile"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link href="/settings">
              <a className="dropdown-item">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                &nbsp;Account
              </a>
            </Link>
            <div className="dropdown-divider" />
            <button type="button" className="dropdown-item" onClick={onLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              &nbsp;Logout
            </button>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </BsNavbar>
  );
};

export default Navbar;
