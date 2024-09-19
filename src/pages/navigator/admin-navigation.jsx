import React from "react";
import {Link} from "react-router-dom"

function AdminNavigation() {
  return <nav className="">
    <ul className="navigator-admin">
      <li><Link to="/albums">Albums</Link></li>
      {/* <li><Link>Catagories</Link></li> */}
      <li><Link to="/Analytics">Analytics</Link></li>
    </ul>
  </nav>;
}

export default AdminNavigation;
