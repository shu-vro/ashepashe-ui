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
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<UserContextType["orders"]>>;
    companyOrders: {
        orderer: {
            name: string;
            description: string;
            avatar: string;
        };
        product: Partial<Product["product"]>;
        status: string;
        quantity: number;
        totalPrice: number;
        order_item_id: number;
        order_id: number;
        ordererPhone: string;
        ordererAddress: string;
        product_id: number;
        created_at: number;
    }[];
    setCompanyOrders: React.Dispatch<
        React.SetStateAction<UserContextType["companyOrders"]>
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
    const [orders, setOrders] = useState<UserContextType["orders"]>([]);
    const [tick, setTick] = useState(false);
    const [companyOrders, setCompanyOrders] = useState<
        UserContextType["companyOrders"]
    >([]);
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
                const orderRes = await fetch(
                    `${API_URL}/user-order/${userData.id}`
                );
                const order = (await orderRes.json()).data;
                setOrders(order);
                const companyData = userData.company?.[0] as Company;
                if (!companyData) {
                    setUser(userData);
                    setUserCompany(null);
                    setCompanySections([]);
                    return;
                }
                const companyRes = await fetch(
                    `${API_URL}/company/${companyData.slug}`
                );
                const company: Company = await companyRes.json();
                setUserCompany(company);
                setUser(userData);
                if (!company) return;
                const companyOrdersRes = await fetch(
                    `${API_URL}/owner-order/${company.id}`
                );
                const companyOrders: Order[] = (await companyOrdersRes.json())
                    .data;

                const importantData = companyOrders
                    .map((order) => {
                        return order.order_items
                            .filter(
                                (orderInner) =>
                                    orderInner.products.company_id ===
                                    company?.id
                            )
                            .map((o) => ({
                                ...o,
                                address: order.address,
                                phone: order.phone,
                                name: order.name,
                                orderer: order.user,
                            }));
                    })
                    .flat();

                const serializedData = importantData.map((order) => ({
                    orderer: {
                        name: order.orderer.name,
                        description: order.name,
                        avatar: order.orderer.image,
                    },
                    product: {
                        name: order.products.name,
                        description: order.products.price.toString(),
                        avatar: order.products.image1,
                    },
                    status: order.status,
                    quantity: order.quantity,
                    totalPrice: order.quantity * order.products.price,

                    order_item_id: order.id,
                    order_id: order.order_id,
                    ordererPhone: order.phone,
                    ordererAddress: order.address,
                    product_id: order.products.id,
                    created_at: Date.parse(order.created_at),
                    // others: order,
                }));
                setCompanyOrders(serializedData);

                const res2 = await fetch(
                    `${API_URL}/company-sections/${company.id}`
                );
                const sd = await res2.json();
                setCompanySections(sd.sections);
            } catch (error) {
                toast.error("Error fetching user data");
                console.log(error);
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
                orders,
                setOrders,
                companyOrders,
                setCompanyOrders,
                ticktock,
            }}>
            {children}
        </UserContext.Provider>
    );
}
