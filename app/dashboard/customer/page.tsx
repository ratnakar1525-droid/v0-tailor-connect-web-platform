"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadOrdersFor } from "@/lib/storage"
import type { Order } from "@/lib/types"
import { StatusBadge } from "@/components/status-badge"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) setOrders(loadOrdersFor(user.id))
  }, [user?.id])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My orders</h1>
        <Link href="/book">
          <Button>New booking</Button>
        </Link>
      </div>
      {!user && (
        <p className="text-muted-foreground">
          Please{" "}
          <Link href="/login" className="underline underline-offset-4">
            sign in
          </Link>{" "}
          to view your orders.
        </p>
      )}
      <div className="grid gap-6">
        {orders.length === 0 && <p className="text-muted-foreground">No orders yet—book your first fitting!</p>}
        {orders.map((o) => (
          <Card key={o.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="font-medium">{o.tailorName}</div>
              <StatusBadge status={o.status} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>Appointment: {new Date(o.appointmentAt).toLocaleString()}</div>
              <div>Total: {o.total}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
