import { Badge } from "@/components/ui/badge"
import type { OrderStatus } from "@/lib/types"

const map: Record<OrderStatus, string> = {
  design: "Design",
  fitting: "Fitting",
  production: "In Production",
  ready: "Ready",
  delivered: "Delivered",
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const variant = status === "delivered" ? "default" : status === "production" ? "secondary" : "outline"
  return <Badge variant={variant as any}>{map[status]}</Badge>
}
