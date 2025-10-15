"use client"
import type { Design, Measurements, Order, OrderStatus } from "./types"

const K = {
  design: "tc:design",
  measurements: "tc:measurements",
  orders: "tc:orders",
}

function safeParse<T>(raw: string | null): T | null {
  try {
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function saveDraftDesign(d: Design) {
  localStorage.setItem(K.design, JSON.stringify(d))
}
export function loadDraftDesign(): Design | null {
  return safeParse<Design>(localStorage.getItem(K.design))
}

export function saveMeasurements(m: Measurements) {
  localStorage.setItem(K.measurements, JSON.stringify(m))
}
export function loadMeasurements(): Measurements | null {
  return safeParse<Measurements>(localStorage.getItem(K.measurements))
}

function ordersKeyFor(userId?: string) {
  return userId ? `tc:orders:${userId}` : "tc:orders"
}

export function loadOrdersFor(userId: string): Order[] {
  return safeParse<Order[]>(localStorage.getItem(ordersKeyFor(userId))) || []
}
export function saveOrderFor(userId: string, o: Order) {
  const key = ordersKeyFor(userId)
  const list = safeParse<Order[]>(localStorage.getItem(key)) || []
  list.unshift(o)
  localStorage.setItem(key, JSON.stringify(list))
}
export function updateOrderStatusFor(userId: string, id: string, status: OrderStatus) {
  const key = ordersKeyFor(userId)
  const list = safeParse<Order[]>(localStorage.getItem(key)) || []
  const updated = list.map((o) => (o.id === id ? { ...o, status } : o))
  localStorage.setItem(key, JSON.stringify(updated))
}
export function loadAllOrders(): Order[] {
  const out: Order[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key) continue
    if (key.startsWith("tc:orders:")) {
      const list = safeParse<Order[]>(localStorage.getItem(key)) || []
      out.push(...list)
    }
  }
  // include legacy global list if present
  const legacy = safeParse<Order[]>(localStorage.getItem(ordersKeyFor())) || []
  out.push(...legacy)
  // newest first
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}
export function updateOrderStatusGlobal(id: string, status: OrderStatus) {
  // update across all user lists
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key || !key.startsWith("tc:orders:")) continue
    const list = safeParse<Order[]>(localStorage.getItem(key)) || []
    const idx = list.findIndex((o) => o.id === id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], status }
      localStorage.setItem(key, JSON.stringify(list))
      return
    }
  }
  // fallback to legacy
  const legacyKey = ordersKeyFor()
  const legacy = safeParse<Order[]>(localStorage.getItem(legacyKey)) || []
  const idx = legacy.findIndex((o) => o.id === id)
  if (idx !== -1) {
    legacy[idx] = { ...legacy[idx], status }
    localStorage.setItem(legacyKey, JSON.stringify(legacy))
  }
}

export function loadOrders(): Order[] {
  return safeParse<Order[]>(localStorage.getItem(K.orders)) || []
}
export function saveOrder(o: Order) {
  const all = loadOrders()
  all.unshift(o)
  localStorage.setItem(K.orders, JSON.stringify(all))
}
export function updateOrderStatus(id: string, status: OrderStatus) {
  const all = loadOrders().map((o) => (o.id === id ? { ...o, status } : o))
  localStorage.setItem(K.orders, JSON.stringify(all))
}
