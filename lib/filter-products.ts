export const keys = [
    "Recent",
    "Popular",
    "Cheap",
    "Expensive",
    "Discount",
] as const;
export type KeyType = (typeof keys)[number];

export const resolver: Record<
    KeyType,
    (products: Product["product"][]) => Product["product"][]
> = {
    Recent: (products) => {
        return products.slice().sort((a, b) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });
    },
    Popular: (products) => {
        return products.slice().sort((a, b) => {
            let ratingA =
                a.rating.reduce((c, d) => c + d?.rating, 0) / a.rating.length ||
                0;
            let ratingB =
                b.rating.reduce((c, d) => c + d?.rating, 0) / b.rating.length ||
                0;
            if (ratingB === ratingA) {
                return b.rating.length - a.rating.length;
            }
            return ratingB - ratingA;
        });
    },
    Cheap: (products) => {
        return products.slice().sort((a, b) => {
            return a.price - b.price;
        });
    },
    Expensive: (products) => {
        return products.slice().sort((a, b) => {
            return b.price - a.price;
        });
    },
    Discount: (products) => {
        return products.filter((product) =>
            product.offers.some(
                (offer) => new Date(offer.validity).getTime() > Date.now()
            )
        );
    },
};
