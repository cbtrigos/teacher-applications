import React from "react";
import { Route, Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated //if logged in, go where you want, else to log in
          ? (cProps.user.user_type===0
                ? <C {...props} {...cProps} /> 
                : <Redirect to={"/dashboard"}/>
                )
          : <Redirect
              to={redirect === "" || redirect === null ? "/login" : redirect}
            />}
    />
  );
};
