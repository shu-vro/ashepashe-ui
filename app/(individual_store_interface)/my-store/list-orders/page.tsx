"use client";

import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import CompanyOrderTable from "./CompanyOrderTable";
import { getOwnerOrdersAction } from "./getOwnerOrdersAction";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";

export default function Page() {
    const [orders, setOrders] = useState<any[]>([]);
    const useUser = use(UserContext);
    const [tick, setTick] = useState(false);
    const ticktock = useCallback(() => {
        setTick((tick) => !tick);
    }, []);
    useEffect(() => {
        if (!useUser?.userCompany) {
            toast.error("Company not found");
            return;
        }
        (async () => {
            try {
                const res: Order[] = (
                    await getOwnerOrdersAction({
                        company_id: useUser?.userCompany?.id!,
                    })
                ).data;
                const importantData = res
                    .map((order) => {
                        return order.order_items
                            .filter(
                                (orderInner) =>
                                    orderInner.products.company_id ===
                                    useUser?.userCompany?.id
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
                        description: order.products.price,
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
                    // others: order,
                }));
                console.log(importantData, serializedData, res);
                setOrders(serializedData);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [useUser?.userCompany?.id, tick]);

    return (
        <div>
            <h1 className="my-3 text-3xl font-bold">My Orders:</h1>
            <div className="mt-8 mx-3">
                <CompanyOrderTable data={orders} ticktock={ticktock} />
            </div>
        </div>
    );
}
