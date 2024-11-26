import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import AppSidebarItems, { AppSidebarItemsProps } from "./AppSidebarItems";
import Link from "next/link";
import Logo from "./Sidebar/Logo";

const items: AppSidebarItemsProps["item"][] = [
    {
        title: "food",
        url: "#",
    },
    {
        title: "Medicines",
        url: "#",
    },
    {
        title: "groceries",
        url: "#",
    },
    {
        title: "electronics",
        url: "#",
    },
    {
        title: "clothes",
        url: "#",
    },
    {
        title: "furniture",
        url: "#",
    },
    {
        title: "books",
        url: "#",
    },
    {
        title: "stationary",
        url: "#",
    },
    {
        title: "services",
        url: "#",
    },
    {
        title: "others",
        url: "#",
    },
];

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export async function AppSidebar() {
    const sidebarItems = await getSidebarItems();
    return (
        <Sidebar>
            <SidebarHeader className="my-1 text-center font-bold">
                <Link href="/">
                    <Logo />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenuItem className="list-none">
                            <SidebarMenuButton className="text-xl">
                                All Items
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                <AppSidebarItems
                                    item={{
                                        title: "All companies",
                                        url: `/all-companies`,
                                    }}
                                />
                                <AppSidebarItems
                                    item={{
                                        title: "All Products",
                                        url: `/all-products`,
                                    }}
                                />
                            </SidebarMenuSub>
                        </SidebarMenuItem>
                        <SidebarMenuItem className="list-none">
                            <SidebarMenuButton className="text-xl">
                                Categories
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {sidebarItems.map((item) => (
                                    <AppSidebarItems
                                        key={item.id}
                                        item={{
                                            title: item.name,
                                            url: `/category/${item.name
                                                .split(" ")
                                                .join("-")}`,
                                        }}
                                    />
                                ))}
                            </SidebarMenuSub>
                        </SidebarMenuItem>
                    </SidebarGroupContent>
                    {/* <SidebarGroupContent>
                        <SidebarMenuItem className="list-none">
                            <SidebarMenuButton className="text-xl">
                                Static Categories
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {items.map((item) => (
                                    <AppSidebarItems
                                        key={item.title}
                                        item={item}
                                    />
                                ))}
                            </SidebarMenuSub>
                        </SidebarMenuItem>
                    </SidebarGroupContent> */}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

async function getSidebarItems() {
    const response = await fetch("https://asepashe.com/api/categories");
    const data: Category[] = await response.json();
    return data;
}
