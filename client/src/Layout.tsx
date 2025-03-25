import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import { SiteHeader } from "./components/ui/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar  />
            <div>
                <main>
                <SiteHeader />
                    { children }
                </main>
            </div>
        </SidebarProvider>
    )
}