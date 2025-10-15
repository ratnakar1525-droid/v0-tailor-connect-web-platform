"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import type { ClothingType, SavedDesign } from "@/lib/types"

type Props = {
  initial?: Partial<SavedDesign>
  onSave: (d: Omit<SavedDesign, "id" | "createdAt" | "updatedAt">) => void
  currentUserId?: string
}

const CLOTHING_TYPES: ClothingType[] = ["Suit", "Dress", "Shirt", "Skirt", "Pants"]
const FABRICS = ["Wool", "Cotton", "Linen", "Silk", "Denim"]
const COLORS = ["Black", "Navy", "Charcoal", "Ivory", "Olive"]

export function Designer({ initial, onSave, currentUserId }: Props) {
  const [title, setTitle] = useState(initial?.title || "")
  const [type, setType] = useState<ClothingType>(initial?.type || "Suit")
  const [fabric, setFabric] = useState(initial?.fabric || FABRICS[0])
  const [color, setColor] = useState(initial?.color || COLORS[0])
  const [notes, setNotes] = useState(initial?.notes || "")
  const [inspirationImage, setInspirationImage] = useState<string | undefined>(initial?.inspirationImage)
  const disabled = useMemo(() => !title || !currentUserId, [title, currentUserId])

  useEffect(() => {
    if (initial?.title) setTitle(initial.title)
  }, [initial?.title])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setInspirationImage(String(reader.result))
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm">
            Design title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3"
            placeholder="e.g., Navy wool suit"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="type" className="text-sm">
            Clothing type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as ClothingType)}
            className="h-10 rounded-md border border-border bg-background px-3"
          >
            {CLOTHING_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="fabric" className="text-sm">
            Fabric
          </label>
          <select
            id="fabric"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3"
          >
            {FABRICS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="color" className="text-sm">
            Color
          </label>
          <select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="notes" className="text-sm">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24 rounded-md border border-border bg-background px-3 py-2"
            placeholder="Fit preferences, lapel style, length, etc."
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Inspiration image (optional)</label>
          <input type="file" accept="image/*" onChange={onFileChange} className="text-sm" />
        </div>
        <button
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
          disabled={disabled}
          onClick={() => {
            if (!currentUserId) return
            onSave({ userId: currentUserId, title, type, fabric, color, notes, inspirationImage })
          }}
        >
          Save design
        </button>
      </div>
      <div className="rounded-lg border border-border p-4">
        <h3 className="mb-3 font-medium">Visual preview</h3>
        <div className="flex items-center gap-4">
          <div
            className="h-28 w-24 rounded-md border border-border"
            style={{ background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Garment silhouette placeholder"
          >
            <img src={`/placeholder.svg?height=80&width=50&query=garment silhouette`} alt="" className="opacity-70" />
          </div>
          <ul className="text-sm text-muted-foreground">
            <li>Type: {type}</li>
            <li>Fabric: {fabric}</li>
            <li>Color: {color}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
