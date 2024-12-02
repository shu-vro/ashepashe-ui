"use client";

import React, { Key, useMemo, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Pagination,
    Progress,
    Tab,
    Tabs,
    Tooltip,
    User,
} from "@nextui-org/react";
import { cn, paginate } from "@/lib/utils";
import numeral from "numeral";
import moment from "moment";
import { inBound } from "@/app/companies/components/ViewCompanies";

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
}

type Props = {
    reviews: Review[];
    productId: number;
};

const colors = ["success", "primary", "warning", "warning", "danger"] as const;
const PER_PAGE = 5;
const sortOptions = [
    {
        key: "recent",
        title: "Recent",
    },
    {
        key: "positive",
        title: "Positive Reviews",
    },
    {
        key: "negative",
        title: "Negative Reviews",
    },
];

function sortby(key: (typeof sortOptions)[number]["key"], reviews: Review[]) {
    switch (key) {
        case "positive":
            return reviews.sort((a, b) => b.rating - a.rating);
        case "negative":
            return reviews.sort((a, b) => a.rating - b.rating);
        case "recent":
            return reviews.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
        default:
            return reviews;
    }
}

export default function ReviewSide({ reviews, productId }: Props) {
    const [selected, setSelected] = useState<Key>("recent");
    const [currentPage, setCurrentPage] = useState(1);

    const { selectedReviews, reviewNum } = useMemo(() => {
        let sortedReviews = sortby(selected as string, reviews);
        let reviewNum = sortedReviews.length;
        sortedReviews = paginate(sortedReviews, currentPage, PER_PAGE);
        return { selectedReviews: sortedReviews, reviewNum };
    }, [selected, currentPage, reviews]);

    const { rating, groupRating } = useMemo(() => {
        const rating =
            reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length || 0;
        const groupRating = Object.groupBy(reviews, (review) => review.rating);
        return { rating, groupRating };
    }, [reviews]);

    const loggedIn = true;
    return (
        <div className="grid-in-review mt-6 mx-4">
            <div className="top flex flex-row justify-between items-center gap-4 mb-6">
                <div className="rating text-center">
                    <h2
                        className={cn(
                            "text-3xl font-bold",
                            `text-${colors[Math.floor(rating)]}-500`
                        )}>
                        {rating}
                    </h2>
                    <Rating style={{ maxWidth: 100 }} readOnly value={rating} />
                    <p>{numeral(reviews.length).format("0a")} reviews</p>
                </div>
                <div className="bars grow">
                    {Array(5)
                        .fill(1)
                        .map((_, i) => {
                            let selected = groupRating[5 - i];
                            if (!selected) {
                                selected = [];
                            }
                            const rating_frac =
                                selected.length / reviews.length;
                            return (
                                <Tooltip
                                    key={i}
                                    content={selected.length}
                                    showArrow
                                    offset={-2}>
                                    <Progress
                                        size="sm"
                                        radius="sm"
                                        color={colors[i]}
                                        label={5 - i}
                                        value={rating_frac * 100}
                                        classNames={{
                                            base: "flex-row items-center",
                                            track: "w-full",
                                            label: "w-[1ch]",
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                </div>
            </div>
            <div className="my-6 mx-auto w-fit">
                <Tabs
                    variant="bordered"
                    color="warning"
                    items={sortOptions}
                    onSelectionChange={setSelected}>
                    {(item) => <Tab key={item.key} title={item.title} />}
                </Tabs>
            </div>
            <div className="reviews flex flex-col gap-4">
                {selectedReviews.map((review) => (
                    <div key={review.id}>
                        <Card shadow="none" className="bg-content2">
                            <CardHeader className="justify-between">
                                <User
                                    name={review.user_id}
                                    description={moment(
                                        review.created_at
                                    ).fromNow()}
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/150?u=a",
                                        alt: review.user_id.toString(),
                                        isBordered: true,
                                        showFallback: true,
                                    }}
                                />
                                <Rating
                                    style={{ maxWidth: 75 }}
                                    readOnly
                                    value={review.rating}
                                />
                            </CardHeader>
                            <Divider />
                            <CardBody>{review.review}</CardBody>
                        </Card>
                    </div>
                ))}
            </div>
            {reviewNum > PER_PAGE && (
                <div className="w-full my-4">
                    <Pagination
                        showControls
                        isCompact
                        total={Math.ceil(reviewNum / PER_PAGE)}
                        page={currentPage}
                        onChange={(value) => {
                            setCurrentPage(value);
                        }}
                        className="mx-auto w-fit"
                    />
                </div>
            )}
        </div>
    );
}