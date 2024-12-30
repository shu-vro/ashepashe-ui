"use client";

import {
    Button,
    Input,
    Pagination,
    Slider,
    Tab,
    Tabs,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { dynamicFakeImageGenerator, paginate, toValidUrl } from "@/lib/utils";
import { ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";
import { inBound } from "@/app/companies/components/ViewCompanies";
import { useRouter } from "next/navigation";
import { keys, resolver, KeyType } from "@/lib/filter-products";
import { DEBOUNCE_DELAY } from "@/lib/var";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { debounce } from "lodash";

const PER_PAGE = 12 as const;
const PRICE_RANGE = Object.freeze([0, 2000]);

export default function ViewProducts({
    allProducts,
    initialPage,
}: {
    allProducts: Product["product"][];
    initialPage: number;
}) {
    const [selectedTab, setSelectedTab] = useState<KeyType>(keys[0]);
    const [value, setValue] = useState("");
    const [products, setProducts] = useState(
        resolver[selectedTab](allProducts)
    );

    const [currentPage, setCurrentPage] = useState(
        inBound(initialPage, Math.ceil(products.length / PER_PAGE))
    );

    useEffect(() => {
        setProducts(() => {
            if (!value) return allProducts;
            return allProducts.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
        });
    }, [value]);

    const router = useRouter();
    return (
        <>
            <Input
                onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                variant="faded"
                radius="md"
                // label="Search"
                placeholder="Search"
                className="m-4 max-w-[500px] mx-auto"
                startContent={<IoSearchOutline fontSize="1.3rem" />}
                endContent={
                    <IoCloseCircleOutline
                        fontSize="1.3rem"
                        className="cursor-pointer"
                        onClick={() => {
                            setValue("");
                        }}
                    />
                }
            />
            <div className="flex flex-wrap items-end justify-between gap-4 mx-4">
                <Slider
                    className="max-w-md"
                    defaultValue={PRICE_RANGE as [number, number]}
                    formatOptions={{ style: "currency", currency: "BDT" }}
                    label="Price Range"
                    showTooltip
                    maxValue={PRICE_RANGE[1]}
                    minValue={0}
                    size="lg"
                    onChangeEnd={(v: number | number[]) => {
                        if (Array.isArray(v)) {
                            setProducts(() => {
                                let filtered = allProducts.filter((p) => {
                                    const offer = p.offers?.find(
                                        (offer) =>
                                            new Date(offer.validity).getTime() >
                                            Date.now()
                                    );
                                    const discountPrice = !offer
                                        ? p.price
                                        : ((100 - offer.offer_percent) / 100) *
                                          p.price;
                                    return (
                                        discountPrice >= v[0] &&
                                        discountPrice <= v[1]
                                    );
                                });
                                if (!value) {
                                    return filtered;
                                } else {
                                    return filtered.filter((product) =>
                                        product.name
                                            .toLowerCase()
                                            .includes(value.toLowerCase())
                                    );
                                }
                            });
                        }
                    }}
                />
                <Tabs
                    aria-label="Options"
                    selectedKey={selectedTab as KeyType}
                    onSelectionChange={(v) => {
                        setSelectedTab(v as KeyType);
                        setCurrentPage(1);
                        setProducts(() => {
                            return resolver[v as KeyType](
                                allProducts.filter((product) => {
                                    if (!value) return true;
                                    return product.name
                                        .toLowerCase()
                                        .includes(value.toLowerCase());
                                })
                            );
                        });
                    }}>
                    {keys.map((key) => (
                        <Tab title={key} key={key}></Tab>
                    ))}
                </Tabs>
                <Button variant="flat" color="danger">
                    Clear Filters
                </Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-sm:grid-cols-2 gap-4 p-4 place-items-center">
                {paginate(products, currentPage, PER_PAGE).map((product) => {
                    const offer = product.offers?.find(
                        (offer) =>
                            new Date(offer.validity).getTime() > Date.now()
                    );
                    return (
                        <ProductCard
                            key={product.slug}
                            className="!w-full h-fit max-sm:min-h-96"
                            name={product.name}
                            description={product?.description}
                            // imageUrl={`https://nextui.org/images/fruit-${
                            //     (index % 8) + 1
                            // }.jpeg`}
                            imageUrl={toValidUrl(product.image1!)}
                            discountPrice={
                                !offer
                                    ? product.price
                                    : ((100 - offer.offer_percent) / 100) *
                                      product.price
                            }
                            actualPrice={product.price}
                            rating={
                                product.rating
                                    ? product.rating.reduce(
                                          (a, b) => a + b.rating,
                                          0
                                      ) / product.rating.length
                                    : 0
                            }
                            seller={product.company.name}
                            sellerAvatar={toValidUrl(product.company.image)}
                            // sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                            // className="min-h-[370px]"
                            link={`/products/${product.slug}`}
                            sellerLink={`/companies/${product.company.slug}`}
                            disableCompany={false}
                        />
                    );
                })}
            </div>
            <div className="w-full">
                <Pagination
                    showControls
                    isCompact
                    total={Math.ceil(products.length / PER_PAGE)}
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
