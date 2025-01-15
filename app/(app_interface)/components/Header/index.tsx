import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "@smastrom/react-rating/style.css";
import AppIcon from "@/assets/she.png";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { API_URL } from "@/lib/var";
import ResponsiveButtons from "./ResponsiveSearch";
import SearchDesktop from "./SearchDesktop";
import { getSidebarItems } from "../AppSidebar";
import { IoSearchOutline } from "react-icons/io5";
import SearchMobile from "./SearchMobile";
import { FaRegKeyboard } from "react-icons/fa6";
import CustomNavigationTabs from "./CustomNavigationTabs";
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarBrand,
    Image,
    Input,
    Tooltip,
} from "./NavbarWrapper";

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data: Product["product"][] = await response.json();
    return data;
}

const defaultSidebarItems = [
    { id: "/home", name: "Home" },
    { id: "/companies", name: "All Companies" },
    { id: "/products", name: "Advanced Search" },
];

export default async function Header() {
    const products = await getAllProducts();
    let sidebarItems = (await getSidebarItems()) as Partial<Category>[];
    sidebarItems = sidebarItems.map((item) => ({
        id: `/category/${item.name}`,
        name: item.name,
    }));
    sidebarItems = [...defaultSidebarItems, ...sidebarItems] as Category[];
    console.log(sidebarItems);

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
                        <Link href="/home" className="block">
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
                    <ResponsiveButtons />
                </NavbarContent>
            </Navbar>
            <Navbar className="overflow-x-auto w-full top-[5.5rem] opacity-1 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-all z-30 sm:hidden">
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
                            startContent={<IoSearchOutline fontSize="1.3rem" />}
                            endContent={
                                <Tooltip content="Advanced Search">
                                    <Link href="/products">
                                        <FaRegKeyboard fontSize="1.3rem" />
                                    </Link>
                                </Tooltip>
                            }
                        />
                    </SearchMobile>
                </NavbarContent>
            </Navbar>

            <Navbar className="overflow-x-auto w-full top-[5.5rem] opacity-1 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-all z-30">
                <NavbarContent justify="center" className="mx-auto">
                    <CustomNavigationTabs sidebarItems={sidebarItems} />
                </NavbarContent>
            </Navbar>
        </>
    );
}
