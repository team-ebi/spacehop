import React, { useState, useEffect, useContext } from "react";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth as currentUser } from "aws-amplify";
import { UserContext } from "../useContext/UserContext";
import "./Auth.css";

export default function Auth({ login, signup }) {
  const [authState, setAuthState] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser.user) {
      setUser(currentUser.user.attributes)
      console.log("AUTH COMP: ", user);
    }
  }, [currentUser])

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
          <AmplifyAuthenticator initialAuthState="signin">
            <AmplifySignIn
              slot="sign-in"
              usernameAlias="email"
              formFields={[
                {
                  type: "username",
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
              ]}
            />
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
                  type: "given_name",
                  label: "First Name",
                  required: true,
                },
                {
                  type: "family_name",
                  label: "Last Name",
                  required: true,
                },
                {
                  type: "phone_number",
                  label: "Phone",
                  required: true,
                },
              ]}
            />
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
                  type: "given_name",
                  label: "First Name",
                  required: true,
                },
                {
                  type: "family_name",
                  label: "Last Name",
                  required: true,
                },
                {
                  type: "phone_number",
                  label: "Phone",
                  required: true,
                },
              ]}
            />
            <AmplifySignIn
              slot="sign-in"
              usernameAlias="email"
              formFields={[
                {
                  type: "username",
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
              ]}
            />
          </AmplifyAuthenticator>
        </div>
      )}
    </>
  );
}
