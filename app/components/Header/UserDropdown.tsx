import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
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
                <DropdownItem key="my_store" href={"/my-store/create"}>
                    Create Store
                </DropdownItem>
                <DropdownItem key="profile_link" href={"/profile/me"}>
                    View Profile
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
                <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() =>
                        signOut({
                            redirect: false,
                        })
                    }>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    ) : null;
}
