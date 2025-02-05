import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SignupForm } from "@/components/SignupForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          <SignupForm />
        </div>
      </main>
    </div>
  )
}

