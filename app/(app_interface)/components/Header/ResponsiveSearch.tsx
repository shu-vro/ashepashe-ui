"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import ThemeButton from "../ThemeButton";
import { CiBookmark } from "react-icons/ci";
import {
    NavbarItem,
    Button,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
<<<<<<< HEAD:app/components/Header/ResponsiveSearch.tsx
import SearchMobile from "./SearchMobile";

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

export default function ResponsiveButtons({
    products,
}: {
    products: Product["product"][];
}) {
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
        const fetchData = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/user');
              const data = await response.json();
              
              if (data) {
                // Store data in localStorage
                localStorage.setItem('user', JSON.stringify(data));
                console.log('User data stored:', data);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
        fetchData(); 
        const cb = (e: Event) => {
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener("beforeinstallprompt", cb);
        return () => {
            window.removeEventListener("beforeinstallprompt", cb);
        };

       

    }, []);

    const Login = async () => {
        window.location.href = "http://127.0.0.1:8000/auth/google";
    };

=======
import LoginButton from "./LoginButton";
import UserDropdown, { CreateStoreModal } from "./UserDropdown";
import { useRouter } from "next/navigation";
import { use } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";

export default function ResponsiveButtons({}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();
    const useUser = use(UserContext);
    const { status } = useSession();
>>>>>>> e4ce16e8288c50538e7faacc8228dcecd822ebea:app/(app_interface)/components/Header/ResponsiveSearch.tsx
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
<<<<<<< HEAD:app/components/Header/ResponsiveSearch.tsx
            <NavbarItem className="w-full">
                <button onClick={() => Login()} className="btn btn-primary">Login</button>
            </NavbarItem>
=======
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
>>>>>>> e4ce16e8288c50538e7faacc8228dcecd822ebea:app/(app_interface)/components/Header/ResponsiveSearch.tsx
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
                        <DropdownItem key="my_store" href={"/my-store/create"}>
                            Create Store
                        </DropdownItem>
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

function CustomDivider({ ...props }) {
    return (
        <Divider
            orientation="vertical"
            {...props}
            className={cn("h-6 max-[576px]:hidden", props?.className)}
        />
    );
}
