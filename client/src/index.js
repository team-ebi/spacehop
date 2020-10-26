import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";

Amplify.configure({
  aws_project_region: process.env.REACT_APP_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_WEBCLIENT_ID,
});

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

