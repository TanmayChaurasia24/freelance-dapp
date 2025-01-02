import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

