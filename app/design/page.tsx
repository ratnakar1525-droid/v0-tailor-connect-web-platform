"use client"
import { useEffect, useMemo, useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { saveDraftDesign, loadDraftDesign } from "@/lib/storage"
import type { Design } from "@/lib/types"

const garments = ["Suit", "Dress", "Shirt"]
const fabrics = ["Wool", "Cotton", "Linen", "Silk"]
const colors = ["#111418", "#2d3a3f", "#808080", "#bfa36f", "#ffffff"] // charcoal, slate, grey, gold accent, white

export default function DesignPage() {
  const [design, setDesign] = useState<Design>({
    garment: "Suit",
    fabric: "Wool",
    color: "#111418",
    notes: "",
    inspirationUrl: "",
  })

  useEffect(() => {
    const saved = loadDraftDesign()
    if (saved) setDesign(saved)
  }, [])

  useEffect(() => {
    saveDraftDesign(design)
  }, [design])

  const label = useMemo(() => `${design.fabric} ${design.garment}`, [design])

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setDesign((d) => ({ ...d, inspirationUrl: url }))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Design selection</h1>
        <div>
          <h3 className="mb-2 text-sm font-medium">Garment</h3>
          <div className="flex flex-wrap gap-2">
            {garments.map((g) => (
              <Button
                key={g}
                variant={design.garment === g ? "default" : "outline"}
                onClick={() => setDesign({ ...design, garment: g })}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Fabric</h3>
          <div className="flex flex-wrap gap-2">
            {fabrics.map((f) => (
              <Button
                key={f}
                variant={design.fabric === f ? "default" : "outline"}
                onClick={() => setDesign({ ...design, fabric: f })}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                className={cn("h-8 w-8 rounded-md border", design.color === c && "ring-2 ring-foreground")}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
                onClick={() => setDesign({ ...design, color: c })}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Input
            placeholder="Occasion, fit preferences, details..."
            value={design.notes || ""}
            onChange={(e) => setDesign({ ...design, notes: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload inspiration (optional)</label>
          <Input type="file" accept="image/*" onChange={onUpload} />
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <h3 className="font-medium">Preview</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-[4/5] rounded-lg border" style={{ backgroundColor: design.color }} />
            <div className="text-sm">
              <div className="font-medium">{label}</div>
              <div className="text-muted-foreground">Color {design.color}</div>
            </div>
            {design.inspirationUrl && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Inspiration</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={design.inspirationUrl || "/placeholder.svg"}
                  alt="Inspiration preview"
                  className="rounded-md border max-h-56 object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
