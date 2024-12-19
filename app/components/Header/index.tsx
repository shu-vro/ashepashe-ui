"use client";

import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Image,
    Tabs,
    Tab,
    Input,
} from "@nextui-org/react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "@smastrom/react-rating/style.css";
import AppIcon from "@/assets/she.png";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { API_URL } from "@/lib/var";
import ResponsiveButtons from "./ResponsiveSearch";
import SearchDesktop from "./SearchDesktop";
import { getSidebarItems } from "../AppSidebar";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import SearchMobile from "./SearchMobile";

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data: Product["product"][] = await response.json();
    return data;
}

type SidebarItem = { id: string; name: string };

export default function Header() {
    const [products, setProducts] = React.useState<Product["product"][]>([]);
    const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
        { id: "/", name: "Home" },
        { id: "/companies", name: "All Companies" },
        { id: "/products", name: "All Products" },
    ]);
    const pathName = usePathname();

    React.useEffect(() => {
        // generate n random sidebarItems

        getAllProducts().then(setProducts).catch(console.error);
        getSidebarItems()
            .then((data) => {
                let newData = data.map((item) => ({
                    id: `/category/${item.name}`,
                    name: item.name,
                }));
                setSidebarItems((p) => {
                    // maybe ids in p are equal. if they are, return only unique items
                    return [...p, ...newData].filter(
                        (item, index, self) =>
                            index === self.findIndex((t) => t.id === item.id)
                    );
                });
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <Navbar isBordered maxWidth="full" className="py-3">
                <NavbarContent justify="start" className="grow">
                    <NavbarItem className="md:hidden">
                        <SidebarTrigger color="primary" className="text-xl">
                            <PiSidebarSimpleLight />
                        </SidebarTrigger>
                    </NavbarItem>
                    <NavbarBrand>
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
                        <SearchDesktop products={products} />
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <ResponsiveButtons products={products} />
                </NavbarContent>
            </Navbar>
            <Navbar
                isBordered
                shouldHideOnScroll
                maxWidth="full"
                className="overflow-x-auto w-full top-[5.5rem] opacity-1 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-all z-30 sm:hidden">
                <NavbarContent justify="center" className="mx-auto w-full">
                    <SearchMobile products={products}>
                        <Input
                            variant="flat"
                            // label="Search"
                            radius="md"
                            placeholder="Search"
                            fullWidth
                            className="z-40 w-full"
                            // onBlur={() => setSearchOpen(false)}
                            endContent={<IoSearchOutline fontSize="1.3rem" />}
                        />
                    </SearchMobile>
                </NavbarContent>
            </Navbar>
            <Navbar
                isBordered
                shouldHideOnScroll
                maxWidth="full"
                className="overflow-x-auto w-full top-[5.5rem] opacity-1 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-all z-30">
                <NavbarContent justify="center" className="mx-auto">
                    <Tabs
                        aria-label="navigation items"
                        variant="underlined"
                        items={sidebarItems}
                        selectedKey={pathName}>
                        {(item) => (
                            <Tab
                                key={item.id}
                                title={item.name}
                                as={Link}
                                href={item.id as string}></Tab>
                        )}
                    </Tabs>
                </NavbarContent>
            </Navbar>
        </>
    );
}
