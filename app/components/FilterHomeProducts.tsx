"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React, { Suspense, useState } from "react";
import CategorySlide from "./CategorySlide";
import Loader from "./Loader";
import { first_n } from "@/lib/utils";
import { keys, resolver, KeyType } from "@/lib/filter-products";

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
            <CategorySlide selected={selected} disableCompany={false} />
        </Suspense>
    );
}
