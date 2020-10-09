import React, { useState, useEffect } from "react";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import {Auth as currentUser } from "aws-amplify";
import "./Auth.css";

export default function Auth({ login, signup }) {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  console.log(currentUser)

  // useEffect(() => {
  //   async function fetch() {
  //     const result = await currentUser();
  //     console.log("USER-----: ", result)
  //     setUser(result)
  //   };
  //   fetch();
  // }, [])

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <>
      {/* signin form will be displayed when user clicks on
        "Log in" button from menu window*/}
      {login && (
        <div className="auth-window">
          <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" usernameAlias="email" />
          </AmplifyAuthenticator>
        </div>
      )}

      {/* signup form will be displayed when user clicks on
        "Sign up" button from menu window */}
      {signup && (
        <div className="auth-window">
          <AmplifyAuthenticator initialAuthState="signup">
            <AmplifySignUp
              slot="sign-up"
              usernameAlias="email"
              formFields={[
                {
                  type: "email",
                  label: "Email",
                  placeholder: "",
                  required: true,
                },
                {
                  type: "password",
                  label: "Password",
                  placeholder: "",
                  required: true,
                },
                {
                  type: "custom:first_name",
                  label: "First Name",
                  required: true,
                },
                {
                  type: "custom:last_name",
                  label: "Last Name",
                  required: true,
                },
                {
                  type: "custom:phone",
                  label: "Phone",
                  required: true,
                },
              ]}
            />
          </AmplifyAuthenticator>
        </div>
      )}
    </>
  );
}
