import { motion } from "framer-motion";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoIosArrowDown } from "react-icons/io";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

type SubMenuProps = {
  link: {
    name: string;
    icon: React.ElementType; // Updated to React.ElementType for icon usage
    href: string;
    subMenus: {
      // Updated to optional to match your structure
      name: string;
      slug: string;
    }[];
  };
};

export default function SubMenu({ link }: SubMenuProps) {
  const pathname = usePathname();
  // console.log("pathname", pathname); // debug
  // console.log("data", data); // debug

  // Determine if the submenu should be highlighted as active
  const isActive = pathname.includes(link.href);

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`link ${isActive ? "active" : ""}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {/* Dynamic icons */}
        <link.icon size={23} className="min-w-max" />
        <Link href="/practice" className="capitalize flex-1">
          {link.name}
        </Link>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>

      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-5 text-[0.8rem] font-normal overflow-hidden"
      >
        {link.subMenus.map((menu) => (
          <li
            key={menu.slug}
            className={cn(
              pathname.endsWith(menu.slug) ? "active" : "",
              "rounded-md"
            )}
          >
            <Link
              href={`/practice/topics/${menu.slug}`}
              className="link !bg-transparent capitalize"
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
}
