import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./style.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import { dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";
import NextImage from "next/image";
import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@heroui/react";

export default function ImageSlider({ images }: { images: string[] }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<
        string | SwiperType | null | undefined
    >(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isOpen, onOpenChange] = useState(false);

    const onOpen = () => {
        onOpenChange(true);
    };

    return (
        <div className="w-full">
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper !mx-0">
                {images
                    .filter((e) => e)
                    .map((image, i) => (
                        <SwiperSlide
                            key={i}
                            className="!my-auto"
                            onClick={() => {
                                onOpen();
                                setSelectedImage(image);
                            }}>
                            <Image
                                src={toValidUrl(image || "")}
                                as={NextImage}
                                width={500}
                                height={280}
                                fallbackSrc={dynamicFakeImageGenerator()}
                                alt={image}
                                removeWrapper
                                className="w-full object-cover object-center cursor-pointer !h-auto"
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                className="mt-3"
                modules={[FreeMode, Navigation, Thumbs]}>
                {images
                    .filter((e) => e)
                    .map((image, i) => (
                        <SwiperSlide key={i} className="!h-16">
                            <Image
                                src={toValidUrl(image || "")}
                                as={NextImage}
                                width={500}
                                height={280}
                                fallbackSrc={dynamicFakeImageGenerator()}
                                alt={image}
                                removeWrapper
                                radius="none"
                                className="w-fit object-contain object-center cursor-pointer !h-auto"
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
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
                            <ModalBody className="mx-auto">
                                <Swiper
                                    slidesPerView={"auto"}
                                    spaceBetween={0}
                                    grabCursor
                                    navigation
                                    zoom
                                    modules={[Navigation, Zoom]}
                                    className="mySwiper !mx-0">
                                    <SwiperSlide className="mini-slide">
                                        <div className="swiper-zoom-container">
                                            <Image
                                                src={selectedImage || undefined}
                                                // as={NextImage}
                                                // fill
                                                className="h-full w-fit"
                                                alt={
                                                    selectedImage ||
                                                    "item image"
                                                }
                                            />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
