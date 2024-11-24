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

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="my-6 text-center font-bold">
                <Link href="/">ASHEPASHE</Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenuItem className="list-none">
                            <SidebarMenuButton className="text-xl">
                                Categories
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
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
