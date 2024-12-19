import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { API_URL } from "@/lib/var";

type Props = {};

export default function LoginButton({}: Props) {
    const { data: session, status } = useSession();
    return status !== "authenticated" ? (
        <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            size={"md"}
            onClick={async () => {
                // try {
                //     const data = await fetch(
                //         `https://asepashe.com/api/user/update`,
                //         {
                //             method: "POST",
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify({
                //                 name: "user name",
                //                 email: "john.doe@example.com",
                //                 google_id: "abc",
                //                 image: "whatever",
                //             }),
                //         }
                //     );
                //     const response = await data.json();
                //     console.log(response, data);
                // } catch (error) {
                //     console.log(error);
                // }
                await signIn("google", {
                    redirectTo: location.href,
                    redirect: false,
                });
            }}>
            Sign In
        </Button>
    ) : null;
}
