"use client";

import { dynamicFakeImageGenerator, removeTags } from "@/lib/utils";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import { Product } from "@/app/products/page";
import NextImage from "next/image";

type Prop = {
    product: Product["product"];
};

export default function ProductSide({ product }: Prop) {
    console.log(product);
    return (
        <div className="product grid-in-product">
            <Card
                className="h-full overflow-auto p-6 m-4 lap:ml-0 flex-col min-[898px]:flex-row lap:flex-col"
                shadow="sm">
                <CardHeader className="w-full max-lap:max-w-[250px] max-[898px]:max-w-full mx-auto">
                    <Link
                        href={product.image1!}
                        className="w-full"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            src={product.image1!}
                            as={NextImage}
                            width={500}
                            height={280}
                            // src="https://asepashe.com/api/images/1"
                            fallbackSrc={dynamicFakeImageGenerator()}
                            alt={product.name}
                            removeWrapper
                            className="w-full lap:aspect-video object-cover object-center"
                        />
                    </Link>
                </CardHeader>
                <CardBody className="overflow-visible">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="italic text-neutral-500">
                        {removeTags(product.description)}
                    </p>
                    <div className="flex flex-row items-center gap-1 my-4">
                        <Rating value={0} className="max-w-32" />
                        <span>(0)</span>
                    </div>
                    <span className="text-primary font-bold text-3xl">
                        Tk {product.price}
                    </span>
                    <div className="flex justify-around items-stretch pt-2 gap-8 max-lap:mt-auto">
                        <Button
                            color="warning"
                            as={Link}
                            href={`/companies/${product.company.slug}`}
                            className="w-full">
                            Go To Store
                        </Button>
                        <Button
                            color="success"
                            as={Link}
                            href={`/companies/${product.company.slug}`}
                            className="w-full">
                            Add to Cart
                        </Button>
                        <Button
                            as={Link}
                            href={`/products/${product.slug}`}
                            className="w-full">
                            Bookmark
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
