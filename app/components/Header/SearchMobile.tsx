import { dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";
import { Button, Input, ScrollShadow } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";
import { DEBOUNCE_DELAY } from "@/lib/var";
import SearchItems from "./SearchItems";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export default function SearchMobile({
    products,
    children,
}: {
    children: React.ReactNode;
    products: Product["product"][];
}) {
    const [value, setValue] = useState("");
    const selectedProducts = useMemo(() => {
        if (!value) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>{children}</DrawerTrigger>
                <DrawerContent className="h-[90vh]">
                    <DrawerHeader>
                        <DrawerTitle>Search</DrawerTitle>
                        <Input
                            onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                            variant="bordered"
                            radius="md"
                            placeholder="Search"
                            className="z-40"
                            endContent={<IoSearchOutline fontSize="1.3rem" />}
                        />
                        <div className="max-h-[70vh] overflow-y-auto">
                            <ScrollShadow>
                                {selectedProducts.map((product) => (
                                    <SearchItems
                                        key={product.id}
                                        label={product.name}
                                        actualPrice={product.price}
                                        discountPrice={product.price}
                                        company_name={product.company.name}
                                        companyAvatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                        // image={dynamicFakeImageGenerator()}
                                        image={toValidUrl(product.image1!)}
                                        slug={product.slug}
                                        onSearchOpen={() => {}}
                                    />
                                ))}
                            </ScrollShadow>
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="faded">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
