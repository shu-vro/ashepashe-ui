"use client";

import ResponsiveButtons, {
    CustomDivider,
} from "@/app/(app_interface)/components/Header/ResponsiveSearch";
import {
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import AppIcon from "@/assets/she.png";
import ThemeButton from "@/app/(app_interface)/components/ThemeButton";
import LoginButton from "@/app/(app_interface)/components/Header/LoginButton";
import UserDropdown from "@/app/(app_interface)/components/Header/UserDropdown";

export default function Header() {
    return (
        <Navbar isBordered maxWidth="full" className="py-3">
            <NavbarContent justify="start" className="grow">
                <NavbarItem className="md:hidden"></NavbarItem>
                <NavbarBrand>
                    <Link href="#" className="block">
                        <Image
                            src={AppIcon.src}
                            alt="AsePashe"
                            className="block mx-auto object-cover h-16"
                            classNames={{
                                wrapper: "block w-full h-16",
                            }}
                            removeWrapper
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* <NavbarContent className="hidden sm:flex gap-4 grow" justify="end">
                <NavbarItem>
                    <NextLink as={Link} href="/home">
                        Home
                    </NextLink>
                </NavbarItem>
                <NavbarItem>
                    <NextLink as={Link} href="/products">
                        Search
                    </NextLink>
                </NavbarItem>
            </NavbarContent> */}

            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeButton />
                </NavbarItem>
                <CustomDivider />
                <NavbarItem>
                    <LoginButton />
                    <UserDropdown />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
