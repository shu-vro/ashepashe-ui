"use client";

import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
    Divider,
    Card,
    CardBody,
    Image,
    ScrollShadow,
    User,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import ThemeButton from "./ThemeButton";
import { CiBookmark } from "react-icons/ci";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AnimatePresence, motion } from "framer-motion";

const animals = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Fox", value: "fox" },
    { label: "Giraffe", value: "giraffe" },
    { label: "Horse", value: "horse" },
    { label: "Iguana", value: "iguana" },
    { label: "Jaguar", value: "jaguar" },
    { label: "Kangaroo", value: "kangaroo" },
    { label: "Lion", value: "lion" },
    { label: "Monkey", value: "monkey" },
    { label: "Nightingale", value: "nightingale" },
    { label: "Owl", value: "owl" },
    { label: "Penguin", value: "penguin" },
    { label: "Quail", value: "quail" },
    { label: "Rabbit", value: "rabbit" },
    { label: "Snake", value: "snake" },
    { label: "Tiger", value: "tiger" },
    { label: "Uakari", value: "uakari" },
    { label: "Vulture", value: "vulture" },
    { label: "Wolf", value: "wolf" },
    { label: "Xerus", value: "xerus" },
    { label: "Yak", value: "yak" },
    { label: "Zebra", value: "zebra" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    console.log(searchOpen);
    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            className="py-3">
            <NavbarContent justify="start" className="md:hidden">
                <NavbarItem>
                    <SidebarTrigger />
                </NavbarItem>
                <CustomDivider />
            </NavbarContent>
            <NavbarContent justify="start" className="lg:ml-20 grow">
                <NavbarBrand className="md:hidden">
                    <Link href="/">ASHEPASHE</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex gap-4 grow"
                justify="center">
                <NavbarItem className="w-full">
                    <div className="relative">
                        <Input
                            variant="bordered"
                            radius="md"
                            placeholder="Search"
                            className="max-w-[500px]"
                            onFocus={() => setSearchOpen(true)}
                            onBlur={() => setSearchOpen(false)}
                            endContent={<IoSearchOutline fontSize="1.3rem" />}
                        />
                        <AnimatePresence>
                            {searchOpen && (
                                <Card
                                    className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 z-30"
                                    as={motion.div}
                                    exit={{ opacity: 0 }}
                                    key="search-menu">
                                    <CardBody className="w-[66vw] text-wrap bg-content2">
                                        <ScrollShadow className="max-h-[60vh]">
                                            {Array(15)
                                                .fill(1)
                                                .map((_, index) => (
                                                    <SearchItems
                                                        key={index}
                                                        label={
                                                            animals[index].label
                                                        }
                                                    />
                                                ))}
                                        </ScrollShadow>
                                    </CardBody>
                                </Card>
                            )}
                        </AnimatePresence>
                    </div>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="lg:mr-20">
                <ResponsiveButtons />
            </NavbarContent>
        </Navbar>
    );
}

function SearchItems({ label }: { label: string }) {
    return (
        <Card className="mt-4 bg-none w-full" as={Link} href={"/profile/1"}>
            <CardBody className="flex-row justify-start gap-4 bg-none">
                <Image
                    className="w-36 h-36"
                    src="https://nextui.org/images/fruit-5.jpeg"
                    alt={label}
                />
                <div>
                    <div className="font-bold">{label}</div>
                    <div className="text-xl">৳320</div>
                    <Rating style={{ maxWidth: 100 }} readOnly value={4.3} />
                    <div>
                        <del className="text-default-500">{300}৳</del>{" "}
                        <span className="text-2xl font-bold">{200 + "৳"}</span>
                    </div>
                    <User
                        // as={Link}
                        // href={"/profile/1"}
                        name={"John Doe"}
                        avatarProps={{
                            className: "w-8 h-8",
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                        }}
                        classNames={{
                            name: "truncate w-48 text-lg italic",
                        }}
                        className="grow-0"
                    />
                </div>
            </CardBody>
        </Card>
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

function ResponsiveButtons({}: {}) {
    const isMobile = useIsMobile(450);
    return (
        <>
            <NavbarItem className="sm:hidden">
                <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                    isIconOnly
                    size={isMobile ? "sm" : "md"}
                    className="text-xl mob:text-2xl">
                    <IoSearchOutline />
                </Button>
            </NavbarItem>
            <CustomDivider className="md:hidden" />
            <NavbarItem>
                <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                    isIconOnly
                    size={isMobile ? "sm" : "md"}
                    className="text-xl mob:text-2xl">
                    <CiBookmark />
                </Button>
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <ThemeButton size={isMobile ? "sm" : "md"} />
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                {/* <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                    size={isMobile ? "sm" : "md"}>
                    Sign Up
                </Button> */}
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Store</DropdownItem>
                        <DropdownItem key="analytics">Bookmarks</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            Help & Feedback
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarItem>
        </>
    );
}
