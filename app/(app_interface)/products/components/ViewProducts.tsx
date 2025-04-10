"use client";

import {
    Button,
    Divider,
    Form,
    Input,
    Pagination,
    Select,
    Selection,
    SelectItem,
    Slider,
    Tab,
    Tabs,
} from "@heroui/react";
import React, { useMemo, useState } from "react";
import { dynamicFakeImageGenerator, paginate, toValidUrl } from "@/lib/utils";
import { ProductCard } from "@/app/(app_interface)/components/ProductCard";
import { inBound } from "@/app/(app_interface)/companies/components/ViewCompanies";
import { useRouter } from "next/navigation";
import { keys, resolver, KeyType } from "@/lib/filter-products";
import { DEBOUNCE_DELAY } from "@/lib/var";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { debounce } from "lodash";
import allLocationOption from "@/lib/divisions.json";
import { useIsMobile } from "@/hooks/use-mobile";

import {
    Drawer as DrawerRoot,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
} from "@heroui/react";

const PER_PAGE = 12 as const;
const PRICE_RANGE = Object.freeze([0, 2000]);
const bangladesh = allLocationOption.bangladesh;

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
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onOpenChange: onDrawerOpenChange,
    } = useDisclosure();

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
    const isMobile = useIsMobile(500);

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
            <Button onPress={onDrawerOpen}>Advanced Filter</Button>
            <DrawerRoot isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
                <DrawerContent className="bg-white/20 text-white backdrop-blur-sm border-l-2 border-t-2 border-white/30">
                    {(onClose) => (
                        <DrawerBody>
                            <div className="w-full rounded-md">
                                <DrawerHeader className="flex flex-col p-0 m-0">
                                    <h2 className="text-xl">
                                        Advanced Filters
                                    </h2>
                                    <p className="text-sm text-white/60">
                                        Filter products by price range and
                                        options. Don't forget to apply filters.
                                    </p>
                                </DrawerHeader>
                                <Divider className="my-6" />
                                <div className="pb-0 flex flex-wrap items-center justify-around gap-2">
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
                                            <SelectItem
                                                key={company.id}
                                                value={company.id}>
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
                                                <SelectItem
                                                    key={division}
                                                    value={division}>
                                                    {division}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <DrawerFooter className="flex justify-between items-center flex-wrap flex-row">
                                <Button color="warning" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="secondary"
                                    className="text-white"
                                    onPress={() => {
                                        setRange(PRICE_RANGE as number[]);
                                        setValue("");
                                        setSelectedTab(keys[0]);
                                        setSelectCompany(new Set([]));
                                        setSelectDivision(new Set([]));
                                        setSelectDistrict(new Set([]));

                                        handleSearch(
                                            "",
                                            PRICE_RANGE as number[],
                                            keys[0],
                                            selectCompany,
                                            selectDivision,
                                            selectDistrict
                                        );
                                        onClose();
                                    }}>
                                    Clear Filters
                                </Button>
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
                                        onClose();
                                    }}>
                                    Apply Filters
                                </Button>
                            </DrawerFooter>
                        </DrawerBody>
                    )}
                </DrawerContent>
            </DrawerRoot>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-sm:grid-cols-2 gap-4 gap-y-8 place-items-center py-4">
                {paginate(products, currentPage, PER_PAGE).map((product) => {
                    return (
                        <ProductCard
                            product={product}
                            disableCompany={false}
                            key={product.id}
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
