import React, { use, useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { createStoreAction } from "./createStoreAction";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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

export default function UserDropdown({}: Props) {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent>();
    const [isInstallable, setIsInstallable] = useState(true);
    const { data: session, status } = useSession();
    const useUser = use(UserContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();

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
                <DropdownMenu aria-label="Profile Actions" variant="flat">
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
                    <DropdownItem key="profile_link" href={"/profile/me"}>
                        View Profile
                    </DropdownItem>
                    <DropdownItem key="bookmarks">Bookmarks</DropdownItem>
                    <DropdownItem key="install" onPress={handleInstall}>
                        {deferredPrompt
                            ? isInstallable
                                ? "Install App"
                                : "Installed"
                            : "Not Ready"}
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                                        const formData = new FormData(
                                            e.target as HTMLFormElement
                                        );
                                        const data = Object.fromEntries(
                                            formData.entries()
                                        );
                                        if (!useUser) return;
                                        const user = useUser.user;
                                        const ans = await createStoreAction(
                                            data as any,
                                            user!.id
                                        );

                                        if (ans.status === "200") {
                                            toast.success(
                                                "Store Created Successfully.",
                                                {
                                                    description:
                                                        "Redirecting to your store...",
                                                }
                                            );
                                            push("/my-store/update");
                                        } else {
                                            toast.error(
                                                "Failed to create store.",
                                                {
                                                    description: () => {
                                                        return (
                                                            <pre>
                                                                {JSON.stringify(
                                                                    ans.errors,
                                                                    null,
                                                                    2
                                                                )}
                                                            </pre>
                                                        );
                                                    },
                                                    closeButton: true,
                                                }
                                            );
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
                                        <Button
                                            color="danger"
                                            onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Create Store
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    ) : null;
}
