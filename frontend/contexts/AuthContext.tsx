"use client"

import { createContext, useEffect, useState } from "react"
import { AuthContextType, User } from "@/types/auth"
import { loginUser, registerUser, logoutUser, getCurrentUser } from "@/services/authService"
import { UserRole } from "@/types/auth"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password)
    setUser(data.user)
  }

 const register = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const data = await registerUser(name, email, password, role)
  setUser(data.user)
}

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
