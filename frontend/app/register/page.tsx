"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/services/auth.service"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import toast from "react-hot-toast"
import { UserRole } from "@/types/auth"

export default function RegisterPage() {

  const router = useRouter()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("candidate")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await registerUser(name, email, password, role)

      toast.success("Account created successfully")

      router.push("/dashboard")
    } catch (error) {
      toast.error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
   <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
  <Form>
    <h2 className="text-2xl font-bold mb-6 text-center">
      Create Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        label="Full Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Role Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Account Type
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
      </div>

      <Button disabled={loading}>
        {loading ? "Creating..." : "Register"}
      </Button>
    </form>
  </Form>
</div>
  )
}
