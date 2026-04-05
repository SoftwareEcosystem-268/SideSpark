// app/main/success/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import UserNavbar from "@/components/layout/UserNavbar"
import Footer from "@/components/layout/Footer"
import SuccessPage from "@/components/main/SuccessPage"

export default async function SuccessRoute() {
  const session = await getServerSession()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] dark:bg-[#1E293B] flex flex-col">
      <UserNavbar user={session.user} />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <SuccessPage />
      </main>
      
    </div>
  )
}