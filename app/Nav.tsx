import Link from "next/link";
import NavLink from "./NavLink";

export default function Nav() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Code", href: "/code" },
  ];

  return (
    <nav className="flex py-10 md:justify-center justify-end">
      <ul className="hidden md:flex space-x-8">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} name={link.name} />
          </li>
        ))}
      </ul>
      <button className="md:hidden pr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </button>
    </nav>
  );
}
