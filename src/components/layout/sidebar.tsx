"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Beef,
  Banknote,
  BookOpen,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Qurban", icon: Beef,
    children: [
      { label: "Pendaftaran Saya", href: "/dashboard/qurban/my-registrations", icon: Users },
      { label: "Daftar Pendaftaran", href: "/dashboard/qurban/registrations", icon: Users },
      { label: "Hewan", href: "/dashboard/qurban/animals", icon: Beef },
      { label: "Pembayaran", href: "/dashboard/qurban/payments", icon: Banknote },
      { label: "Penyaluran", href: "/dashboard/qurban/distributions", icon: BookOpen },
    ],
  },
  {
    label: "Zakat", icon: Banknote,
    children: [
      { label: "Penerimaan", href: "/dashboard/zakat/transactions", icon: Banknote },
      { label: "Muzakki", href: "/dashboard/zakat/muzakkis", icon: Users },
      { label: "Mustahiq", href: "/dashboard/zakat/mustahiqs", icon: Users },
      { label: "Penyaluran", href: "/dashboard/zakat/distributions", icon: BookOpen },
      { label: "Laporan", href: "/dashboard/zakat/reports", icon: BookOpen },
    ],
  },
  {
    label: "Blog", icon: BookOpen,
    children: [
      { label: "Postingan", href: "/dashboard/blog-admin/posts", icon: BookOpen },
      { label: "Kategori", href: "/dashboard/blog-admin/categories", icon: BookOpen },
      { label: "Tag", href: "/dashboard/blog-admin/tags", icon: BookOpen },
      { label: "Komentar", href: "/dashboard/blog-admin/comments", icon: BookOpen },
    ],
  },
  { label: "Pengguna", href: "/dashboard/users", icon: Users },
  { label: "Role", href: "/dashboard/roles", icon: Shield },
  { label: "Permission", href: "/dashboard/permissions", icon: Shield },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    Qurban: true,
    Zakat: true,
    Blog: true,
  });

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-4">
        {!collapsed && <span className="text-lg font-bold">Masjidfy</span>}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight
                        className={`h-3 w-3 transition-transform ${
                          expandedMenus[item.label] ? "rotate-90" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
                {!collapsed && expandedMenus[item.label] && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href || "#"}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                      >
                        <child.icon className="h-4 w-4 shrink-0" />
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href || "#"}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
      <Separator />
      {!collapsed && (
        <div className="p-2">
          <p className="text-xs text-muted-foreground">Masjidfy v0.1.0</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <aside
        className={`hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col border-r bg-background transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
