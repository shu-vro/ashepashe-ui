"use client";
import { API_URL } from "@/lib/var";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<UserContextType["user"]>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserContextType["user"]>(null);
    const { data } = useSession();

    useEffect(() => {
        if (data?.user) {
            (async () => {
                const res = await fetch(`${API_URL}/user/${data.user?.email}`);
                const x = await res.json();
                const userData = x.user[0] as User;
                setUser(userData);
            })();
        } else {
            setUser(null);
        }

        return () => {};
    }, [data]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
