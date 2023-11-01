import { authApi } from "@/api/auth";
import { saveTokenOnLocalStorage } from "@/api/token";
import React, { useState } from "react";

interface SignInFormProps {
  switchAuthMode: (mode: "signin" | "register") => void;
}

const SignInForm = ({ switchAuthMode }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await authApi.signIn(email, password);
      console.log("userData", userData);
      saveTokenOnLocalStorage(userData.token);
      alert("success");
    } catch (error) {
      console.log(error);
      alert("error");
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
