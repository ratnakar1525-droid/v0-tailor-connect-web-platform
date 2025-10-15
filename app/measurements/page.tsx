"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Measurements } from "@/lib/types"
import { loadMeasurements, saveMeasurements } from "@/lib/storage"

const fields: Array<{ key: keyof Measurements; label: string; placeholder: string }> = [
  { key: "height", label: "Height (cm)", placeholder: "e.g. 180" },
  { key: "weight", label: "Weight (kg)", placeholder: "e.g. 75" },
  { key: "chest", label: "Chest (cm)", placeholder: "e.g. 100" },
  { key: "waist", label: "Waist (cm)", placeholder: "e.g. 82" },
  { key: "hips", label: "Hips (cm)", placeholder: "e.g. 96" },
  { key: "sleeve", label: "Sleeve (cm)", placeholder: "e.g. 62" },
  { key: "inseam", label: "Inseam (cm)", placeholder: "e.g. 80" },
]

export default function MeasurementsPage() {
  const [m, setM] = useState<Measurements>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    sleeve: "",
    inseam: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = loadMeasurements()
    if (existing) setM(existing)
  }, [])

  function onSave() {
    saveMeasurements(m)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Measurements</h1>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <label className="text-sm font-medium">{f.label}</label>
              <Input
                inputMode="decimal"
                placeholder={f.placeholder}
                value={String(m[f.key] || "")}
                onChange={(e) => setM({ ...m, [f.key]: e.target.value })}
              />
            </div>
          ))}
          <div className="sm:col-span-2 pt-2">
            <Button onClick={onSave}>{saved ? "Saved" : "Save Profile"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
