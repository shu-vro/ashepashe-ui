"use client";

import CategorySlide from "./components/CategorySlide";
import { Tabs, Tab } from "@nextui-org/tabs";
import { BigCard } from "./components/ProductCard";

export default function Home() {
    return (
        <>
            <div>
                <BigCard />
                <div className="w-1/2"></div>
            </div>
            <Tabs className="mt-6 ml-4">
                <Tab title="Popular" key="Popular"></Tab>
                <Tab title="Cheap" key="Cheap"></Tab>
                <Tab title="Expensive" key="Expensive"></Tab>
                <Tab title="Discount" key="Discount"></Tab>
            </Tabs>
            <CategorySlide />
        </>
    );
}
