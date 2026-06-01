"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import apiClient from "./api-client"
import { hasRole, hasAnyRole } from "./roles"
import type { AuthMeResponse, LoginRequest } from "@/types"

interface AuthContextValue {
  user: AuthMeResponse | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  hasRole: (roleName: string) => boolean
  hasAnyRole: (roleNames: string[]) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getStoredToken)
  const [user, setUser] = useState<AuthMeResponse | null>(null)
  const [sessionReady, setSessionReady] = useState(() => !getStoredToken())
  const router = useRouter()

  useEffect(() => {
    const storedToken = getStoredToken()
    if (!storedToken) {
      return
    }

    let cancelled = false

    apiClient
      .get<AuthMeResponse>("/auth/me")
      .then((response) => {
        if (cancelled) return
        setUser(response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
      })
      .catch(() => {
        if (cancelled) return
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        setToken(null)
      })
      .finally(() => {
        if (!cancelled) {
          setSessionReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(
    async (credentials: LoginRequest): Promise<void> => {
      const loginResponse = await apiClient.post<{
        accessToken: string
      }>("/auth/login", credentials)

      const { accessToken } = loginResponse.data
      localStorage.setItem("accessToken", accessToken)
      setToken(accessToken)
      setSessionReady(false)

      const meResponse = await apiClient.get<AuthMeResponse>("/auth/me")
      setUser(meResponse.data)
      localStorage.setItem("user", JSON.stringify(meResponse.data))
      setSessionReady(true)
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
  }, [router])

  const checkRole = useCallback(
    (roleName: string): boolean => {
      return hasRole(user?.roles, roleName)
    },
    [user]
  )

  const checkAnyRole = useCallback(
    (roleNames: string[]): boolean => {
      return hasAnyRole(user?.roles, roleNames)
    },
    [user]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token && sessionReady,
        isLoading: !!token && !sessionReady,
        login,
        logout,
        hasRole: checkRole,
        hasAnyRole: checkAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
export type { AuthContextValue }
