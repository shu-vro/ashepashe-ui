"use client";

import React, { Suspense, use, useEffect, useMemo, useState } from "react";
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
import { cn, dynamicFakeImageGenerator } from "@/lib/utils";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AnimatePresence, motion } from "framer-motion";
import AppIcon from "@/assets/she.png";
import { Product } from "../all-products/page";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

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

async function getAllProducts() {
    const response = await fetch("https://asepashe.com/api/products");
    const data: Product[] = await response.json();
    return data;
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const productPromise = getAllProducts();

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            className="py-3">
            <NavbarContent justify="start" className="grow">
                <NavbarItem className="md:hidden">
                    <SidebarTrigger />
                </NavbarItem>
                <NavbarBrand className="md:hidden">
                    <Link href="/" className="block">
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

            <NavbarContent
                className="hidden sm:flex gap-4 grow"
                justify="center">
                <NavbarItem className="w-full">
                    <SearchDesktop productPromise={productPromise} />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="lg:mr-20">
                <ResponsiveButtons />
            </NavbarContent>
        </Navbar>
    );
}

function SearchDesktop({
    productPromise,
}: {
    productPromise: Promise<Product[]>;
}) {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [value, setValue] = useState("");
    const products = use(productPromise);

    const selectedProducts = useMemo(() => {
        if (!value) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);

    useEffect(() => {
        function esc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        }
        window.addEventListener("keyup", esc);
        return () => window.addEventListener("keyup", esc);
    }, []);

    const onSearchOpen = (value: boolean) => {
        setSearchOpen(value);
        value ? router.push("#searching") : router.push("#");
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="relative">
                <Input
                    onValueChange={debounce(setValue, 1000)}
                    variant="bordered"
                    radius="md"
                    placeholder="Search"
                    className="max-w-[500px]"
                    onFocus={() => onSearchOpen(true)}
                    // onBlur={() => setSearchOpen(false)}
                    endContent={<IoSearchOutline fontSize="1.3rem" />}
                />
                <AnimatePresence>
                    {searchOpen && (
                        <>
                            <div
                                className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 w-screen h-screen z-20"
                                onClick={() => {
                                    onSearchOpen(false);
                                }}></div>
                            <Card
                                className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 z-30"
                                as={motion.div}
                                exit={{ opacity: 0 }}
                                key="search-menu">
                                <CardBody className="w-[66vw] text-wrap bg-content2">
                                    <ScrollShadow className="max-h-[60vh]">
                                        {selectedProducts.map((product) => (
                                            <SearchItems
                                                key={product.id}
                                                label={product.name}
                                                actualPrice={product.price}
                                                discountPrice={product.price}
                                                company_name={
                                                    product.company_id
                                                }
                                                rating={4.56}
                                                companyAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                image={dynamicFakeImageGenerator()}
                                                slug={product.slug}
                                            />
                                        ))}
                                    </ScrollShadow>
                                </CardBody>
                            </Card>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </Suspense>
    );
}

function SearchItems({
    label,
    actualPrice,
    discountPrice,
    company_name,
    companyAvatar,
    rating,
    image,
    slug,
}: {
    label: string;
    actualPrice: number;
    discountPrice: number;
    company_name: string;
    companyAvatar: string;
    rating: number;
    image: string;
    slug: string;
}) {
    return (
        <Card
            className="mt-4 bg-none w-full"
            as={Link}
            href={`/products/${slug}`}>
            <CardBody className="flex-row justify-start gap-4 bg-none">
                <Image className="w-36 h-36" src={image} alt={label} />
                <div className="flex flex-col justify-center">
                    <div className="font-bold">{label}</div>
                    <Rating style={{ maxWidth: 100 }} readOnly value={rating} />
                    <div>
                        <del className="text-default-500">{actualPrice}৳</del>{" "}
                        <span className="text-2xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    <User
                        name={company_name}
                        avatarProps={{
                            className: "w-8 h-8",
                            src: companyAvatar,
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
