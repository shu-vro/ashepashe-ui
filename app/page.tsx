import FilterHomeProducts from "./components/FilterHomeProducts";
import CompanySlide from "./components/CompanySlide";
import { API_URL } from "@/lib/var";

export default async function Home() {
    const { products, companies } = await getAllProducts();
    return (
        <div className="my-4">
            <h2 className="text-2xl font-bold text-default-400 ml-4">
                Products
            </h2>
            <FilterHomeProducts products={products} />
            <h2 className="text-2xl font-bold text-default-400 ml-4">
                Restaurants
            </h2>
            <CompanySlide companies={companies} />
        </div>
    );
}

export const dynamic = "force-dynamic";

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products: Product["product"][] = await response.json();
    const response2 = await fetch(`${API_URL}/companies/8`);
    const companies: Company[] = await response2.json();
    return { products, companies };
}
