import { User } from "lucide-react"

interface OrgNodeProps {
  title: string
  name: string
}

function OrgNode({ title, name }: OrgNodeProps) {
  return (
    <div className="flex w-36 flex-col items-center gap-1 rounded-lg border bg-card px-3 py-2.5 text-center shadow-xs">
      <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
        <User className="size-3.5" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
      <span className="text-xs font-medium">{name}</span>
    </div>
  )
}

export { OrgNode }
