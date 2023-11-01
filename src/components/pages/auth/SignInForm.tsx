import React from "react";

interface SignInFormProps {
  switchAuthMode: (mode: "signin" | "register") => void;
}

const SignInForm = ({ switchAuthMode }: SignInFormProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1>Sign In</h1>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Sign In");
        }}
      >
        <input className="h-10 w-60 rounded-lg px-4 py-2" type="email" />
        <input className="h-10 w-60 rounded-lg px-4 py-2" type="password" />
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
