import Image from "next/image";
import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";

const UserHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="gap-3 mb-10 items-center">
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        <Image className="" src="/images/user.jfif" alt="user avatar" fill={true} />
      </div>
      <div className="gap-0 flex flex-col">
        <p className="font-semibold">{user?.email}</p>
        <p className="text-neutral-500 text-sm mt-[-0.145rem]">1234 - 4567 - 8910</p>
      </div>
      <div className="ml-auto text-sm">(icon)</div>
    </div>
  );
};

export default UserHeader;
