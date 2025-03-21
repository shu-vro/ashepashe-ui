import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { API_URL } from "@/lib/var";

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
                await signIn("google", {
                    redirectTo: location.href,
                    redirect: false,
                });
            }}>
            Sign In
        </Button>
    ) : null;
}
