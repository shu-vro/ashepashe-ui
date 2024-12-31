"use client";

import {
    Button,
    Form,
    Input,
    Pagination,
    Select,
    Selection,
    SelectItem,
    Slider,
    Tab,
    Tabs,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
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
import { Drawer } from "vaul";
import {
    Drawer as DrawerRoot,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { bangladesh } from "@/lib/divisions.json";

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
    const [selectCompany, setSelectCompany] = React.useState<Selection>(
        new Set([])
    );
    const [selectDistrict, setSelectDistrict] = React.useState<Selection>(
        new Set([])
    );
    const [selectDivision, setSelectDivision] = React.useState<Selection>(
        new Set([])
    );
    const [currentPage, setCurrentPage] = useState(
        inBound(initialPage, Math.ceil(products.length / PER_PAGE))
    );

    const companies = useMemo(() => {
        return Array(
            ...new Map(
                allProducts.map((product) => [
                    product.company.id,
                    product.company,
                ])
            ).values()
        );
    }, [allProducts]);

    const divisions = useMemo(() => {
        return Object.keys(bangladesh);
    }, []);

    const districts = useMemo(() => {
        if (selectDistrict !== "all" && selectDistrict.size) {
            setSelectDistrict(new Set([]));
        }
        if (selectDivision !== "all" && selectDivision.size) {
            return Object.entries(bangladesh)
                .filter(([key]) => selectDivision.has(key))
                .map(([_, value]) => value)
                .flat();
        } else {
            return Object.values(bangladesh).flat();
        }
    }, [selectDivision]);

    const router = useRouter();

    const handleSearch = (
        value: string,
        range: number[],
        selectedTab: KeyType,
        selectCompany: Selection,
        selectDivision: Selection,
        selectDistrict: Selection
    ) => {
        setCurrentPage(1);
        setProducts(() => {
            let answer = allProducts;
            answer = answer.filter((product) => {
                const valueMatch = value
                    ? product.name.toLowerCase().includes(value.toLowerCase())
                    : true;
                const companyMatch =
                    selectCompany === "all" ||
                    (selectCompany.size
                        ? selectCompany.has(product.company.id.toString())
                        : true);

                const divisionMatch =
                    selectDivision === "all" ||
                    (selectDivision.size
                        ? selectDivision.has(product.company.division)
                        : true);

                const districtMatch =
                    selectDistrict === "all" ||
                    (selectDistrict.size
                        ? selectDistrict.has(product.company.city)
                        : true);

                const offer = product.offers?.find(
                    (offer) => new Date(offer.validity).getTime() > Date.now()
                );
                const discountPrice = !offer
                    ? product.price
                    : ((100 - offer.offer_percent) / 100) * product.price;
                const priceMatch =
                    discountPrice >= range[0] && discountPrice <= range[1];

                return (
                    valueMatch &&
                    companyMatch &&
                    divisionMatch &&
                    districtMatch &&
                    priceMatch
                );
            });
            return resolver[selectedTab](answer);
        });
    };
    return (
        <div className="p-4">
            <Input
                onValueChange={debounce((val) => {
                    setValue(val);
                    handleSearch(
                        val,
                        range,
                        selectedTab,
                        selectCompany,
                        selectDivision,
                        selectDistrict
                    );
                }, DEBOUNCE_DELAY)}
                variant="faded"
                radius="md"
                // label="Search"
                placeholder="Search"
                className="m-4 max-w-[500px] mx-auto"
                defaultValue={value}
                startContent={<IoSearchOutline fontSize="1.3rem" />}
                endContent={
                    <IoCloseCircleOutline
                        fontSize="1.3rem"
                        className="cursor-pointer"
                        onClick={() => {
                            setValue("");
                            handleSearch(
                                "",
                                range,
                                selectedTab,
                                selectCompany,
                                selectDivision,
                                selectDistrict
                            );
                        }}
                    />
                }
            />
            <DrawerRoot direction="right" modal={false}>
                <DrawerTrigger asChild>
                    <Button>Advanced Filters</Button>
                </DrawerTrigger>
                <Drawer.Portal>
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-50 outline-none w-[380px] flex inset-x-[unset] backdrop:blur-lg"
                        // The gap between the edge of the screen and the drawer is 8px in this case.
                        style={
                            {
                                "--initial-transform": "calc(100% + 8px)",
                            } as React.CSSProperties
                        }>
                        <div className="bg-foreground/20 mx-auto w-full backdrop-blur-sm rounded-md border-l-2 border-t-2 border-foreground/30">
                            <DrawerHeader>
                                <DrawerTitle>Advanced Filters</DrawerTitle>
                                <DrawerDescription>
                                    Filter products by price range and options
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0 flex flex-wrap items-center justify-around gap-2">
                                <Slider
                                    className="max-w-md"
                                    defaultValue={range as [number, number]}
                                    formatOptions={{
                                        style: "currency",
                                        currency: "BDT",
                                    }}
                                    label="Price Range"
                                    showTooltip
                                    maxValue={PRICE_RANGE[1]}
                                    minValue={0}
                                    size="lg"
                                    onChangeEnd={(v: number | number[]) => {
                                        setRange(v as [number, number]);
                                    }}
                                />

                                <Tabs
                                    aria-label="Options"
                                    size="sm"
                                    className="w-full"
                                    selectedKey={selectedTab as KeyType}
                                    onSelectionChange={(v) => {
                                        setSelectedTab(v as KeyType);
                                    }}>
                                    {keys.map((key) => (
                                        <Tab
                                            title={key}
                                            key={key}
                                            className="text-xs p-1"></Tab>
                                    ))}
                                </Tabs>
                                <Select
                                    className="w-full"
                                    label="Select Companies"
                                    placeholder="Select Multiple Companies"
                                    selectedKeys={selectCompany}
                                    onSelectionChange={(v) => {
                                        setSelectCompany(v);
                                    }}
                                    selectionMode="multiple">
                                    {companies.map((company) => (
                                        <SelectItem key={company.id}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <div className="flex flex-row w-full gap-2">
                                    <Select
                                        className="w-full max-w-[170px]"
                                        label="District"
                                        placeholder="Select Districts"
                                        selectedKeys={selectDistrict}
                                        onSelectionChange={(v) => {
                                            setSelectDistrict(v);
                                        }}
                                        selectionMode="multiple">
                                        {districts.map((district) => (
                                            <SelectItem key={district}>
                                                {district}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        className="w-full max-w-[170px]"
                                        label="Division"
                                        placeholder="Select Divisions"
                                        selectedKeys={selectDivision}
                                        onSelectionChange={(v) => {
                                            setSelectDivision(v);
                                        }}
                                        selectionMode="multiple">
                                        {divisions.map((division) => (
                                            <SelectItem key={division}>
                                                {division}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <DrawerFooter className="flex justify-between items-center flex-wrap flex-row">
                                <DrawerClose asChild>
                                    <Button color="warning">Close</Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button
                                        color="secondary"
                                        className="text-white"
                                        onPress={() => {
                                            setRange(PRICE_RANGE as number[]);
                                            setValue("");
                                            setSelectedTab(keys[0]);
                                            handleSearch(
                                                "",
                                                PRICE_RANGE as number[],
                                                keys[0],
                                                selectCompany,
                                                selectDivision,
                                                selectDistrict
                                            );
                                        }}>
                                        Clear Filters
                                    </Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button
                                        color="success"
                                        type="submit"
                                        onPress={() => {
                                            handleSearch(
                                                value,
                                                range,
                                                selectedTab,
                                                selectCompany,
                                                selectDivision,
                                                selectDistrict
                                            );
                                        }}>
                                        Apply Filters
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </DrawerRoot>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-sm:grid-cols-2 gap-4 place-items-center py-4">
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
        </div>
    );
}
