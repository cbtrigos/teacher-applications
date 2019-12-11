import React from "react";
import { Route } from "react-router-dom";

// export default function AppliedRoute({ component: C, appProps, ...rest }) {
//   return (
//     <Route {...rest} render={props => <C {...props} {...appProps} />} />
//   );
// } 
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
        // cProps.isAuthenticated //if logged in, go where you want, else to log in
          // ?
           <C {...props} {...cProps} />
          // : <Redirect
              // to={redirect === "" || redirect === null ? "/login" : redirect}
            // />
          }
    />
  );
};
