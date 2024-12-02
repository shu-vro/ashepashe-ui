"use client";

import { Pagination } from "@nextui-org/react";
import React, { useState } from "react";
import { Product } from "../page";
import { dynamicFakeImageGenerator, paginate, toValidUrl } from "@/lib/utils";
import { ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";
import { inBound } from "@/app/all-companies/components/ViewCompanies";
import { useRouter } from "next/navigation";

const PER_PAGE = 12;

export default function ViewProducts({
    allProducts,
    initialPage,
}: {
    allProducts: Product["product"][];
    initialPage: number;
}) {
    const [currentPage, setCurrentPage] = useState(
        inBound(initialPage, Math.ceil(allProducts.length / PER_PAGE))
    );
    const selectedProducts = paginate<Product["product"]>(
        allProducts,
        currentPage,
        PER_PAGE
    );
    const router = useRouter();
    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-sm:grid-cols-2 gap-4 p-4 place-items-center">
                {selectedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        discountPrice={product.price}
                        actualPrice={500}
                        seller={product.company.name}
                        sellerLink={`/all-companies/${product.company.slug}`}
                        imageUrl={toValidUrl(product.image1!)}
                        // imageUrl={dynamicFakeImageGenerator()}
                        // rating={4.56}
                        // sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        sellerAvatar={toValidUrl(product.company.image)}
                        className="!w-full h-fit max-sm:min-h-96"
                        link={`/products/${product.slug}`}
                    />
                ))}
            </div>
            <div className="w-full">
                <Pagination
                    showControls
                    isCompact
                    total={Math.ceil(allProducts.length / PER_PAGE)}
                    page={currentPage}
                    onChange={(value) => {
                        setCurrentPage(value);
                        window.scrollTo(0, 0);
                        router.push(`?page=${value}`);
                    }}
                    className="mx-auto w-fit"
                />
            </div>
        </>
    );
}
