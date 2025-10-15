"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const nav = [
    { href: "/", label: "Home" },
    { href: "/tailors", label: "Find Tailors" },
    { href: "/design", label: "Design" },
    { href: "/measurements", label: "Measurements" },
    { href: "/book", label: "Book" },
  ]
  return (
    <header className="border-b border-border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder-logo.svg" alt="TailorConnect logo" width={28} height={28} />
            <span className="font-medium tracking-tight">TailorConnect</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  pathname === item.href && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/customer">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Customer
              </Button>
            </Link>
            <Link href="/dashboard/tailor">
              <Button>Tailor</Button>
            </Link>
            <Link href="/login" className="hidden md:inline-flex">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register" className="hidden md:inline-flex">
              <Button variant="outline">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
