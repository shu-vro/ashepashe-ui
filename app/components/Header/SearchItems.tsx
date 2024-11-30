import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

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
        <Card
            className="mt-2 bg-none w-full"
            as={Link}
            href={`/products/${slug}`}>
            <CardBody
                className="flex-row justify-start gap-4 bg-none"
                onClick={() => {
                    onSearchOpen(false);
                }}>
                <Image className="w-20 h-20" src={image} alt={label} />
                <div className="flex flex-col justify-center">
                    <div className="font-bold">{label}</div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                    <div>
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
                    <h1>{company_name}</h1>
                </div>
            </CardBody>
        </Card>
    );
}
