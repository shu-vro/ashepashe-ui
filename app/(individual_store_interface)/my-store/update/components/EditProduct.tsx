import { cn, removeTags, toValidUrl } from "@/lib/utils";
import {
    Card,
    CardBody,
    CardFooter,
    Chip,
    Divider,
    Image,
} from "@heroui/react";
import NextImage from "next/image";
import DeleteProductBtn from "./DeleteProductBtn";
import EditProductBtn from "./EditProductBtn";
import OfferProductBtn from "./OfferProductBtn";
import { use, useMemo } from "react";
import Link from "next/link";
import Ribbon from "@/app/(app_interface)/components/Ribbon";
import { UserContext } from "@/contexts/UserContext";

export default function EditProduct({
    product,
}: {
    product: Product["product"];
}) {
    const offer = useMemo(
        () =>
            product.offers?.find(
                (offer) => new Date(offer.validity).getTime() > Date.now()
            ),
        [product.offers]
    );
    const discountPercent = (offer?.offer_percent || 0).toFixed();
    const useUser = use(UserContext);

    if (!product) return null;
    if (!useUser?.userCompany) return null;

    return (
        <Card
            shadow="sm"
            isPressable
            as={"div"}
            className={cn("w-52 md:w-72 p-0 overflow-visible")}>
            <CardBody
                className="overflow-visible relative"
                as={Link}
                href={`/${useUser?.userCompany?.slug || "p"}/${product.slug}`}>
                {discountPercent !== "0" && (
                    <Ribbon>{discountPercent}% off</Ribbon>
                )}
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
                <Link
                    className="w-full"
                    href={`/${useUser?.userCompany?.slug || "p"}/${
                        product.slug
                    }`}>
                    <div className="capitalize not-italic font-bold text-xl line-clamp-2 h-[4ch]">
                        {product.name}{" "}
                        <Chip
                            color="success"
                            variant="bordered"
                            className={cn(
                                "rounded-[6px] md:hidden",
                                discountPercent === "0" ? "!hidden" : "flex"
                            )}>
                            {discountPercent}%
                        </Chip>
                    </div>
                    <div className="text-neutral-500 text-sm line-clamp-2 h-[4ch]">
                        {product.description && removeTags(product.description)}
                    </div>
                </Link>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {offer && discountPercent !== "100" ? (
                            <>
                                <del className="text-default-500 text-sm">
                                    {product.price + "৳"}
                                </del>
                                <span className="text-xl font-bold">
                                    {Math.round(
                                        ((100 - offer.offer_percent) / 100) *
                                            product.price
                                    )}
                                    ৳
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold">
                                {product.price}৳
                            </span>
                        )}
                        <span className="text-xl font-bold"></span>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                </div>
                <CustomDivider />
                <div className="flex flex-row justify-between items-center md:gap-1 w-full">
                    <DeleteProductBtn slug={product.slug} />
                    <EditProductBtn defaultProps={product} />
                    <OfferProductBtn
                        productId={product.id}
                        currentOffer={product.offers?.[0]}
                        currentPrice={product.price}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}

function CustomDivider() {
    return <Divider className="my-3 max-mob:my-1" />;
}
