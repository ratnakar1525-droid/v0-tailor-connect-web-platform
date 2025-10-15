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
