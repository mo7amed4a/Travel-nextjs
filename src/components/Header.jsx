"use client";
import {
  Avatar,
  Dropdown,
  MegaMenu,
  Navbar,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Usercontext";
import { baseURL } from "../lib/api/Axios";
import Link from "next/link";
import LogoutApp from "./header/logout/logout";
import DropdownHover from "./DropdownHover";
import { usePathname } from "next/navigation";
import SocialHeader from "./header/social";

export default function HeaderApp() {
  const pathname = usePathname();
  const isPathname =
    pathname === "/" ||
    pathname === "/packages" ||
    pathname === "/faqs" ||
    pathname === "/blogs";
  const [ready, setReady] = useState(false);
  const { Userdata } = useContext(UserContext);

  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setReady(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative ${isScrolled ? "h-28 md:h-40" : "h-28 md:h-40"} z-50 ${isPathname ? "" : ""}`}>
        <MegaMenu
          className={`text-white p-0 fixed top-0 inset-x-0  ${
            isScrolled
              ? "bg-secondary-500 z-50 shadow"
              : `${isPathname ? "bg-secondary-500 xl:bg-transparent" : "bg-secondary-500"}`
          }`}
        >
          {true && (
            <div
              className={`container-app flex justify-between items-center  ${
                isPathname && "lg:bg-transparent lg:text-white"
              } `}
            >
             <SocialHeader />
            </div>
          )}
          {/* Main Navbar */}
          <div
            className={`flex container-app flex-wrap items-center justify-between py-4 lg:gap-x-8`}
          >
            <Navbar.Brand as={Link} href="/">
              <img
                alt=""
                src="/images/logoapp3.png"
                className="mr-3 h-6 sm:h-9"
              />
            </Navbar.Brand>
            {/* <div className="flex md:order-1 items-center gap-x-2"> */}
            <div className="flex md:order-2 gap-x-1 md:gap-x-2">
              {ready && !Userdata && (
                <>
                  <Navbar.Brand
                    as={Link}
                    href="/auth/login"
                    className={`font-bold text-gray-700 ${
                      isScrolled ? "md:text-gray-700" : "md:text-white"
                    } me-1 `}
                  >
                    Login
                  </Navbar.Brand>
                  <Navbar.Brand
                    as={Link}
                    href="/auth/signup"
                    className={`font-bold text-gray-700 ${
                      isScrolled ? "md:text-gray-700" : "md:text-white"
                    } me-1 `}
                  >
                    Sign Up
                  </Navbar.Brand>
                </>
              )}
              {Userdata && (
                <Dropdown
                  arrowIcon={false}
                  inline
                  className="w-44"
                  label={
                    <Avatar
                      alt={Userdata.firstName}
                      className="[&>div>img]:w-9 md:[&>div>img]:w-10 [&>div>img]:h-9 md:[&>div>img]:h-10"
                      img={
                        Userdata?.profilePhoto?.startsWith("http")
                          ? Userdata.profilePhoto
                          : `${baseURL}${Userdata.profilePhoto}`
                      }
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm truncate font-bold">{`${Userdata.firstName} ${Userdata.lastName}`}</span>
                    <span className="block truncate text-xs font-medium">
                      {Userdata.email}
                    </span>
                  </Dropdown.Header>
                  {Userdata?.isAdmin && (
                    <Dropdown.Item as={Link} href={"/dashboard"}>
                      Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item as={Link} href={"/profile"}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <LogoutApp>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </LogoutApp>
                </Dropdown>
              )}
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse
              className={`[&>ul]:space-x-0 [&>ul]:gap-x-4 [&>*>*>*]:uppercase [&>*>*>*]:font-bold bg-secondary-500 md:bg-transparent 
                 [&>*>*>*>a]:text-white [&>*>*>*]:text-white`
            }
            >
              <Navbar.Link as={Link} href="/">
                Home
              </Navbar.Link>
              <Navbar.Link as={Link} href="/packages">
                Packages
              </Navbar.Link>
              <DropdownHover />
              {/* <DropdownComponent
                ButtonLink={"Packages"}
              >
                <ul className="text-black space-y-4">
                <Navbar.Link as={Link} href="/not-found">
                  Not Found
                </Navbar.Link>
                <DropdownComponent end
                ButtonLink={"Packages"}
              >
                <ul className="text-black space-y-4">
                <Navbar.Link as={Link} href="/not-found">
                  Not Found
                </Navbar.Link>
                <DropdownComponent end
                ButtonLink={"Packages"}
              >
                <ul className="text-black space-y-4">
                <Navbar.Link as={Link} href="/not-found">
                  Not Found
                </Navbar.Link>
                </ul>
              </DropdownComponent>
                </ul>
              </DropdownComponent>
                </ul>
              </DropdownComponent> */}
              <Navbar.Link as={Link} href="/blogs">
                Blogs
              </Navbar.Link>
              {/* <DropdownComponent ButtonLink={<LintForDropdown title={"Blogs"} />}>
                <ul className="text-black space-y-4">
                </ul>
              </DropdownComponent> */}
              <Navbar.Link as={Link} href="/faqs">
                Faq
              </Navbar.Link>
              {/* <DropdownComponent
                ButtonLink={<LintForDropdown title={"more pages"} href="/" />}
              >
                <ul className="text-black space-y-4">
                  <Badge color={"warning"}>
                    {"هيتم حذف اللينكات دي في الاخر"}
                  </Badge>
                  <Navbar.Link as={Link} href="/not-found">
                    Not Found
                  </Navbar.Link>
                  <Navbar.Link as={Link} href="/auth/reset-password">
                    Reset Password
                  </Navbar.Link>
                  <Navbar.Link as={Link} href="/auth/otp">
                    OTP Page
                  </Navbar.Link>
                  <Navbar.Link as={Link} href="/auth/forgot-password">
                    Forgot Password
                  </Navbar.Link>
                </ul>
              </DropdownComponent> */}
            </Navbar.Collapse>
          </div>
        </MegaMenu>
    </div>
  );
}
