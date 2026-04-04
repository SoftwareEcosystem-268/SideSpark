// components/layout/UserNavbar.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, User as UserIcon, Search, FolderKanban, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UserNavbar({ user }: { user: any }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "สำรวจไอเดีย", href: "/main", icon: Search },
    { name: "จัดการโปรเจกต์", href: "/main/projects", icon: FolderKanban },
    { name: "ความสำเร็จ", href: "/main/success", icon: Award },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-[#F8FAFC]/80 dark:bg-[#1E293B]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 w-1/4">
          <Link href="/main">
            <img src="/images/logo.jpg" alt="SideSpark Logo" width="100" className="rounded mix-blend-multiply dark:mix-blend-normal hover:opacity-90 transition-opacity" />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/main" && pathname.startsWith(link.href));
            return (
              <Link key={link.name} href={link.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  className={cn(
                    "flex items-center gap-2 font-medium transition-colors rounded-full px-5",
                    isActive 
                      ? "bg-[#8A2BE2]/10 text-[#8A2BE2] hover:bg-[#8A2BE2]/20" 
                      : "text-gray-600 hover:text-[#8A2BE2] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Right: Profile & Actions */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <div className="flex items-center gap-3">
            {/* Profile Icon & Info */}
            <div className="hidden md:flex items-center gap-3 text-right border-r border-gray-200 dark:border-gray-700 pr-4">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">{user?.name || "User"}</p>
                <p className="text-[10px] text-gray-500">{user?.email}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#8A2BE2]/10 flex items-center justify-center text-[#8A2BE2] border border-[#8A2BE2]/20">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
            
            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full"
              title="ออกจากระบบ"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </nav>
  )
}