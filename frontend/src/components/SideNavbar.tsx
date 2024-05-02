"use client";

// React
import { useEffect, useState } from "react";

// Framer Motion
import { motion } from "framer-motion";

// React Icons
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { LuPencilLine } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";

// NextJS
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SubMenu from "./SubMenu";

const navLinks = [
  {
    name: "Dashboard",
    icon: AiOutlineAppstore,
    href: "/",
  },
  {
    name: "Leaderboard",
    icon: FaChartLine,
    href: "/leaderboard",
  },
  {
    name: "Practice",
    icon: LuPencilLine,
    href: "/practice",
    subMenus: [
      // Incorporate subMenuList here as subMenus
      {
        name: "All Topics",
        slug: "all",
      },
      {
        name: "BST",
        slug: "bst",
      },
      {
        name: "Queues",
        slug: "queues",
      },
      {
        name: "Stacks",
        slug: "stacks",
      },
      {
        name: "Linked Lists",
        slug: "linked-lists",
      },
    ],
  },
  {
    name: "Community",
    icon: MdOutlinePeopleAlt,
    href: "/community",
  },
];

export default function SideNavbar() {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  // console.log(isTabletMid); // debug

  // sidebar open/close state
  //   const [isOpen, setIsOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(isTabletMid ? false : true);

  const pathname = usePathname();
  //   console.log(pathname); // debug

  useEffect(() => {
    if (isTabletMid) {
      // mobile view
      setIsOpen(false);
    } else {
      // laptop view
      setIsOpen(true);
    }
  }, [isTabletMid, pathname]);

  //   pathname change -> close sidebar
  useEffect(() => {
    isTabletMid && setIsOpen(false);
  }, [isTabletMid]);

  const sidebar_animation = isTabletMid
    ? // Mobile View
      {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : // System View
      {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 h-screen z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
        } `}
      ></div>

      <motion.div
        variants={sidebar_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3">
          <Image src="" alt="Logo" width={45} />
          {/* <span className="text-xl whitespace-pre">TipCode</span> */}
        </div>

        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* first */}
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-5 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            {navLinks.map((link) => {
              const isActive: boolean = pathname === link.href; // Determine if the link is active

              // Check if the link has subMenus
              if (link.subMenus && (isOpen || isTabletMid)) {
                return (
                  <div
                    key={link.name}
                    className={`flex flex-col gap-1 ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <SubMenu link={link} />
                  </div>
                );
              } else {
                // Render normal link
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`link ${isActive ? "active" : ""}`}
                    >
                      <link.icon size={23} className="min-w-max" />
                      {link.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>

          {/* second */}
          {isOpen && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Control Btn */}
        <motion.div
          animate={
            isOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          //   transition={{ duration: 0 }}
          className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>

      <div className="m-3 md:hidden  " onClick={() => setIsOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
}
