import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavbarProps {
  className?: string;
}
const Navbar = ({ className }: NavbarProps) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={className}>
      <ul className="flex h-full justify-evenly items-center font-bold">
        <li className={`link ${pathname === "/" && "link--active"}`}>
          <Link href="/">H</Link>
        </li>
        <li className={`link ${pathname === "/page2" && "link--active"}`}>
          <Link href="/page2">P2</Link>
        </li>
        <li className={`link ${pathname === "/page3" && "link--active"}`}>
          <Link href="/page3">P3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
