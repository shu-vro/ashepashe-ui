import { Product } from "@/app/all-products/page";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function paginate(array: any[], page = 1, count = 12) {
    const start = (page - 1) * count;
    const end = start + count;
    const chunk = array.slice(start, end);
    return chunk;
}

export function capitalizeFirstLetter(sentence: string): string {
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function first_n(products: Product["product"][], n = 8) {
    return products.slice(0, n);
}

export function dynamicFakeImageGenerator() {
    return `https://nextui.org/images/fruit-${
        Math.floor(Math.random() * 7) + 1
    }.jpeg`;
}

export function removeTags(string = "") {
    const re =
        /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;

    const sanitized = string.replace(re, "");
    return sanitized;
}
