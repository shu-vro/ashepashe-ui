"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Image,
} from "@nextui-org/react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "@smastrom/react-rating/style.css";
import AppIcon from "@/assets/she.png";
import { Product } from "../../all-products/page";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { API_URL } from "@/lib/var";
import ResponsiveButtons from "./ResponsiveSearch";
import SearchDesktop from "./SearchDesktop";

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data: Product["product"][] = await response.json();
    return data;
}

export default function Header() {
    const [products, setProducts] = React.useState<Product["product"][]>([]);

    React.useEffect(() => {
        getAllProducts().then(setProducts).catch(console.error);
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
            {/* <Navbar></Navbar> */}
        </>
    );
}
