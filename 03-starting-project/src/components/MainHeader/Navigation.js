import React, { useContext } from "react";
import AuthContext from "../../store/auth-contetxt";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(AuthContext); // useContext 사용

  return (
    // AuthContext.Consumer 사용하기 *주석처리
    // <AuthContext.Consumer>
    //   {(ctx) => {
    // return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    // );
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
