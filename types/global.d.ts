interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    user: User;
}

interface User {
    id: number;
    google_id: string;
    name: string;
    image: string;
    phone: string | null;
    email: string;
    role: string;
    email_verified_at: string | null;
    created_at: Date;
    updated_at: Date;
    company: Company[];
}

interface Category {
    id: string | number;
    name: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

interface Company {
    id: number;
    user_id: string;
    name: string;
    category: string;
    description: string;
    division: string;
    city: string;
    image: string;
    iframe: string;
    map: string;
    created_at: string;
    updated_at: string;
    slug: string;
    status: number;
    phone: string | null;
    fb_page: string | null;
    lati: number | null;
    longi: number | null;
    products: Product["product"][];
}

interface Offer {
    id: number;
    product_id: number;
    offer_percent: number;
    offer_buy: number | null;
    validity: string;
    created_at: string;
    updated_at: string;
}

interface Product {
    product: {
        id: number;
        company_id: number;
        name: string;
        description: string;
        price: number;
        image1: string | null;
        image2: string | null;
        image3: string | null;
        created_at: string;
        updated_at: string;
        slug: string;
        section_id: number;
        company: Company;
        rating: Review[];
        offers: Offer[];
        company: Company;
    };
}

interface Cart {
    item: Product["product"];
    count: number;
}

interface Order {
    id: number;
    user_id: number;
    name: string;
    phone: string;
    address: string;
    store_id: number | null;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[];
}

interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    status: "pending" | "processing" | "completed" | "cancelled";
    created_at: string;
    updated_at: string;
    products: Product["product"];
}
