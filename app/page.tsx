import { BigCard, SideCard } from "./components/ProductCard";
import FilterHomeProducts from "./components/FilterHomeProducts";
import { Product } from "./all-products/page";

export default async function Home() {
    const products = await getAllProducts();
    return (
        <>
            <div className="flex flex-row gap-4">
                <BigCard />
                <div className="w-1/2 pt-6">
                    <div className="w-1/2 flex flex-col gap-3">
                        <SideCard />
                        <SideCard />
                        <SideCard />
                    </div>
                </div>
            </div>
            <FilterHomeProducts products={products} />
        </>
    );
}

export const dynamic = "force-dynamic";

async function getAllProducts() {
    const response = await fetch("https://asepashe.com/api/products");
    const data: Product[] = await response.json();
    return data;
}
