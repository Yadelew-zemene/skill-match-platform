import { User } from "@/types/auth"
import { UserRole } from "@/types/auth"

const API = process.env.NEXT_PUBLIC_API_URL
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    credentials: "include", // important for cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error("Login failed")
  return res.json()
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: UserRole
) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  })

  if (!res.ok) throw new Error("Registration failed")

  return res.json()
}


export async function logoutUser() {
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
}

export async function getCurrentUser(): Promise<User | null> {
  const res = await fetch(`${API}/auth/me`, {
    credentials: "include",
  })

  if (!res.ok) return null
  return res.json()
}
