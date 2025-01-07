"use client";
import { API_URL } from "@/lib/var";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<UserContextType["user"]>>;
    userCompany: Company | null;
    setUserCompany: React.Dispatch<
        React.SetStateAction<UserContextType["userCompany"]>
    >;
    companySections: Category[];
    setCompanySections: React.Dispatch<
        React.SetStateAction<UserContextType["companySections"]>
    >;
    ticktock: () => void;
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
    const [companySections, setCompanySections] = useState<
        UserContextType["companySections"]
    >([]);
    const [tick, setTick] = useState(false);
    const ticktock = () => {
        setTick((p) => !p);
    };
    const { data } = useSession();

    useEffect(() => {
        if (!data?.user) {
            setUser(null);
            setUserCompany(null);
            setCompanySections([]);
            return;
        }
        (async () => {
            try {
                const res = await fetch(`${API_URL}/user/${data.user?.email}`);
                const x = await res.json();
                const userData = x.user as User;
                if (!userData && x.status !== "success") {
                    return;
                }
                const companyData = userData.company[0] as Company;
                setUserCompany(companyData);
                setUser(userData);
                if (!companyData) return;
                const res2 = await fetch(
                    `${API_URL}/company-sections/${companyData.id}`
                );
                const sd = await res2.json();
                console.log(sd);
                setCompanySections(sd.sections);
            } catch (error) {
                toast.error("Error fetching user data");
            }
        })();

        return () => {};
    }, [data, tick]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userCompany,
                setUserCompany,
                companySections,
                setCompanySections,
                ticktock,
            }}>
            {children}
        </UserContext.Provider>
    );
}
