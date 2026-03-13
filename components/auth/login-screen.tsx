"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { getDefaultRouteByRole } from "@/lib/auth/auth-utils";
import Image from "next/image";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("guardia@blindaje.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await login(email, password);

      if (!user) {
        setError("Credenciales inválidas. Verificá el correo y la contraseña.");
        return;
      }

      const nextRoute = getDefaultRouteByRole(user.role);
      router.push(nextRoute);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f4f6] text-[#1f1f24]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(109,40,217,0.05),transparent_24%)]" />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <div
          className="absolute inset-0 bg-[#6D28D9]"
          style={{
            clipPath: "polygon(34% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,rgba(255,255,255,0.14),transparent_30%)]" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-[1fr_0.92fr]">
        <section className="hidden lg:flex">
          <div className="flex w-full flex-col justify-between p-10 xl:p-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <div className="flex h-24 w-24 items-center justify-center">
                <Image
                  src="/logos/BDigital-Logo_Symbol-Purple.webp"
                  width={540}
                  height={540}
                  alt="Logo"
                  className="w-24 h-24"
                />
              </div>

              <div>
                <Image
                  src="/logos/BDigital-Logo_Text.webp"
                  width={540}
                  height={540}
                  alt="Logo"
                  className="h-24 w-auto" 
                />
              </div>
            </motion.div>

            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              >
                <span className="mb-4 inline-flex rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 backdrop-blur">
                  Acceso seguro · Operación centralizada
                </span>

                <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#18181b] xl:text-5xl">
                  Controlá rondas, tareas y accesos desde una sola interfaz.
                </h2>

                <p className="mt-5 max-w-md text-base leading-7 text-[#5d5d68]">
                  Una experiencia clara, rápida y diseñada para la operación
                  diaria del personal de seguridad, residentes y administración.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-sm text-[#72727d]"
            >
              Blindaje Digital · Sistema operativo de seguridad
            </motion.div>
          </div>
        </section>

        <section className="relative flex items-center justify-center p-6 sm:p-8 lg:justify-end lg:pr-16 xl:pr-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f4f6_0%,#ede9fe_100%)] lg:hidden" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="rounded-[28px] border border-white/25 bg-white/92 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-medium text-[#6D28D9]">
                  Bienvenido nuevamente
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#666670]">
                  Accedé a tu panel operativo con tus credenciales.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#2f2f37]"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#dddde6] bg-[#fffce8] px-4 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#2f2f37]"
                  >
                    Contraseña
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#dddde6] bg-[#fffce8] px-4 pr-12 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[#7b7b86] transition hover:bg-[#f4f4f8] hover:text-[#1f1f24]"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.995 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#6D28D9] px-4 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Ingresando..." : "Ingresar"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              </form>

              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/80 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-700">
                  Usuarios de prueba
                </p>
                <div className="mt-2 space-y-1 text-sm text-[#5d5d68]">
                  <p>Guardia: guardia@blindaje.com / 123456</p>
                  <p>Residente: residente@blindaje.com / 123456</p>
                  <p>Admin local: admin@blindaje.com / 123456</p>
                  <p>Admin global: global@blindaje.com / 123456</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
