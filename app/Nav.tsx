import Link from "next/link";
import NavLink from "./NavLink";

export default function Nav() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Code", href: "/code" },
  ];

  return (
    <nav className="flex py-10 justify-center">
      <ul className="flex space-x-8">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} name={link.name} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
