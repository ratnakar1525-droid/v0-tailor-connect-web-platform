import type { Tailor } from "./types"

export const mockTailors: Tailor[] = [
  {
    id: "t1",
    name: "Atelier Noir",
    photoUrl: "/placeholder.jpg",
    rating: 4.8,
    priceFrom: "$120",
    specialties: ["Suits", "Shirts", "Alterations"],
  },
  {
    id: "t2",
    name: "Ivory & Thread",
    photoUrl: "/placeholder-user.jpg",
    rating: 4.6,
    priceFrom: "$150",
    specialties: ["Dresses", "Eveningwear"],
  },
  {
    id: "t3",
    name: "Slate Stitch",
    photoUrl: "/placeholder.jpg",
    rating: 4.7,
    priceFrom: "$110",
    specialties: ["Shirts", "Alterations"],
  },
  {
    id: "t4",
    name: "Golden Hem",
    photoUrl: "/placeholder.jpg",
    rating: 4.9,
    priceFrom: "$180",
    specialties: ["Suits", "Dresses", "Eveningwear"],
  },
]
