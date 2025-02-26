"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { ArrowRight, Clapperboard, TvMinimalPlay } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { removeUser, setUser } from "@/store/userSlice";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(removeUser());
      }
    });
    return ()=>unsub();
  },[]);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <header className="w-full border-b border-slate-700/[0.1] ">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/">
              <img src="./horizon-logo.png" alt="logo" className="h-10" />
            </Link>
            <p className="font-bold text-inherit">Horizon</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden  sm:flex gap-x-6" justify="end">
          <NavbarItem>
            <Link
              color="foreground"
              className="flex items-center justify-center gap-2 hover:text-purple-500"
              href="#"
            >
              <TvMinimalPlay />
              Subscription
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              aria-current="page"
              href="#"
              className="flex items-center justify-center gap-2 hover:text-purple-500"
            >
              <Clapperboard />
              My Courses
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarItem className="">
          <Button
            href="#"
            className="flex bg-transparent justify-center group text-purple-500 hover:bg-purple-500 hover:text-white items-center py-2 px-4 rounded-lg border border-purple-500"
          >
            Login{" "}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </NavbarItem>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default Header;
