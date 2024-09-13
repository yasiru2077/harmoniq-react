import React from "react";
import "./logout.css";
import { signOut } from "aws-amplify/auth";

function Logout({signOut}) {
  return (
    <div>
      <svg
        className="logout-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        onClick={signOut}
      >
        <path
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"
        />
      </svg>
    </div>
  );
}

export default Logout;
