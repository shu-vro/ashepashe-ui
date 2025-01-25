"use client";

import ThemeButton from "../ThemeButton";
import { CiBookmark, CiShoppingCart } from "react-icons/ci";
import {
    NavbarItem,
    Button,
    Divider,
    useDisclosure,
    Badge,
} from "@heroui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";
import UserDropdown, { CreateStoreModal } from "./UserDropdown";
import { useRouter } from "next/navigation";
import { use, useMemo } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import { OrderDrawerContext } from "@/contexts/OrderDrawerContext";
import { CartContext } from "@/contexts/CartContext";

export default function ResponsiveButtons({}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();
    const useUser = use(UserContext);
    const { status } = useSession();
    const useOrderDrawer = use(OrderDrawerContext);
    const useCart = use(CartContext);

    const ordersLength = useMemo(() => {
        return useUser?.orders.reduce(
            (prev, curr) => prev + curr.order_items.length,
            0
        );
    }, [useUser?.orders]);
    return (
        <>
            <NavbarItem>
                <Badge
                    color="warning"
                    size="lg"
                    content={useCart?.cart?.length}
                    isInvisible={useCart?.cart?.length === 0}>
                    <Button
                        color="primary"
                        variant="flat"
                        isIconOnly
                        className="text-xl mob:text-2xl"
                        onPress={() => {
                            if (!useOrderDrawer) return;
                            useOrderDrawer.onOrderDrawerOpenChange(true);
                        }}>
                        <CiBookmark />
                    </Button>
                </Badge>
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <Badge
                    color="warning"
                    size="lg"
                    content={ordersLength}
                    isInvisible={ordersLength === 0}>
                    <Button
                        as={Link}
                        href="/my-orders"
                        color="primary"
                        variant="flat"
                        isIconOnly
                        className="text-xl mob:text-2xl">
                        <CiShoppingCart />
                    </Button>
                </Badge>
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <ThemeButton />
            </NavbarItem>
            {status === "authenticated" && (
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
                        {!useUser?.userCompany ? "Create Store" : "My Store"}
                    </Button>
                </>
            )}
            <CustomDivider />
            <NavbarItem>
                <LoginButton />
                <UserDropdown />
            </NavbarItem>
            <CreateStoreModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}

export function CustomDivider({ ...props }) {
    return (
        <Divider
            orientation="vertical"
            {...props}
            className={cn("h-6 max-[576px]:hidden", props?.className)}
        />
    );
}
