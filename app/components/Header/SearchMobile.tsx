import { dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";
import { Input, ScrollShadow } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";
import { Product } from "@/app/products/page";
import { DEBOUNCE_DELAY } from "@/lib/var";
import SearchItems from "./SearchItems";

export default function SearchMobile({
    products,
}: {
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
            <Input
                onValueChange={debounce(setValue, DEBOUNCE_DELAY)}
                variant="bordered"
                radius="md"
                placeholder="Search"
                className="max-w-[500px] z-40"
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
        </>
    );
}
