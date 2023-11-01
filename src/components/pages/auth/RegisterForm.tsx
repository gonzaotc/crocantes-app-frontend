import React from "react";

interface RegisterFormProps {
  switchAuthMode: (mode: "signin" | "register") => void;
}

const RegisterForm = ({ switchAuthMode }: RegisterFormProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1>Register</h1>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Register");
        }}
      >
        <input className="h-10 w-60 rounded-lg px-4 py-2" type="email" />
        <input className="h-10 w-60 rounded-lg px-4 py-2" type="password" />
        <input className="h-10 w-60 rounded-lg px-4 py-2" type="password" />
        <button
          className="mt-2 h-10 w-60 rounded-lg bg-white text-black"
          type="submit"
        >
          Register
        </button>
      </form>
      <button
        className="h-10 w-60 rounded-lg text-white"
        onClick={() => switchAuthMode("signin")}
      >
        Are you new?, signin instead
      </button>
    </div>
  );
};

export default RegisterForm;
