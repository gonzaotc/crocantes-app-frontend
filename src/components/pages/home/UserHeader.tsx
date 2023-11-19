import Image from "next/image";
import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";

const UserHeader = () => {
  const { user, dispatch } = useContext(UserContext);

  const handleSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
    toast.success("Signed out successfully");
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          className=""
          src="/apple-avatar.png"
          alt="user avatar"
          fill={true}
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{user?.email}</p>
        <p className="mt-[-0.145rem] text-sm text-neutral-500">
          1234 - 4567 - 8910
        </p>
      </div>
      <button
        className="ml-auto cursor-pointer text-3xl"
        onClick={handleSignOut}
      >
        <AiOutlineLogout />
      </button>
    </div>
  );
};

export default UserHeader;
