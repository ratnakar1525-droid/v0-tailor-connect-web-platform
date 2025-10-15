"use client"

import type { SavedDesign, User } from "./types"

const USERS_KEY = "tc_users"
const CURRENT_USER_KEY = "tc_current_user"
const DESIGNS_KEY = "tc_designs"

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers(): User[] {
  return read<User[]>(USERS_KEY, [])
}
export function saveUsers(users: User[]) {
  write<User[]>(USERS_KEY, users)
}
export function getCurrentUser(): User | null {
  return read<User | null>(CURRENT_USER_KEY, null)
}
export function setCurrentUser(user: User | null) {
  write<User | null>(CURRENT_USER_KEY, user)
}
export function registerUser(input: Omit<User, "id" | "createdAt">): { ok: boolean; error?: string } {
  const users = getUsers()
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { ok: false, error: "Email already registered" }
  }
  const user: User = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  saveUsers(users)
  setCurrentUser(user)
  return { ok: true }
}
export function loginUser(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!user) return { ok: false, error: "Invalid credentials" }
  setCurrentUser(user)
  return { ok: true }
}
export function logoutUser() {
  setCurrentUser(null)
}

export function getDesigns(): SavedDesign[] {
  return read<SavedDesign[]>(DESIGNS_KEY, [])
}
export function saveDesigns(designs: SavedDesign[]) {
  write<SavedDesign[]>(DESIGNS_KEY, designs)
}
export function upsertDesign(d: SavedDesign) {
  const designs = getDesigns()
  const i = designs.findIndex((x) => x.id === d.id)
  if (i === -1) designs.push(d)
  else designs[i] = d
  saveDesigns(designs)
}
export function createDesign(input: Omit<SavedDesign, "id" | "createdAt" | "updatedAt">): SavedDesign {
  const now = new Date().toISOString()
  const design: SavedDesign = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
  upsertDesign(design)
  return design
}
