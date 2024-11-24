import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
    User,
} from "@nextui-org/react";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface ProductCardProps {
    name: string;
    actualPrice: number;
    discountPrice: number;
    seller: string;
    sellerAvatar: string;
    rating: number;
    url: string;
}

export function ProductCard({
    name,
    url,
    actualPrice,
    discountPrice,
    seller,
    sellerAvatar,
    rating,
}: ProductCardProps) {
    return (
        <Card
            shadow="sm"
            // shadow="none"
            isPressable
            as={"div"}
            className="w-48 md:w-72"
            onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-4">
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={name}
                    className="w-full aspect-[4/3] object-cover"
                    src={url}
                    isBlurred
                />
            </CardBody>
            <CardFooter className="p-4 pt-0 text-start flex-col">
                <b className="capitalize">
                    {name}{" "}
                    <Chip
                        color="success"
                        variant="bordered"
                        className="rounded-[6px] md:hidden">
                        {((discountPrice / actualPrice) * 100).toFixed(0)}%
                    </Chip>
                </b>
                <Divider className="my-4" />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        <del className="text-default-500">{actualPrice}৳</del>{" "}
                        <span className="text-2xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    <Rating style={{ maxWidth: 100 }} readOnly value={rating} />
                </div>
                <Divider className="my-4" />
                <div className="flex flex-row justify-start items-center gap-1">
                    <User
                        name={seller}
                        avatarProps={{
                            className: "w-8 h-8",
                            src: sellerAvatar,
                        }}
                        classNames={{
                            name: "truncate w-24",
                        }}
                        className="grow-0"
                    />
                    <div className="grow" />
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-xl"
                        size="sm">
                        <CiBookmark />
                    </Button>
                    <Chip
                        color="success"
                        variant="bordered"
                        className="rounded-[6px] hidden md:flex">
                        {((discountPrice / actualPrice) * 100).toFixed(0)}%
                    </Chip>
                </div>
            </CardFooter>
        </Card>
    );
}

export function BigCard({}) {
    return (
        <Card isPressable as={"div"} className="w-1/2" shadow="none">
            <CardHeader className="p-6 overflow-visible">
                <Image
                    isBlurred
                    src="https://nextui.org/images/fruit-1.jpeg"
                    alt="name"
                    shadow="sm"
                    className="w-full aspect-[4/3] object-cover"
                    removeWrapper
                />
            </CardHeader>
            <CardBody className="p-6 flex-row justify-between">
                <div>
                    <h2 className="font-bold text-3xl">Best Discounts</h2>
                    <span className="text-neutral-500">1234 items</span>
                </div>
                <div>
                    <span className="text-neutral-500">Left</span>
                    <Chip
                        color="warning"
                        variant="bordered"
                        className="rounded-[6px] block">
                        10 days
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
}
