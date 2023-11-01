import { authApi } from "@/api/auth";

import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

interface SignInFormProps {
  switchAuthMode: (mode: "signin" | "register") => void;
}

const SignInForm = ({ switchAuthMode }: SignInFormProps) => {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authApi.signIn(email, password);
      console.log("signin response", response);

      dispatch({
        type: "SIGN_IN",
        payload: {
          token: response.token,
        },
      });

      toast.success(`Signed in successfully, ${email}`);
    } catch (error) {
      console.log(error);
      toast.error("Error signing in");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1>Sign In</h1>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={handleSignIn}
      >
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="h-10 w-60 rounded-lg px-4 py-2 text-black"
          type="email"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="h-10 w-60 rounded-lg px-4 py-2 text-black"
          type="password"
        />
        <button
          className="mt-2 h-10 w-60 rounded-lg bg-white text-black"
          type="submit"
        >
          signin
        </button>
      </form>
      <button
        className="h-10 w-60 rounded-lg text-white"
        onClick={() => switchAuthMode("register")}
      >
        Are you new?, register instead
      </button>
    </div>
  );
};

export default SignInForm;
