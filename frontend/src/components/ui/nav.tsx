"use client";

import * as React from "react";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    icon: LucideIcon;
    label?: string;
    variant: "default" | "ghost";
    href: string;
    subMenu?: string[];
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav
          className={`flex flex-col gap-12 ${
            isCollapsed ? "items-center" : ""
          }`}
        >
          {links.map((link, index) =>
            link.title !== "Practice" ? (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : link.variant,
                    size: isCollapsed ? "icon" : "sm",
                  }),
                  isCollapsed ? "justify-center" : "justify-start pr-4",
                  "flex w-full items-center"
                )}
              >
                <link.icon className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    {link.title}
                    {link.label && (
                      <span className="ml-auto">{link.label}</span>
                    )}
                  </>
                )}
              </Link>
            ) : (
              <NavigationMenu key={index}>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      buttonVariants({
                        variant:
                          link.href === pathName ? "default" : link.variant,
                        size: isCollapsed ? "icon" : "sm",
                      }),
                      isCollapsed ? "justify-center" : "justify-start pr-4",
                      "flex w-full items-center"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {!isCollapsed && "Practice"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {link.subMenu?.map((subMenuItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          title={subMenuItem}
                          href={`/practice/topics/${subMenuItem
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          Learn about {subMenuItem.toLowerCase()} and their
                          operations.
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
