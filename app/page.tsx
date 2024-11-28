import { BigCard, SideCard } from "./components/ProductCard";
import FilterHomeProducts from "./components/FilterHomeProducts";
import { Product } from "./all-products/page";

export default async function Home() {
    const products = await getAllProducts();
    return (
        <>
            <div className="grid grid-cols-3 gap-4 mx-8 mt-4">
                <BigCard />
                <div className="flex flex-col gap-3 justify-stretch h-full">
                    <SideCard />
                    <SideCard />
                    <SideCard />
                </div>
                <div className="flex flex-col gap-3">
                    <SideCard />
                    <SideCard />
                    <SideCard />
                </div>
            </div>
            <FilterHomeProducts products={products} />
        </>
    );
}

export const dynamic = "force-dynamic";

async function getAllProducts() {
    const response = await fetch("https://asepashe.com/api/products");
    const data: Product["product"][] = await response.json();
    return data;
}
