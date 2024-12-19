"use client";

import ThemeButton from "../ThemeButton";
import { CiBookmark } from "react-icons/ci";
import { NavbarItem, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";
import UserDropdown from "./UserDropdown";

export default function ResponsiveButtons({}) {
    return (
        <>
            {/* <NavbarItem className="sm:hidden">
                <SearchMobile products={products}>
                    <Button
                        as={Link}
                        color="primary"
                        href="#"
                        variant="flat"
                        isIconOnly
                        className="text-xl mob:text-2xl">
                        <IoSearchOutline />
                    </Button>
                </SearchMobile>
            </NavbarItem>
            <CustomDivider className="md:hidden" /> */}
            <NavbarItem>
                <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                    isIconOnly
                    className="text-xl mob:text-2xl">
                    <CiBookmark />
                </Button>
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <ThemeButton />
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <LoginButton />
                <UserDropdown />
            </NavbarItem>
        </>
    );
}

function CustomDivider({ ...props }) {
    return (
        <Divider
            orientation="vertical"
            {...props}
            className={cn("h-6 max-[576px]:hidden", props?.className)}
        />
    );
}
