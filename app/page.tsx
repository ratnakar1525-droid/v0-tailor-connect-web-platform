import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Custom clothing made effortless.
          </h1>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Discover top local tailors, design your perfect look, save measurements, and book fittings—end to end in one
            seamless experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tailors">
              <Button size="lg">Find Tailors</Button>
            </Link>
            <Link href="/design/new">
              <Button size="lg" variant="outline">
                Create Your Own Design
              </Button>
            </Link>
            <Link href="/design/edit">
              <Button size="lg" variant="secondary">
                Edit Existing Design
              </Button>
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4 pt-4 text-sm text-muted-foreground">
            <li>• Fashion-forward, minimalist UI</li>
            <li>• Save measurements securely (local)</li>
            <li>• Real-time availability (demo)</li>
            <li>• Transparent pricing</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border">
          <Image src="/public/placeholder.jpg" alt="Stylish tailor studio" fill className="object-cover" />
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="font-medium">Design your look</h3>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Choose garment types, fabrics, and colors with live visual previews. Upload inspirations to share with your
            tailor.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-medium">Book with confidence</h3>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Browse verified tailors, check availability, and schedule fittings or virtual consultations in minutes.
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
