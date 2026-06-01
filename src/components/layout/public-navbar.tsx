"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, ChevronDown, Home, Newspaper, Calculator, Info } from "lucide-react"

import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/kalkulator-zakat", label: "Kalkulator Zakat", icon: Calculator },
]

const tentangItems = [
  { href: "/tentang/visi-misi", label: "Visi & Misi", disabled: true },
  { href: "/tentang/struktur-organisasi", label: "Struktur Organisasi", disabled: false },
  { href: "/tentang/sejarah", label: "Sejarah Masjid", disabled: true },
]

function PublicNavbar() {
  const pathname = usePathname()
  const [tentangOpen, setTentangOpen] = useState(false)
  const isAuthPage = pathname === "/login" || pathname === "/register"

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold shrink-0">
          <MasjidSilhouette className="size-7" />
          <span>Masjidfy</span>
        </Link>

        {isAuthPage ? (
          <>
            <div className="flex-1" />
            <Link
              href={pathname === "/login" ? "/register" : "/login"}
              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {pathname === "/login" ? "Daftar" : "Masuk"}
            </Link>
          </>
        ) : (
          <>
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 transition-colors",
                    isActive(link.href)
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors",
                      isActive("/tentang")
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    Tentang
                    <ChevronDown className="size-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {tentangItems.map((item) => (
                    <DropdownMenuItem key={item.href} disabled={item.disabled} asChild>
                      {item.disabled ? (
                        <span className="flex items-center justify-between">
                          {item.label}
                          <span className="text-[10px] text-muted-foreground">Segera</span>
                        </span>
                      ) : (
                        <Link href={item.href}>{item.label}</Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <div className="flex-1" />

            <Link
              href="/login"
              className="hidden shrink-0 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-block"
            >
              Masuk
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-1 pt-6">
                  <Link href="/" className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    <MasjidSilhouette className="size-7" />
                    Masjidfy
                  </Link>
                  <hr className="mb-2" />

                  <Link
                    href="/"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive("/") && pathname === "/"
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <Home className="size-4" />
                    Beranda
                  </Link>

                  <div>
                    <button
                      onClick={() => setTentangOpen(!tentangOpen)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive("/tentang")
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <Info className="size-4" />
                      Tentang
                      <ChevronDown
                        className={cn("ml-auto size-3.5 transition-transform", tentangOpen && "rotate-180")}
                      />
                    </button>
                    {tentangOpen && (
                      <div className="ml-3 flex flex-col gap-1 border-l pl-3 pt-1">
                        {tentangItems.map((item) =>
                          item.disabled ? (
                            <span
                              key={item.href}
                              className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-muted-foreground opacity-50"
                            >
                              {item.label}
                              <span className="text-[10px]">Segera</span>
                            </span>
                          ) : (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "rounded-md px-3 py-1.5 text-sm transition-colors",
                                isActive(item.href)
                                  ? "bg-accent font-medium text-foreground"
                                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                              )}
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <link.icon className="size-4" />
                      {link.label}
                    </Link>
                  ))}

                  <hr className="my-2" />

                  <Link
                    href="/login"
                    className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Masuk
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
    </header>
  )
}

export { PublicNavbar }
