import { cn, removeTags, toValidUrl } from "@/lib/utils";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import DeleteProductBtn from "./DeleteProductBtn";
import EditProductBtn from "./EditProductBtn";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function EditProduct({
    product,
}: {
    product: Product["product"];
}) {
    const discountPercent = ((product.price / product.price) * 100).toFixed(0);
    return (
        <Card
            shadow="sm"
            isPressable
            as={"div"}
            className={cn("w-52 md:w-72 p-0")}>
            <CardBody className="overflow-visible relative">
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover !h-auto"
                    src={toValidUrl(product.image1!)}
                    fallbackSrc={`https://placehold.co/400x300/21131f/ffffff?text=4x3`}
                    isBlurred
                    // fill={true}
                    width={400}
                    height={300}
                    // quality={70}
                    as={NextImage}
                />
            </CardBody>
            <CardFooter className="pt-0 text-start flex-col">
                <div className="w-full">
                    <div className="capitalize not-italic font-bold text-xl line-clamp-2 h-[4ch]">
                        {product.name}{" "}
                        {/* <Chip
                            color="success"
                            variant="bordered"
                            className={cn(
                                "rounded-[6px] md:hidden",
                                discountPercent === "100" ? "!hidden" : "flex"
                            )}>
                            {discountPercent}%
                        </Chip> */}
                    </div>
                    <div className="text-neutral-500 text-sm line-clamp-2 h-[4ch]">
                        {product.description && removeTags(product.description)}
                    </div>
                </div>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== "100" && (
                            <del className="text-default-500 text-sm">
                                {product.price}৳
                            </del>
                        )}{" "}
                        <span className="text-xl font-bold">
                            {product.price + "৳"}
                        </span>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                </div>
                <CustomDivider />
                <div className="flex flex-row justify-between items-center md:gap-1 w-full">
                    <DeleteProductBtn />
                    <EditProductBtn />
                    <Button isIconOnly>
                        <MdOutlineLocalOffer />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

function CustomDivider() {
    return <Divider className="my-3 max-mob:my-1" />;
}
