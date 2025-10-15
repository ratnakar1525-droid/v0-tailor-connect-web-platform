"use client"

import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Designer } from "@/components/design/designer"
import { createDesign } from "@/lib/local-storage"
import { useAuth } from "@/hooks/use-auth"

export default function NewDesignPage() {
  const router = useRouter()
  const { user } = useAuth()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2 text-balance">Create your design</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Choose garment type, fabric, and color. Add notes and inspiration.
        </p>
        <Designer
          currentUserId={user?.id}
          onSave={(payload) => {
            if (!user) {
              alert("Please log in to save your design.")
              return
            }
            const d = createDesign(payload)
            router.push("/design/edit?highlight=" + d.id)
          }}
        />
      </section>
    </main>
  )
}
