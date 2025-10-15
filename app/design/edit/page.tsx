"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Designer } from "@/components/design/designer"
import { getDesigns, upsertDesign } from "@/lib/local-storage"
import type { SavedDesign } from "@/lib/types"

export default function EditDesignPage() {
  const [designs, setDesigns] = useState<SavedDesign[]>(getDesigns())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const highlight = searchParams.get("highlight")

  const selected = useMemo(
    () => designs.find((d) => d.id === (selectedId || highlight || "")),
    [designs, selectedId, highlight],
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2 text-balance">Edit your designs</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Select a saved design to modify details or replace inspiration.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <aside className="md:col-span-1 rounded-lg border border-border p-3">
            <h3 className="mb-2 font-medium">Saved designs</h3>
            <ul className="space-y-1 text-sm">
              {designs.length === 0 ? <li className="text-muted-foreground">No designs yet.</li> : null}
              {designs.map((d) => (
                <li key={d.id}>
                  <button
                    className={`w-full text-left rounded-md px-2 py-1.5 ${selected?.id === d.id ? "bg-muted" : "hover:bg-muted"}`}
                    onClick={() => setSelectedId(d.id)}
                    aria-current={selected?.id === d.id ? "page" : undefined}
                  >
                    {d.title}
                    <span className="block text-xs text-muted-foreground">
                      {d.type} • {d.fabric}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="md:col-span-2 rounded-lg border border-border p-4">
            {selected ? (
              <Designer
                initial={selected}
                currentUserId={selected.userId}
                onSave={(payload) => {
                  const updated: SavedDesign = {
                    ...selected,
                    ...payload,
                    updatedAt: new Date().toISOString(),
                  }
                  upsertDesign(updated)
                  setDesigns(getDesigns())
                  alert("Design updated")
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Choose a design from the list to start editing.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
