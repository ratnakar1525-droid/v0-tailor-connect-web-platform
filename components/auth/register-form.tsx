"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import type { Role } from "@/lib/types"

export function RegisterForm() {
  const { register } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<Role>("customer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await register(name, email, password, role)
    setLoading(false)
    if (!res.ok) {
      setError(res.error || "Registration failed")
      return
    }
    router.push("/")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm">
          Full name
        </label>
        <input
          id="name"
          className="h-10 rounded-md border border-border bg-background px-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="h-10 rounded-md border border-border bg-background px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="h-10 rounded-md border border-border bg-background px-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="role" className="text-sm">
          I am a
        </label>
        <select
          id="role"
          className="h-10 rounded-md border border-border bg-background px-3"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="customer">Customer</option>
          <option value="tailor">Tailor</option>
        </select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
        aria-busy={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  )
}
