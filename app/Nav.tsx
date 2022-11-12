import Link from "next/link";
import NavLink from "./NavLink";

export default function Nav() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex justify-center py-10">
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
