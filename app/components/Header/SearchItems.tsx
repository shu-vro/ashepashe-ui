import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import { dynamicFakeImageGenerator } from "@/lib/utils";

export default function SearchItems({
    label,
    actualPrice,
    discountPrice,
    company_name,
    companyAvatar,
    rating,
    image,
    slug,
    onSearchOpen,
}: {
    label: string;
    actualPrice: number;
    discountPrice: number;
    company_name: string;
    companyAvatar: string;
    rating?: number;
    image: string;
    slug: string;
    onSearchOpen: (b: boolean) => void;
}) {
    return (
        <Card className="mt-2 p-2 w-full" as={Link} href={`/products/${slug}`}>
            <CardBody
                className="flex-row justify-start gap-4 hover:bg-content3 transition-all p-0"
                onClick={() => {
                    onSearchOpen(false);
                }}>
                <Image
                    src={image}
                    fallbackSrc={dynamicFakeImageGenerator()}
                    alt={label}
                    as={NextImage}
                    width={48}
                    height={48}
                />
                <div className="grid grid-cols-[repeat(2,1fr)] w-full content-center items-center">
                    <div>
                        <div className="font-bold">{label}</div>{" "}
                        <div>{company_name}</div>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                    <div className="justify-self-end">
                        <del className="text-default-500">{actualPrice}৳</del>{" "}
                        <span className="text-2xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    {/* <User
                        name={company_name}
                        avatarProps={{
                            className: "w-8 h-8",
                            src: companyAvatar,
                        }}
                        classNames={{
                            name: "truncate w-48 text-lg italic",
                        }}
                        className="grow-0"
                    /> */}
                </div>
            </CardBody>
        </Card>
    );
}
