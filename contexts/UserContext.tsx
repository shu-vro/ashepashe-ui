"use client";
import { API_URL } from "@/lib/var";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<UserContextType["user"]>>;
    userCompany: Company | null;
    setUserCompany: React.Dispatch<
        React.SetStateAction<UserContextType["userCompany"]>
    >;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserContextType["user"]>(null);
    const [userCompany, setUserCompany] =
        useState<UserContextType["userCompany"]>(null);
    const { data } = useSession();

    useEffect(() => {
        if (data?.user) {
            (async () => {
                const res = await fetch(`${API_URL}/user/${data.user?.email}`);
                const x = await res.json();
                const userData = x.user as User;
                if (!userData && x.status !== "success") {
                    return;
                }
                const companyData = userData.company[0] as Company;
                setUserCompany(companyData);
                setUser(userData);
            })();
        } else {
            setUser(null);
        }

        return () => {};
    }, [data]);

    return (
        <UserContext.Provider
            value={{ user, setUser, userCompany, setUserCompany }}>
            {children}
        </UserContext.Provider>
    );
}
