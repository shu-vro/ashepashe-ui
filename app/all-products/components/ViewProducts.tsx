"use client";

import { Pagination } from "@nextui-org/react";
import React, { useState } from "react";
import { Product } from "../page";
import { paginate } from "@/lib/utils";
import { ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";

export default function ViewProducts({
    allProducts,
}: {
    allProducts: Product[];
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const selectedProducts = paginate(allProducts, currentPage, 12);
    console.log(allProducts);
    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 p-4 place-items-center">
                {selectedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        discountPrice={product.price}
                        actualPrice={product.price}
                        seller={product.company_id}
                        // imageUrl={product.slug}

                        imageUrl={`https://nextui.org/images/fruit-${
                            Math.floor(Math.random() * 7) + 1
                        }.jpeg`}
                        rating={4.56}
                        sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        as={Link}
                        // @ts-expect-error
                        href={`/products/${product.slug}`}
                        className="!w-full"
                        description={product.description}
                    />
                ))}
            </div>
            <div className="w-full">
                <Pagination
                    showControls
                    isCompact
                    total={Math.ceil(allProducts.length / 12)}
                    page={currentPage}
                    onChange={(value) => {
                        setCurrentPage(value);
                        window.scrollTo(0, 0);
                    }}
                    className="mx-auto w-fit"
                />
            </div>
        </>
    );
}
