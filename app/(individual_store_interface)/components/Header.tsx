"use client";

import ResponsiveButtons from "@/app/(app_interface)/components/Header/ResponsiveSearch";
import Logo from "@/app/(app_interface)/components/Sidebar/Logo";
import {
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <Navbar isBordered maxWidth="full" className="py-3">
            <NavbarContent justify="start" className="grow">
                <NavbarItem>
                    <NavbarBrand>
                        <Link href="#" className="block">
                            <Logo />
                        </Link>
                    </NavbarBrand>
                </NavbarItem>
            </NavbarContent>

            {/* <NavbarContent
                className="hidden sm:flex gap-4 grow"
                justify="center">
                <NavbarItem className="w-full">
                    <SearchDesktop products={products} />
                </NavbarItem>
            </NavbarContent> */}

            <NavbarContent justify="end">
                <ResponsiveButtons />
            </NavbarContent>
        </Navbar>
    );
}
