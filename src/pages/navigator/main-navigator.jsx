import React from "react";
import Logo from "../../components/logo/logo";
import './navigator.css';
import Logout from "../../components/logout/logout";

function MainNavigator({signOut}) {
  return <div className="main-Navigator">
    <Logo/>
    <Logout signOut={signOut}/>
  </div>;
}

export default MainNavigator;
