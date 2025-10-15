"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadAllOrders, updateOrderStatusGlobal } from "@/lib/storage"
import type { Order, OrderStatus } from "@/lib/types"
import { StatusBadge } from "@/components/status-badge"
import { useAuth } from "@/hooks/use-auth"

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  design: "fitting",
  fitting: "production",
  production: "ready",
  ready: "delivered",
  delivered: null,
}

export default function TailorDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  useEffect(() => {
    setOrders(loadAllOrders())
  }, [])

  function advance(id: string, s: OrderStatus) {
    const ns = nextStatus[s]
    if (!ns) return
    updateOrderStatusGlobal(id, ns)
    setOrders(loadAllOrders())
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Tailor dashboard</h1>
      {(!user || user.role !== "tailor") && (
        <p className="text-muted-foreground">
          This area is for tailors. Please{" "}
          <a href="/register" className="underline underline-offset-4">
            register as a tailor
          </a>{" "}
          or sign in with a tailor account.
        </p>
      )}
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
