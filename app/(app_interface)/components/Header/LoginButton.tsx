import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";

type Props = {};

export default function LoginButton({}: Props) {
    const { status } = useSession();
    return status !== "authenticated" ? (
        <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            size={"md"}
            onPress={async () => {
                const currentPath = window.location.pathname;
                const redirectTo =
                    currentPath === "/"
                        ? window.location.origin + "/my-store/update"
                        : window.location.href;
                await signIn("google", {
                    redirectTo,
                    redirect: false,
                });
            }}>
            Sign In
        </Button>
    ) : null;
}
