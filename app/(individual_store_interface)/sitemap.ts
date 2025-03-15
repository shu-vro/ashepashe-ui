import type { MetadataRoute } from "next";
import { API_URL, FRONTEND_URL } from "@/lib/var";
import { toValidUrl } from "@/lib/utils";

export async function generateSitemaps() {
    // Fetch the total number of products and calculate the number of sitemaps needed
    return [{ id: "companies" }, { id: "products" }, { id: "static" }];
}

export default async function sitemap({
    id,
}: {
    id: string;
}): Promise<MetadataRoute.Sitemap> {
    // Google's limit is 50,000 URLs per sitemap
    // const start = id * 50000;
    // const end = start + 50000;
    // const products = await getProducts(
    //     `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
    // );
    if (id === "companies") {
        const response = await fetch(`${API_URL}/${id}`);
        const data: Company[] = await response.json();

        return data.map((company) => ({
            url: `${FRONTEND_URL}/a/${company.slug}`,
            lastModified: company.created_at,
            images: [company.image],
            changeFrequency: "daily",
        }));
    } else if (id === "products") {
        const response = await fetch(`${API_URL}/${id}`);
        const data: Product["product"][] = await response.json();

        return data.map((product) => ({
            url: `${FRONTEND_URL}/${product.company.slug}/${product.slug}`,
            lastModified: product.created_at,
            images: [toValidUrl(product.image1!)],
            changeFrequency: "daily",
        }));
    } else {
        return [
            {
                url: `${FRONTEND_URL}/`,
                lastModified: new Date().toISOString(),
                priority: 1,
                changeFrequency: "daily",
            },
            {
                url: `${FRONTEND_URL}/my-store/create`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${FRONTEND_URL}/my-store/update`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${FRONTEND_URL}/place-order`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${FRONTEND_URL}/my-orders`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${FRONTEND_URL}/report`,
                lastModified: new Date().toISOString(),
            },
        ];
    }
}
