import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "./var";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function paginate<T>(array: T[], page = 1, count = 12): T[] {
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

export function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)?.[1] || "",
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function dynamicFakeImageGenerator() {
    return `https://nextui.org/images/fruit-${
        Math.floor(Math.random() * 7) + 1
    }.jpeg`;
}

export function removeTags(string = "") {
    if (!string) {
        return "";
    }
    const re =
        /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;

    const sanitized = string.replace(re, "");
    return sanitized;
}

// check if url is valid
export function toValidUrl(url: string) {
    try {
        new URL(url);
        return url;
    } catch {
        return BASE_URL + "/" + url;
    }
}

export const onImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageFile: (file: string | undefined) => void,
    imageEl?: HTMLElement
) => {
    const DIM = 1200;

    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d")!;
    canvas.width = DIM;
    canvas.height = DIM;
    let file = e.target.files![0];
    if (!file) return console.log("no file");
    let fr = new FileReader();
    fr.onload = (e) => {
        let du = e.target!.result as string;
        let im = document.createElement("img");
        im.src = du;
        im.onload = () => {
            if (imageEl) {
                imageEl.style.backgroundImage = `url(${du})`;
            }
            c.clearRect(0, 0, DIM, DIM);
            let big = Math.max(im.width, im.height);
            let propotion = DIM < big ? DIM / big : 1;
            let w = im.width * propotion,
                h = im.height * propotion;
            canvas.width = w;
            canvas.height = h;
            c.drawImage(im, 0, 0, w, h);
            let dataURL = canvas.toDataURL("image/webp");
            // const newFile = dataURLtoFile(dataURL, file.type);
            setImageFile(dataURL);
            canvas.remove();
        };
    };
    fr.readAsDataURL(file);
};

export function extractIframeUrl(iframeString: string | null): string {
    if (!iframeString) return "";
    const regex =
        /<iframe[^>]+src="https:\/\/www\.google\.com\/maps\/embed([^"|^\\]+)"[^>]*>/;
    const match = iframeString.match(regex);
    // return match ? match[1] : null;

    let url = "";

    if (!match) {
        const regex2 = /https:\/\/maps\.google\.com\/maps([^"|^\\]+)/;
        const match2 = iframeString.match(regex2);
        url = match2 ? "https://maps.google.com/maps" + match2[1] : "";
    } else {
        url = "https://www.google.com/maps/embed" + match[1];
    }
    return url;
}
