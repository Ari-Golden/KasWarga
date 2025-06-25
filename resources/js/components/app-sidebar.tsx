import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUserX,
} from "@tabler/icons-react";

import { usePage } from "@inertiajs/react";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { props: pageProps } = usePage();
  const user = pageProps.auth?.user;

  const data = {
    user: {
      name: user?.name ?? "Guest",
      email: user?.email ?? "guest@example.com",
      avatar: "/favicon.ico",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Jenis Iuran Warga",
        url: "/jenis-iuran",
        icon: IconListDetails,
      },
      {
        title: "Pembayaran Iuran",
        url: "/iuran-warga",
        icon: IconChartBar,
      },
      {
        title: "Penarikan Iuran Kas dan Rukem",
        url: "/iuran-warga/create",
        icon: IconChartBar,
      },
      {
        title: "Pengeluaran Kas",
        url: "/pengeluaran",
        icon: IconFolder,
      },
      {
        title: "Kas Warga",
        url: "/kas",
        icon: IconDatabase,
      },
      {
        title: "Pengeluaran Rukem",
        url: "/pengeluaran",
        icon: IconFolder,
      },
      {
        title: "Rukem",
        url: "/rukem",
        icon: IconDatabase,
      },
      {
        title: "Data Warga",
        url: "/warga",
        icon: IconUsers,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "settings",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: "User",
        url: "/users",
        icon: IconUserX,
      },
      {
        name: "Roles",
        url: "/role",
        icon: IconReport,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Kas Warga.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
