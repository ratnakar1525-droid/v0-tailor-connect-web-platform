export type Tailor = {
  id: string
  name: string
  photoUrl?: string
  rating: number
  priceFrom: string
  specialties: string[]
}

export type Design = {
  garment: "Suit" | "Dress" | "Shirt"
  fabric: "Wool" | "Cotton" | "Linen" | "Silk"
  color: string
  notes?: string
  inspirationUrl?: string
}

export type Measurements = {
  height: string
  weight: string
  chest: string
  waist: string
  hips: string
  sleeve: string
  inseam: string
}

export type OrderStatus = "design" | "fitting" | "production" | "ready" | "delivered"

export type Order = {
  id: string
  tailorId: string
  tailorName: string
  status: OrderStatus
  appointmentAt: string
  notes?: string
  total: string
  createdAt: string
}

export type Role = "customer" | "tailor"

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: Role
  createdAt: string
}

export type ClothingType = "Suit" | "Dress" | "Shirt" | "Skirt" | "Pants"

export type SavedDesign = {
  id: string
  userId: string
  title: string
  type: ClothingType
  fabric: "Wool" | "Cotton" | "Linen" | "Silk" | "Denim"
  color: string
  notes?: string
  inspirationImage?: string
  createdAt: string
  updatedAt: string
}
