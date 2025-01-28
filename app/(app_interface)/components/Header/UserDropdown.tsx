import React, { use, useEffect, useMemo, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Input,
    ModalProps,
    Chip,
} from "@heroui/react";
import { useSession, signOut } from "next-auth/react";
import { createStoreAction } from "./createStoreAction";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartContext } from "@/contexts/CartContext";
type Props = {};

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

interface CreateStoreModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function CreateStoreModal({
    isOpen,
    onOpenChange,
    ...rest
}: CreateStoreModalProps & Partial<ModalProps>) {
    const useUser = use(UserContext);
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...rest}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create Store
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                validationBehavior="native"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setLoading(true);
                                    try {
                                        const formData = new FormData(
                                            e.target as HTMLFormElement
                                        );
                                        const data = Object.fromEntries(
                                            formData.entries()
                                        );
                                        if (!useUser || !useUser.user)
                                            return toast.error(
                                                "User not found."
                                            );
                                        const user = useUser.user;
                                        const ans: any =
                                            await createStoreAction(
                                                data as any,
                                                user!.id
                                            );

                                        if (ans.status == 200) {
                                            toast.success(
                                                "Store Created Successfully.",
                                                {
                                                    description:
                                                        "Redirecting to your store...",
                                                }
                                            );
                                            useUser.ticktock();
                                            push("/my-store/update");
                                            onClose();
                                        } else {
                                            toast.error(
                                                `Error(${ans.status}): ${ans.message}`
                                            );
                                        }
                                    } catch (error) {
                                    } finally {
                                        setLoading(false);
                                    }
                                }}>
                                <Input
                                    isRequired
                                    errorMessage="Please enter a valid Company Name"
                                    label="Company Name"
                                    labelPlacement="outside"
                                    name="name"
                                    placeholder="Company Name"
                                    type="text"
                                />
                                <ModalFooter className="w-full pr-0">
                                    <Button color="danger" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isLoading={loading}>
                                        Create Store
                                    </Button>
                                </ModalFooter>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default function UserDropdown({}: Props) {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent>();
    const [isInstallable, setIsInstallable] = useState(true);
    const { data: session, status } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const useUser = use(UserContext);
    const { push } = useRouter();
    const useCart = use(CartContext);

    const ordersLength = useMemo(() => {
        return useUser?.orders.reduce((prev, curr) => {
            const validCount = curr.order_items.filter(
                (f) => f.status !== "cancelled"
            );
            return prev + validCount.length;
        }, 0);
    }, [useUser?.orders]);

    const handleInstall = React.useCallback(async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(undefined);
            setIsInstallable(false);
        }
    }, [deferredPrompt]);

    useEffect(() => {
        const cb = (e: Event) => {
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener("beforeinstallprompt", cb);
        return () => {
            window.removeEventListener("beforeinstallprompt", cb);
        };
    }, []);
    return status === "authenticated" ? (
        <>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src={session.user?.image || ""}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="solid">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{session.user?.name}</p>
                    </DropdownItem>
                    <DropdownItem
                        key="my_store"
                        onPress={() => {
                            if (!useUser?.userCompany) {
                                onOpen();
                            } else {
                                push("/my-store/update");
                            }
                        }}>
                        {!useUser?.userCompany ? "Create Store" : "My Store"}
                    </DropdownItem>
                    {useUser?.userCompany ? (
                        <DropdownItem
                            key="store_orders"
                            onPress={() => {
                                push("/my-store/list-orders");
                            }}
                            endContent={
                                <Chip size="sm" color="success">
                                    for you
                                </Chip>
                            }>
                            Company Orders
                        </DropdownItem>
                    ) : null}
                    <DropdownItem key="profile_link" href={"/profile/me"}>
                        View Profile
                    </DropdownItem>
                    <DropdownItem
                        key="cart"
                        onPress={() => {
                            if (!useCart) return;
                            push("/place-order");
                        }}
                        endContent={
                            useCart?.cart ? (
                                <Chip size="sm">{useCart?.cart.length}</Chip>
                            ) : null
                        }>
                        My Cart
                    </DropdownItem>
                    <DropdownItem
                        key="orders"
                        href="/my-orders"
                        onPress={() => {
                            if (!useCart) return;
                            push("/my-orders");
                        }}
                        endContent={<Chip size="sm">{ordersLength}</Chip>}>
                        My Orders
                    </DropdownItem>
                    <DropdownItem key="install" onPress={handleInstall}>
                        {deferredPrompt
                            ? isInstallable
                                ? "Install App"
                                : "Installed"
                            : "App Not Ready"}
                    </DropdownItem>
                    <DropdownItem
                        key="report"
                        href={"/report"}
                        onPress={() => {
                            push("/report");
                        }}>
                        Report a Problem
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        onPress={() =>
                            signOut({
                                redirect: false,
                            })
                        }>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <CreateStoreModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}></CreateStoreModal>
        </>
    ) : null;
}
