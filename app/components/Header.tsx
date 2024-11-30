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
import { cn, dynamicFakeImageGenerator } from "@/lib/utils";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AnimatePresence, motion } from "framer-motion";
import AppIcon from "@/assets/she.png";
import { Product } from "../all-products/page";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { API_URL } from "@/lib/var";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const DEBOUNCE_DELAY = 1000; // ms

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data: Product["product"][] = await response.json();
    return data;
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [products, setProducts] = useState<Product["product"][]>([]);

    useEffect(() => {
        getAllProducts().then(setProducts).catch(console.error);
    }, []);

    return (
        <>
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="full"
                className="py-3">
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
        </>
    );
}

function SearchDesktop({
    products,
    ...rest
}: {
    products: Product["product"][];
} & React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [value, setValue] = useState("");

    const selectedProducts = useMemo(() => {
        if (!value) return [];
        return products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);
    // const selectedProducts = [];

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
            <div {...rest} className={cn("relative", rest?.className || "")}>
                <Input
                    onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                    variant="bordered"
                    radius="md"
                    placeholder="Search"
                    className="max-w-[500px] z-40"
                    onFocus={() => onSearchOpen(true)}
                    // onBlur={() => setSearchOpen(false)}
                    endContent={<IoSearchOutline fontSize="1.3rem" />}
                />
                <AnimatePresence>
                    {searchOpen && selectedProducts.length && (
                        <>
                            <div
                                className="fixed top-0 left-0 inset-0 w-screen h-screen z-30 bg-neutral-800/25"
                                onClick={() => {
                                    onSearchOpen(false);
                                }}></div>
                            <Card
                                className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 z-40"
                                as={motion.div}
                                exit={{ opacity: 0 }}
                                key="search-menu">
                                <CardBody className="w-[66vw] max-[480px]:w-screen text-wrap bg-content2">
                                    <ScrollShadow className="max-h-[60vh]">
                                        {selectedProducts.map((product) => (
                                            <SearchItems
                                                key={product.id}
                                                label={product.name}
                                                actualPrice={product.price}
                                                discountPrice={product.price}
                                                company_name={
                                                    product.company.name
                                                }
                                                companyAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                image={dynamicFakeImageGenerator()}
                                                slug={product.slug}
                                                onSearchOpen={onSearchOpen}
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

function SearchMobile({ products }: { products: Product["product"][] }) {
    const [value, setValue] = useState("");
    const selectedProducts = useMemo(() => {
        if (!value) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);
    return (
        <>
            <Input
                onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                variant="bordered"
                radius="md"
                placeholder="Search"
                className="max-w-[500px] z-40"
                endContent={<IoSearchOutline fontSize="1.3rem" />}
            />
            <div className="max-h-[70vh] overflow-y-auto">
                <ScrollShadow>
                    {selectedProducts.map((product) => (
                        <SearchItems
                            key={product.id}
                            label={product.name}
                            actualPrice={product.price}
                            discountPrice={product.price}
                            company_name={product.company.name}
                            companyAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            image={dynamicFakeImageGenerator()}
                            // image={product.image1 as string}
                            slug={product.slug}
                            onSearchOpen={() => {}}
                        />
                    ))}
                </ScrollShadow>
            </div>
        </>
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
    onSearchOpen,
}: {
    label: string;
    actualPrice: number;
    discountPrice: number;
    company_name: string;
    companyAvatar: string;
    rating?: number;
    image: string;
    slug: string;
    onSearchOpen: (b: boolean) => void;
}) {
    return (
        <Card
            className="mt-2 bg-none w-full"
            as={Link}
            href={`/products/${slug}`}>
            <CardBody
                className="flex-row justify-start gap-4 bg-none"
                onClick={() => {
                    onSearchOpen(false);
                }}>
                <Image className="w-20 h-20" src={image} alt={label} />
                <div className="flex flex-col justify-center">
                    <div className="font-bold">{label}</div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                    <div>
                        <del className="text-default-500">{actualPrice}৳</del>{" "}
                        <span className="text-2xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    {/* <User
                        name={company_name}
                        avatarProps={{
                            className: "w-8 h-8",
                            src: companyAvatar,
                        }}
                        classNames={{
                            name: "truncate w-48 text-lg italic",
                        }}
                        className="grow-0"
                    /> */}
                    <h1>{company_name}</h1>
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

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
    /**
     * Returns an array of DOMString items containing the platforms on which the event was dispatched.
     * This is provided for user agents that want to present a choice of versions to the user such as,
     * for example, "web" or "play" which would allow the user to chose between a web version or
     * an Android version.
     */
    readonly platforms: Array<string>;

    /**
     * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
     */
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;

    /**
     * Allows a developer to show the install prompt at a time of their own choosing.
     * This method returns a Promise.
     */
    prompt(): Promise<void>;
}
function ResponsiveButtons({ products }: { products: Product["product"][] }) {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent>();
    const [isInstallable, setIsInstallable] = useState(true);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(undefined);
            setIsInstallable(false);
        }
    };

    useEffect(() => {
        const cb = (e: Event) => {
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener("beforeinstallprompt", cb);
        return () => {
            window.removeEventListener("beforeinstallprompt", cb);
        };
    }, []);

    return (
        <>
            <NavbarItem className="sm:hidden">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            as={Link}
                            color="primary"
                            href="#"
                            variant="flat"
                            isIconOnly
                            className="text-xl mob:text-2xl">
                            <IoSearchOutline />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="h-[90vh]">
                        <DrawerHeader>
                            <DrawerTitle>Search</DrawerTitle>
                            <SearchMobile products={products} />
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="faded">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </NavbarItem>
            <CustomDivider className="md:hidden" />
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
                        <DropdownItem key="my_store">My Store</DropdownItem>
                        <DropdownItem key="bookmarks">Bookmarks</DropdownItem>
                        <DropdownItem key="install" onClick={handleInstall}>
                            {deferredPrompt
                                ? isInstallable
                                    ? "Install App"
                                    : "Installed"
                                : "Not Ready"}
                        </DropdownItem>
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
