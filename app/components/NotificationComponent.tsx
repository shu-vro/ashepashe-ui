"use client";

import { UserContext } from "@/contexts/UserContext";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default function NotificationComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const useUser = use(UserContext);

    useEffect(() => {
        (async () => {
            if (useUser?.userCompany) {
                const reg = await navigator.serviceWorker.ready;
                const existingSubscription =
                    await reg.pushManager.getSubscription();
                setIsOpen(!existingSubscription);
            }
        })();
    }, [useUser?.userCompany]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubscribe = async () => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            try {
                const reg = await navigator.serviceWorker.ready;
                const existingSubscription =
                    await reg.pushManager.getSubscription();

                if (existingSubscription) {
                    console.log(existingSubscription);
                    toast.info("You are already subscribed to notifications.");
                } else {
                    const publicVapidKey =
                        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
                    const newSubscription = await reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            urlBase64ToUint8Array(publicVapidKey),
                    });

                    console.log(newSubscription);
                    toast.success(
                        "You will receive push notifications from now on."
                    );
                    // setSubscription(newSubscription);

                    // Send subscription to the server
                    // await fetch("/api/subscribe", {
                    //     method: "POST",
                    //     body: JSON.stringify(newSubscription),
                    //     headers: { "Content-Type": "application/json" },
                    // });
                }
            } catch (error) {
                console.error(
                    "Failed to subscribe to push notifications:",
                    error
                );
                toast.error("Failed to subscribe to push notifications.");
            }
        } else {
            console.log("Push notifications are not supported.");
            toast.error("Push notifications are not supported.");
        }
        handleClose();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Want to accept push notification?
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                As you are a company owner, you will receive
                                many orders. To keep you updated, we will send
                                you push notifications.
                            </p>
                            <p>
                                Don't worry, we won't send you any spam. We will
                                only send you important notifications, for
                                example your new orders.
                            </p>
                            <p>Accept notification?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}>
                                No
                            </Button>
                            <Button color="primary" onPress={handleSubscribe}>
                                Ok
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
