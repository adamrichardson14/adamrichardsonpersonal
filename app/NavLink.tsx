"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

type Props = {
  href: string;
  name: string;
};
export default function NavLink({ href, name }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={`${
        isActive ? "underline text-white underline-offset-4" : "text-gray-200"
      } font-medium`}
      href={href}
    >
      {name}
    </Link>
  );
}
