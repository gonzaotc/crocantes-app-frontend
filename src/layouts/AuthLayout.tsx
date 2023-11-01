import RegisterForm from "@/components/pages/auth/RegisterForm";
import SignInForm from "@/components/pages/auth/SignInForm";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { user, recoveringUserSession } = useContext(UserContext);
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");

  console.log("user state in AuthLayout", user);

  if (recoveringUserSession) {
    // TODO: Implement a loading page
    return <></>;
  }

  if (user) {
    return <>{children}</>;
  }

  if (authMode === "signin") {
    return <SignInForm switchAuthMode={setAuthMode} />;
  }

  if (authMode === "register") {
    return <RegisterForm switchAuthMode={setAuthMode} />;
  }
};

export default AuthLayout;
