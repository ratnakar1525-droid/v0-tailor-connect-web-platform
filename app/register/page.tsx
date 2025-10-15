"use client"

import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { SiteHeader } from "@/components/site-header"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2 text-balance">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6">Join TailorConnect to design and book fittings.</p>
        <RegisterForm />
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}
