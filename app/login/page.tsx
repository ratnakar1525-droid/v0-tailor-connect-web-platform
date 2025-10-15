"use client"

import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] bg-background text-foreground">
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2 text-balance">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to continue to TailorConnect.</p>
        <LoginForm />
        <p className="mt-4 text-sm">
          New here?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  )
}
