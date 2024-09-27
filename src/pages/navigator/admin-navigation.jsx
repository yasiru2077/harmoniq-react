import React from "react";
import { Link } from "react-router-dom";

function AdminNavigation() {
  return (
    <nav className="admin-navigation bg-gray-800 p-4 rounded-lg shadow-md relative">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/albums"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
          >
            Albums
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
          >
            Analytics
          </Link>
        </li>
      </ul>
      <Link
        to="/addAlbum"
        className=" text-white hover:bg-gray-700 p-2 rounded-full transition duration-300"
        title="Add Album"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Link>
    </nav>
  );
}

export default AdminNavigation;
