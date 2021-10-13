import type { NextPage } from "next";
import Link from "next/link";

const Err404: NextPage = () => {
  return (
    <main>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-blue-500 font-bold">404 ERROR</h2>
          <h1 className="text-5xl font-bold">Page not found.</h1>
          <h3 className="text-gray-500 mt-2">
            Sorry, we could not find the page you are looking for.
          </h3>
          <Link href="/">
            <a className="p-2 pt-4 px-3 font-bold text-blue-500 hover:text-blue-400">
              Go back home
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Err404;
