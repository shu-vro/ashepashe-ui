"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React, { Suspense, useState } from "react";
import CategorySlide from "./CategorySlide";
import Loader from "./Loader";
import { Product } from "../all-products/page";
import { first_n } from "@/lib/utils";

const keys = ["Recent", "Popular", "Cheap", "Expensive", "Discount"] as const;
type KeyType = (typeof keys)[number];

const resolver: Record<
    KeyType,
    (products: Product["product"][]) => Product["product"][]
> = {
    Recent: (products) => {
        const recent = products.sort((a, b) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });
        return recent;
    },
    Popular: (products) => {
        return products;
    },
    Cheap: (products) => {
        const cheap = products.sort((a, b) => {
            return a.price - b.price;
        });
        return cheap;
    },
    Expensive: (products) => {
        const expensive = products.sort((a, b) => {
            return b.price - a.price;
        });
        return expensive;
    },
    Discount: (products) => {
        return products;
    },
};

export default function FilterHomeProducts({
    products,
}: {
    products: Product["product"][];
}) {
    const [selectedTab, setSelectedTab] = useState<KeyType>(keys[0]);

    const selected = first_n(resolver[selectedTab](products));

    return (
        <Suspense fallback={<Loader />}>
            <Tabs
                aria-label="Options"
                className="mt-6 ml-4"
                selectedKey={selectedTab as KeyType}
                onSelectionChange={(value) => {
                    setSelectedTab(value as KeyType);
                }}>
                {keys.map((key) => (
                    <Tab title={key} key={key}></Tab>
                ))}
            </Tabs>
            <CategorySlide
                selected={selected}
                companyImage={""}
                companyName=""
                companySlug=""
            />
        </Suspense>
    );
}
