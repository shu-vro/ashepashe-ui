"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
    Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import ThemeButton from "./ThemeButton";
import { CiBookmark } from "react-icons/ci";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            className="py-3">
            <NavbarContent justify="start" className="lg:ml-20">
                <NavbarBrand>
                    <Link href="#">ASHEPASHE</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex gap-4 grow"
                justify="center">
                <NavbarItem className="w-full">
                    <Input
                        variant="bordered"
                        radius="lg"
                        placeholder="Search"
                        className="max-w-[500px]"
                        endContent={<IoSearchOutline fontSize="1.3rem" />}
                    />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="lg:mr-20">
                <NavbarItem>
                    <Button
                        as={Link}
                        color="primary"
                        href="#"
                        variant="flat"
                        isIconOnly
                        className="text-2xl">
                        <CiBookmark />
                    </Button>
                </NavbarItem>
                <Divider orientation="vertical" className="h-6" />
                <NavbarItem>
                    <ThemeButton />
                </NavbarItem>
                <Divider orientation="vertical" className="h-6" />
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2
                                    ? "warning"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            href="#"
                            size="lg">
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
