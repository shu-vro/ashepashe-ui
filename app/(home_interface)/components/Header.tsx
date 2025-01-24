"use client";

import { CustomDivider } from "@/app/(app_interface)/components/Header/ResponsiveSearch";
import {
    Button,
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import React, { use } from "react";
import AppIcon from "@/assets/she.png";
import ThemeButton from "@/app/(app_interface)/components/ThemeButton";
import LoginButton from "@/app/(app_interface)/components/Header/LoginButton";
import UserDropdown, {
    CreateStoreModal,
} from "@/app/(app_interface)/components/Header/UserDropdown";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";

export default function Header() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();
    const useUser = use(UserContext);
    const { status } = useSession();
    return (
        <Navbar isBordered maxWidth="full" className="py-3">
            <NavbarContent justify="start" className="grow">
                <NavbarItem className="md:hidden"></NavbarItem>
                <NavbarBrand>
                    <Link href="#" className="block">
                        <Image
                            src={AppIcon.src}
                            alt="AAmarStore"
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
                {/* {status === "authenticated" && (
                    <>
                        <CustomDivider />
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={() => {
                                if (!useUser?.userCompany) {
                                    onOpen();
                                } else {
                                    push("/my-store/update");
                                }
                            }}>
                            {!useUser?.userCompany
                                ? "Create Store"
                                : "My Store"}
                        </Button>
                    </>
                )}
                <CreateStoreModal isOpen={isOpen} onOpenChange={onOpenChange} />
                <CustomDivider /> */}
                <NavbarItem>
                    <LoginButton />
                    <UserDropdown />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
