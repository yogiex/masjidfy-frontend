import type { AxiosInstance } from "axios"
import type { AuthMeResponse } from "@/types"

const MOCK_CREDENTIALS = {
  username: "admin@masjidfy.local",
  password: "admin123",
}

const MOCK_USER: AuthMeResponse = {
  id: "mock-001",
  username: "admin@masjidfy.local",
  email: "admin@masjidfy.local",
  fullName: "Admin Masjidfy",
  phone: "08123456789",
  address: "Jl. Masjid Raya No. 1",
  isActive: true,
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-06-01T00:00:00.000Z",
  roles: [
    { role: { id: "role-1", name: "superadmin" } },
    { role: { id: "role-2", name: "admin" } },
  ],
}

const MOCK_TOKEN_PREFIX = "Bearer mock-token-masjidfy"

export function enableMockApi(apiClient: AxiosInstance): void {
  const defaultAdapter = (apiClient as any).defaults.adapter

  apiClient.defaults.adapter = async (config: any) => {
    if (config.url === "/auth/login" && config.method === "post") {
      const data = JSON.parse(config.data || "{}")
      if (
        data.username === MOCK_CREDENTIALS.username &&
        data.password === MOCK_CREDENTIALS.password
      ) {
        return mockResponse({ accessToken: "mock-token-masjidfy-001" }, config)
      }
      return mockReject(401, "Username atau password salah", config)
    }

    if (config.url === "/auth/me" && config.method === "get") {
      const token: string | undefined = config.headers?.Authorization
      if (token?.startsWith(MOCK_TOKEN_PREFIX)) {
        return mockResponse(MOCK_USER, config)
      }
      return mockReject(401, "Unauthorized", config)
    }

    if (config.url === "/auth/register" && config.method === "post") {
      return mockResponse(
        { id: "mock-new-user-001", message: "Registration successful" },
        config
      )
    }

    if (defaultAdapter) {
      return defaultAdapter(config)
    }

    const axios = await import("axios")
    const fallbackAdapter = (axios.default.defaults as any).adapter
    if (fallbackAdapter) return fallbackAdapter(config)

    throw new Error("No axios adapter available")
  }
}

function mockResponse(data: unknown, config: any) {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: { "content-type": "application/json" },
    config,
    request: {},
  }
}

function mockReject(status: number, message: string, config: any) {
  const error: any = new Error(message)
  error.response = {
    data: { message },
    status,
    statusText: status === 401 ? "Unauthorized" : "Error",
    headers: {},
    config,
  }
  error.isAxiosError = true
  throw error
}
