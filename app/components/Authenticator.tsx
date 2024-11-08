"use client";
import React, { useState } from "react";
import {
  autoSignIn,
  confirmSignIn,
  confirmSignUp,
  fetchAuthSession,
  signIn,
  signUp,
} from "aws-amplify/auth";

const Authenticator = () => {
  const [authState, setAuthState] = useState("signIn");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [signUpNext, setSignUpNext] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: username,
      password: password,
      options: {
        userAttributes: {
          email: username,
        },
        autoSignIn: true,
      },
    });
    setSignUpNext(nextStep.signUpStep);
  };

  const handleConfirmSignUp = async () => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode: code,
      });
      console.log({ isSignUpComplete, nextStep });
      const signInOutput = await autoSignIn();
      console.log("autosignIn", signInOutput);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <div>
      <div>
        <h3>SIGN UP</h3>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>

        <div>
          <button
            type="submit"
            onClick={async () => {
              const { isSignedIn, nextStep } = await signIn({
                username,
                password,
                options: { authFlowType: "CUSTOM_WITH_SRP" },
              });
              console.log("signIn", isSignedIn, nextStep);
            }}
          >
            Sign In
          </button>
          <div>
            <label htmlFor="confirmSU">ConfirmSignIn:</label>
            <input
              type="confirmSU"
              id="confirmSU"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={async () => {
              const { isSignedIn, nextStep } = await confirmSignIn({
                challengeResponse: code,
              });
              console.log("confirmSignIn", isSignedIn, nextStep);
            }}
          >
            Confirm Sign In
          </button>
        </div>
        <div>
          <label htmlFor="confirmSU">ConfirmSignUp:</label>
          <input
            type="confirmSU"
            id="confirmSU"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleConfirmSignUp}>
          Confirm Sign Up
        </button>
        <button
          type="submit"
          onClick={async () => {
            console.log(await fetchAuthSession());
          }}
        >
          Fetch user
        </button>
      </div>
    </div>
  );
};
export default Authenticator;
