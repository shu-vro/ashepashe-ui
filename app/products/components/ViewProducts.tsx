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
    const [range, setRange] = useState([PRICE_RANGE[0], PRICE_RANGE[1]]);

    const [currentPage, setCurrentPage] = useState(
        inBound(initialPage, Math.ceil(products.length / PER_PAGE))
    );

    // useEffect(() => {
    //     setProducts(() => {
    //         if (!value) return allProducts;
    //         return allProducts.filter((product) =>
    //             product.name.toLowerCase().includes(value.toLowerCase())
    //         );
    //     });
    // }, [value]);

    const router = useRouter();

    const handleSearch = (
        value: string,
        range: number[],
        selectedTab: KeyType
    ) => {
        setCurrentPage(1);
        setProducts(() => {
            let answer = allProducts;
            // filter by search value
            if (value) {
                answer = answer.filter((product) =>
                    product.name.toLowerCase().includes(value.toLowerCase())
                );
            }
            // filter by price range
            answer = answer.filter((product) => {
                const offer = product.offers?.find(
                    (offer) => new Date(offer.validity).getTime() > Date.now()
                );
                const discountPrice = !offer
                    ? product.price
                    : ((100 - offer.offer_percent) / 100) * product.price;
                return discountPrice >= range[0] && discountPrice <= range[1];
            });
            // filter by tab
            return resolver[selectedTab](answer);
        });
    };
    return (
        <>
            <Input
                onValueChange={debounce((val) => {
                    setValue(val);
                    handleSearch(val, range, selectedTab);
                }, DEBOUNCE_DELAY)}
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
                        setRange(v as [number, number]);
                        handleSearch(value, v as [number, number], selectedTab);
                    }}
                />
                <Tabs
                    aria-label="Options"
                    selectedKey={selectedTab as KeyType}
                    onSelectionChange={(v) => {
                        setSelectedTab(v as KeyType);
                        handleSearch(value, range, v as KeyType);
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
