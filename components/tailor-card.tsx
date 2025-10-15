"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Tailor } from "@/lib/types"

export function TailorCard({ tailor }: { tailor: Tailor }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={tailor.photoUrl || "/placeholder.jpg"}
          alt={`${tailor.name} studio`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{tailor.name}</h3>
          <div className="text-sm text-muted-foreground">★ {tailor.rating.toFixed(1)}</div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {tailor.specialties.slice(0, 3).map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">From {tailor.priceFrom}</div>
        <Link href={`/book?tailorId=${tailor.id}`}>
          <Button size="sm">Book</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
