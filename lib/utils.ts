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
