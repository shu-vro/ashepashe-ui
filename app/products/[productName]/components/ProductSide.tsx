"use client";

import { dynamicFakeImageGenerator, removeTags, toValidUrl } from "@/lib/utils";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import NextImage from "next/image";
import { MdZoomOutMap } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import confetti from "canvas-confetti";

type Prop = {
    product: Product["product"];
};

export default function ProductSide({ product }: Prop) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleCartClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        var count = 200;
        var defaults = {
            origin: { y: 0.7, x: 0.9 },
        };

        // get position of e.target in viewport and set origin to defaults
        var rect = e.currentTarget.getBoundingClientRect();
        defaults.origin.x = (rect.left + rect.width / 2) / window.innerWidth;
        defaults.origin.y = (rect.top + rect.height / 2) / window.innerHeight;

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const offer = product.offers?.find(
        (offer) => new Date(offer.validity).getTime() > Date.now()
    );
    return (
        <div className="product grid-in-product">
            <Card
                className="h-full overflow-auto p-3 m-4 lap:ml-0 flex-col min-[898px]:flex-row lap:flex-col"
                shadow="sm">
                <CardHeader className="w-full max-lap:max-w-[250px] max-[898px]:max-w-full mx-auto group relative">
                    <Image
                        src={toValidUrl(product.image1 || "")}
                        as={NextImage}
                        width={500}
                        height={280}
                        fallbackSrc={dynamicFakeImageGenerator()}
                        alt={product.name}
                        removeWrapper
                        className="w-full lap:aspect-video object-cover object-center cursor-pointer !h-auto"
                        onClick={() => {
                            onOpen();
                        }}
                    />
                    <Button
                        isIconOnly
                        variant="shadow"
                        className="absolute top-4 right-4 z-30 pointer-events-none scale-0 group-hover:scale-100">
                        <MdZoomOutMap className="text-2xl" />
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        size="4xl"
                        scrollBehavior="outside"
                        placement="bottom-center">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Image Preview
                                    </ModalHeader>
                                    <ModalBody>
                                        <Swiper
                                            slidesPerView={"auto"}
                                            spaceBetween={0}
                                            grabCursor
                                            navigation
                                            zoom
                                            modules={[Navigation, Zoom]}
                                            className="mySwiper !mx-0">
                                            <SwiperSlide>
                                                <div className="swiper-zoom-container">
                                                    <Image
                                                        src={product.image1!}
                                                        // as={NextImage}
                                                        // fill
                                                        className="h-full w-fit"
                                                        alt={product.name}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardHeader>
                <CardBody className="overflow-visible">
                    <h2 className="text-2xl font-bold">
                        {product.name}{" "}
                        {offer && (
                            <Chip color="warning">
                                {offer.offer_percent}% Discount
                            </Chip>
                        )}
                    </h2>
                    <p className="italic text-neutral-500">
                        {removeTags(product.description)}
                    </p>
                    <div className="flex flex-row items-center gap-1 my-4">
                        <Rating
                            readOnly
                            value={
                                product.rating.reduce(
                                    (a, b) => a + b.rating,
                                    0
                                ) / product.rating.length
                            }
                            className="max-w-32"
                        />
                        <span>({product.rating.length})</span>
                    </div>
                    <div>
                        {offer ? (
                            <>
                                <del className="text-neutral-400">
                                    {product.price}
                                </del>
                                <span className="text-primary font-bold text-3xl ml-3">
                                    Tk{" "}
                                    {((100 - offer.offer_percent) / 100) *
                                        product.price}
                                </span>
                            </>
                        ) : (
                            <span className="text-primary font-bold text-3xl">
                                Tk {product.price}
                            </span>
                        )}
                    </div>
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
                            onClick={handleCartClick}
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
