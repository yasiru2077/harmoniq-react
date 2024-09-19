import React from "react";
import AdminNavigation from "../navigator/admin-navigation";
import "./admin-home.css"

function AdminHome() {
  return <div className="admin-home">
    <section>
      <AdminNavigation/>
    </section>
  </div>;
}

export default AdminHome;
