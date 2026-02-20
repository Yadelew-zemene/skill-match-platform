export type UserRole = "candidate" | "employer" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>
  logout: () => Promise<void>
}
