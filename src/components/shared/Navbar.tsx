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
      <ul className="flex h-full items-center justify-evenly font-bold">
        <li>
          <Link
            className={`link ${pathname === "/" && "link--active"}`}
            href="/"
          >
            H
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "/page2" && "link--active"}`}
            href="/page2"
          >
            P2
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "/page3" && "link--active"}`}
            href="/page3"
          >
            P3
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
