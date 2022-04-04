import React from "react";
import Link from "next/link";
import { House, Add } from "@mui/icons-material";

const MobileNavbar: React.FC = () => {
  return (
    <div className="w-full h-12 absolute bottom-0 shadow-reversed bg-white">
      <div className="h-full flex flex-row items-center justify-between px-4">
        <Link href="/">
          <a className="">
            <House />
          </a>
        </Link>
        <Link href="/">
          <a className="">
            <House />
          </a>
        </Link>
        <button
          type="button"
          className="w-12 h-12 rounded-full drop-shadow-xl mb-12 bg-gradient-to-br from-ikura-light to-ikura-dark text-white"
        >
          <Add />
        </button>
        <Link href="/">
          <a className="">
            <House />
          </a>
        </Link>
        <Link href="/">
          <a className="">
            <House />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavbar;
