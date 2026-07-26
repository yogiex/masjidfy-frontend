"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Beef, Banknote, BookOpen, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const subNavItems = [
  { label: "Pendaftaran Saya", href: "/dashboard/qurban/my-registrations", icon: ClipboardList },
  { label: "Daftar Pendaftaran", href: "/dashboard/qurban/registrations", icon: Users },
  { label: "Hewan", href: "/dashboard/qurban/animals", icon: Beef },
  { label: "Pembayaran", href: "/dashboard/qurban/payments", icon: Banknote },
  { label: "Penyaluran", href: "/dashboard/qurban/distributions", icon: BookOpen },
]

export default function QurbanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {subNavItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
      {children}
    </div>
  )
}
