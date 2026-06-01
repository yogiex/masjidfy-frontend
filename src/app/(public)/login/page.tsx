"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"

const loginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginPage() {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [authLoading, isAuthenticated, router])

  async function onSubmit(data: LoginFormData): Promise<void> {
    try {
      await login(data)
      toast.success("Selamat datang!")
      router.push("/dashboard")
    } catch {
      toast.error("Username atau password salah")
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="flex w-full max-w-4xl gap-8">
          <Skeleton className="hidden h-[600px] flex-1 rounded-2xl md:block" />
          <Skeleton className="h-[600px] w-full max-w-md rounded-2xl" />
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Left column — branding */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-primary p-12 md:flex">
        <div className="mx-auto max-w-sm space-y-10 text-center text-primary-foreground">
          <h1 className="text-4xl font-bold tracking-tight">Masjidfy</h1>
          <div className="flex justify-center">
            <MasjidSilhouette />
          </div>
          <p className="text-lg leading-relaxed text-primary-foreground/80">
            &ldquo;Memudahkan ibadah, memberdayakan umat.&rdquo;
          </p>
        </div>
      </div>

      {/* Right column — form */}
      <div className="flex w-full items-center justify-center bg-background px-6 py-12 md:w-1/2">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="space-y-2 text-center md:hidden">
            <h1 className="text-2xl font-bold">Masjidfy</h1>
          </div>

          {/* Header */}
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-sm text-muted-foreground">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username atau Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username atau email"
                aria-invalid={!!errors.username}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  aria-invalid={!!errors.password}
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="cursor-pointer text-sm font-normal text-muted-foreground"
              >
                Ingat saya
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {isSubmitting ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
