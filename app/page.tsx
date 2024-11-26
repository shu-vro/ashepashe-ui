"use client";

import CategorySlide from "./components/CategorySlide";
import { Tabs, Tab } from "@nextui-org/tabs";
import { BigCard, SideCard } from "./components/ProductCard";

export default function Home() {
    return (
        <>
            <div className="flex flex-row">
                <BigCard />
                <div className="w-1/2 pt-6">
                    <div className="w-1/2 flex flex-col gap-3">
                        <SideCard />
                        <SideCard />
                        <SideCard />
                    </div>
                </div>
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

export const dynamic = "force-dynamic";
