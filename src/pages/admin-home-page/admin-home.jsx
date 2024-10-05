import React, { useState } from "react";
import AdminNavigation from "../navigator/admin-navigation";
import "./admin-home.css";
import Analytics from "../analytics/analytics";

function AdminHome() {
  return (
    <div className="admin-home">
      <section>
        {/* <AdminNavigation /> */}
        <Analytics />
      </section>
    </div>
  );
}

export default AdminHome;
