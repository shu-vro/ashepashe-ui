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
import AppSidebarItems from "./AppSidebarItems";
import Link from "next/link";
import Logo from "./Sidebar/Logo";
import { API_URL } from "@/lib/var";

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
                                        url: `/companies`,
                                    }}
                                />
                                <AppSidebarItems
                                    item={{
                                        title: "All Products",
                                        url: `/products`,
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
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export async function getSidebarItems() {
    const response = await fetch(`${API_URL}/categories`);
    const data: Category[] = await response.json();
    return data;
}
