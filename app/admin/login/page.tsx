"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { loginAction } from "./actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "Checking..." : "Sign In"}
    </button>
  )
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, { error: "" })

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-xl font-bold text-white">Admin</h1>
        <form action={formAction} className="space-y-4">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
          />
          {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
          <SubmitButton />
        </form>
      </div>
    </main>
  )
}
