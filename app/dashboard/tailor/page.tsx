"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadOrders, updateOrderStatus } from "@/lib/storage"
import type { Order, OrderStatus } from "@/lib/types"
import { StatusBadge } from "@/components/status-badge"

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  design: "fitting",
  fitting: "production",
  production: "ready",
  ready: "delivered",
  delivered: null,
}

export default function TailorDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    setOrders(loadOrders())
  }, [])
  function advance(id: string, s: OrderStatus) {
    const ns = nextStatus[s]
    if (!ns) return
    updateOrderStatus(id, ns)
    setOrders(loadOrders())
  }
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Tailor dashboard</h1>
      <div className="grid gap-6">
        {orders.length === 0 && <p className="text-muted-foreground">No active orders.</p>}
        {orders.map((o) => (
          <Card key={o.id}>
            <CardHeader className="flex items-center justify-between">
              <div className="font-medium">{o.tailorName}</div>
              <StatusBadge status={o.status} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground grid gap-2">
              <div>Appointment: {new Date(o.appointmentAt).toLocaleString()}</div>
              <div>Notes: {o.notes || "—"}</div>
              <div>Total: {o.total}</div>
              {nextStatus[o.status] && (
                <div className="pt-2">
                  <Button onClick={() => advance(o.id, o.status)}>Advance to {nextStatus[o.status]}</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
