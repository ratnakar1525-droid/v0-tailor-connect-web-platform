"use client"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { mockTailors } from "@/lib/mock-data"
import { saveOrder } from "@/lib/storage"
import type { Order } from "@/lib/types"

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"]

export default function BookPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [tailorId, setTailorId] = useState<string | null>(params.get("tailorId"))
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>("10:30")
  const [notes, setNotes] = useState("")

  const tailors = mockTailors
  const tailor = useMemo(() => tailors.find((t) => t.id === tailorId) || tailors[0], [tailorId, tailors])

  useEffect(() => {
    if (!tailorId && tailor) setTailorId(tailor.id)
  }, [tailorId, tailor])

  function confirm() {
    if (!date || !tailor) return
    const order: Order = {
      id: crypto.randomUUID(),
      tailorId: tailor.id,
      tailorName: tailor.name,
      status: "design",
      appointmentAt: new Date(date.toDateString() + " " + time).toISOString(),
      notes,
      total: tailor.priceFrom,
      createdAt: new Date().toISOString(),
    }
    saveOrder(order)
    router.push("/dashboard/customer")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Book appointment</h1>
        <div className="space-y-2">
          <label className="text-sm font-medium">Select tailor</label>
          <Select value={tailor?.id} onValueChange={setTailorId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a tailor" />
            </SelectTrigger>
            <SelectContent>
              {tailors.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <h3 className="font-medium">Choose date</h3>
            </CardHeader>
            <CardContent>
              <Calendar selected={date} onSelect={setDate} mode="single" className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="font-medium">Choose time</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {times.map((t) => (
                <Button key={t} variant={t === time ? "default" : "outline"} onClick={() => setTime(t)}>
                  {t}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything your tailor should know..."
          />
        </div>
        <Button onClick={confirm}>Confirm booking</Button>
      </section>

      <section>
        <Card>
          <CardHeader>
            <h3 className="font-medium">Summary</h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Tailor:</span> {tailor?.name}
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span> {date?.toDateString()} at {time}
            </div>
            <div>
              <span className="text-muted-foreground">Price:</span> {tailor?.priceFrom}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
