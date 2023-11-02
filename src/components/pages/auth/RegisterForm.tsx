import { authApi } from "@/api/auth";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

interface RegisterFormProps {
  switchAuthMode: (mode: "signin" | "register") => void;
}

const RegisterForm = ({ switchAuthMode }: RegisterFormProps) => {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authApi.register(email, password);

      dispatch({
        type: "REGISTER",
        payload: {
          token: response.token,
        },
      });

      toast.success(`Registered successfully, ${email}`);
    } catch (error) {
      console.log(error);
      toast.error("Error registering");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1>Register</h1>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={handleRegister}
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
