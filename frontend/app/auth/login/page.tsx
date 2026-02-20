"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import toast from "react-hot-toast"
    
toast.success("Login successful")


export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
        await login(email, password)
        toast.success("Login successful 🎉")
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
    }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" required onChange={e => setEmail(e.target.value)} />
          <Input label="Password" type="password" required onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
