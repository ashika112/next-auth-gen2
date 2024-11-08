// components/Login.tsx
"use client";

import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Authenticator from "./Authenticator";

function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);
  return <Authenticator />;
}

export default Login;
