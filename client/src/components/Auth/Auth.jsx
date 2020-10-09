import React, { useState, useEffect } from "react";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import "./Auth.css";

export default function Auth({ login, signup }) {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

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
                  required: true,
                },
                {
                  type: "password",
                  label: "Custom Password Label",
                  placeholder: "custom password placeholder",
                  required: true,
                },
                {
                  type: "first_name",
                  label: "First Name",
                  required: true,
                },
                {
                  type: "last_name",
                  label: "Last Name",
                  required: true,
                },
                {
                  type: "phone",
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
