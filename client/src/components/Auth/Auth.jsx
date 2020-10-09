import React, { useState, useEffect } from "react";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";

export default function Auth({ displayLogin, displaySignup }) {
  const [ authState, setAuthState ] = useState();
  const [ user, setUser ] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    })
  }, []);

  return (
    <>
      {/* signin form will be displayed when user clicks on
        "Log in" button from menu window*/}
      {displayLogin && (
        <div className="auth-window">
          <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" usernameAlias="email" />
          </AmplifyAuthenticator>
        </div>
      )}

      {/* signup form will be displayed when user clicks on
        "Sign up" button from menu window */}
      {displaySignup && (
        <div className="auth-window">
          <AmplifyAuthenticator initialAuthState="signup">
            <AmplifySignUp
              slot="sign-up"
              usernameAlias="email"
              formFields={[
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
                  type: "email",
                  label: "Email",
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
