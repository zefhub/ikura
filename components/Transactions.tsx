import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";

const GET_LATEST_TRANSACTIONS = gql`
  query queryTransaction {
    queryTransaction(first: 10) {
      amount
    }
  }
`;

const Transactions: React.FC = () => {
  const { data, error } = useQuery(GET_LATEST_TRANSACTIONS);
  console.log("data", data);
  console.log("error", error);

  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <input
        type="text"
        id="rounded-email"
        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Search..."
      />
      <ul className="flex flex-col divide divide-y w-full">
        <li className="flex flex-row items-center justify-between p-2">
          <div className="flex flex-row items-center">
            <Link href="/">
              <a>
                <ArrowCircleDownIcon className="h-8 w-8 text-green-500 mr-2" />
              </a>
            </Link>
            <div className="font-medium dark:text-white">200,000円</div>
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-xs mr-2">
            17/12 7:34 AM
          </div>
        </li>
        <li className="flex flex-row items-center justify-between p-2">
          <div className="flex flex-row items-center">
            <Link href="/">
              <a>
                <ArrowCircleUpIcon className="h-8 w-8 text-red-500 mr-2" />
              </a>
            </Link>
            <div className="font-medium dark:text-white">3200円</div>
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-xs mr-2">
            17/12 7:34 AM
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Transactions;
