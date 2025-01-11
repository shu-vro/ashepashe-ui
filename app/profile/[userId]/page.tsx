"use client";

import LoginButton from "@/app/components/Header/LoginButton";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import React from "react";

export default function Page() {
    const { data, status } = useSession();
    return status === "authenticated" ? (
        <div className="w-fit mx-auto mt-8">
            <Card className="p-2">
                <CardBody className="flex-row flex-wrap gap-4 justify-center items-stretch">
                    <Image
                        src={data.user?.image!}
                        width={200}
                        height={200}
                        isBlurred
                    />
                    <div className="flex flex-col h-auto">
                        <div>
                            <h1 className="text-2xl">
                                Name: {data.user?.name}
                            </h1>
                            <p>Email: {data.user?.email}</p>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-4">
                            <Button
                                color="danger"
                                onClick={() => {
                                    signOut({
                                        callbackUrl: "/",
                                        redirect: false,
                                    });
                                }}>
                                Sign Out
                            </Button>
                            <Button
                                color="primary"
                                // onClick={() => {
                                //     signOut({ callbackUrl: "/" });
                                // }}
                            >
                                Go to Store
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    ) : (
        <LoginButton />
    );
}
