"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/lib/local-storage"
import type { Role } from "@/lib/types"

export function useAuth() {
  const [user, setUser] = useState(getCurrentUser())
  useEffect(() => {
    setUser(getCurrentUser())
    const onStorage = (e: StorageEvent) => {
      if (e.key === "tc_current_user") setUser(getCurrentUser())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  return {
    user,
    login: async (email: string, password: string) => {
      const res = loginUser(email, password)
      setUser(getCurrentUser())
      return res
    },
    register: async (name: string, email: string, password: string, role: Role) => {
      const res = registerUser({ name, email, password, role })
      setUser(getCurrentUser())
      return res
    },
    logout: () => {
      logoutUser()
      setUser(null)
    },
  }
}
