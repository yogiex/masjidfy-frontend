import Link from "next/link"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
}

function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="group relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="text-sm font-medium text-primary hover:underline"
      >
        Selengkapnya &rarr;
      </Link>
    </div>
  )
}

export { ServiceCard }
