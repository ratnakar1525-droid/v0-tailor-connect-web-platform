"use client"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { TailorCard } from "@/components/tailor-card"
import { mockTailors } from "@/lib/mock-data"

const specialties = ["All", "Suits", "Dresses", "Shirts", "Alterations", "Eveningwear"]

export default function TailorsPage() {
  const [q, setQ] = useState("")
  const [spec, setSpec] = useState("All")

  const filtered = useMemo(() => {
    return mockTailors.filter((t) => {
      const matchQ = [t.name, ...t.specialties].join(" ").toLowerCase().includes(q.toLowerCase())
      const matchS = spec === "All" || t.specialties.includes(spec)
      return matchQ && matchS
    })
  }, [q, spec])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <h1 className="text-2xl font-semibold">Find a tailor</h1>
        <div className="flex gap-3">
          <Input placeholder="Search by name or specialty..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={spec} onValueChange={setSpec}>
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <TailorCard key={t.id} tailor={t} />
        ))}
      </div>
      {filtered.length === 0 && <p className="text-muted-foreground">No tailors match your filters.</p>}
    </div>
  )
}
