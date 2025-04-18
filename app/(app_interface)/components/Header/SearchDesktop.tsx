"use client";

import { cn, dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";
import { DEBOUNCE_DELAY } from "@/lib/var";
import {
    Card,
    CardBody,
    Input,
    ScrollShadow,
    Tooltip,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SearchItems from "./SearchItems";
import { debounce } from "lodash";
import { FaRegKeyboard } from "react-icons/fa6";
import Link from "next/link";

export default function SearchDesktop({
    products,
    ...rest
}: {
    products: Product["product"][];
} & React.ComponentProps<"div">) {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [value, setValue] = useState("");

    const selectedProducts = useMemo(() => {
        if (!value) return [];
        return products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);
    // const selectedProducts = [];

    useEffect(() => {
        function esc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        }
        window.addEventListener("keyup", esc);
        return () => window.addEventListener("keyup", esc);
    }, []);

    const onSearchOpen = (value: boolean) => {
        setSearchOpen(value);
        value ? router.push("#searching") : router.push("#");
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div {...rest} className={cn("relative", rest?.className || "")}>
                <Input
                    onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                    variant="bordered"
                    radius="md"
                    placeholder="Search"
                    className="max-w-[500px] z-40"
                    onFocus={() => onSearchOpen(true)}
                    // onBlur={() => setSearchOpen(false)}
                    startContent={<IoSearchOutline fontSize="1.3rem" />}
                    endContent={
                        <Tooltip content="Advanced Search">
                            <Link href="/products">
                                <FaRegKeyboard fontSize="1.3rem" />
                            </Link>
                        </Tooltip>
                    }
                />
                <AnimatePresence>
                    {searchOpen && selectedProducts.length && (
                        <>
                            <div
                                className="fixed top-0 left-0 inset-0 w-screen h-screen z-30 bg-neutral-800/25"
                                onClick={() => {
                                    onSearchOpen(false);
                                }}></div>
                            <Card
                                className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 z-40"
                                as={motion.div}
                                exit={{ opacity: 0 }}
                                key="search-menu">
                                <CardBody className="w-[66vw] max-[480px]:w-screen text-wrap bg-content2">
                                    <ScrollShadow className="max-h-[60vh]">
                                        {selectedProducts.map((product) => {
                                            const offer = product.offers?.find(
                                                (offer) =>
                                                    new Date(
                                                        offer.validity
                                                    ).getTime() > Date.now()
                                            );
                                            const discountPrice = !offer
                                                ? product.price
                                                : ((100 - offer.offer_percent) /
                                                      100) *
                                                  product.price;
                                            return (
                                                <SearchItems
                                                    key={product.id}
                                                    label={product.name}
                                                    actualPrice={product.price}
                                                    discountPrice={Math.round(
                                                        discountPrice
                                                    )}
                                                    company_name={
                                                        product.company.name
                                                    }
                                                    companyAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                    // image={dynamicFakeImageGenerator()}
                                                    image={toValidUrl(
                                                        product.image1!
                                                    )}
                                                    slug={product.slug}
                                                    onSearchOpen={onSearchOpen}
                                                />
                                            );
                                        })}
                                    </ScrollShadow>
                                </CardBody>
                            </Card>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </Suspense>
    );
}
