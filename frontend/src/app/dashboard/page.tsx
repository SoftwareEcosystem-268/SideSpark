'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, BarChart3, Target, ArrowRight, Plus, DollarSign, Wallet, Package, Trophy, LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { api, handleApiResponse } from "@/lib/api"
import type { Project, Transaction, Statistics } from "@/types"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Data state
  const [projects, setProjects] = useState<Project[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)

  const userSession = session?.user

  useEffect(() => {
    if (status === 'loading') return
    if (!userSession) {
      router.push('/login')
      return
    }

    fetchDashboardData()
  }, [userSession, status])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [projectsResponse, transactionsResponse, statsResponse] = await Promise.all([
        api.projects.getAll(),
        api.transactions.getAll({ limit: 10 }),
        api.transactions.getSummary(),
      ])

      const projectsData = await handleApiResponse<Project[]>(projectsResponse)
      const transactionsData = await handleApiResponse<Transaction[]>(transactionsResponse)
      const statsData = await handleApiResponse<Statistics>(statsResponse)

      setProjects(projectsData)
      setTransactions(transactionsData)
      setStatistics(statsData)
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#1E293B]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8A2BE2] border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (!userSession) {
    router.push('/login')
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#1E293B]">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Target className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={fetchDashboardData} className="bg-[#8A2BE2] hover:bg-[#7C3AED]">
            ลองใหม่
          </Button>
        </div>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('th-TH')}`
  }

  // Calculate monthly income (from statistics or current month transactions)
  const monthlyIncome = statistics?.totalIncome || 0
  const netProfit = statistics?.netProfit || 0
  const activeProjectsCount = projects.filter(p => p.status === 'active').length

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#1E293B]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-[#F8FAFC]/80 dark:bg-[#1E293B]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
            <img
              src="/images/logo.jpg"
              alt="SideSpark Logo"
              width="100"
              className="rounded mix-blend-multiply border-t-[5px] border-white dark:border-transparent dark:mix-blend-normal"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center text-white font-semibold text-sm">
                {userSession.name?.charAt(0).toUpperCase() || userSession.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userSession.name || userSession.email || 'User'}
              </span>
            </div>
            <Button
              onClick={handleSignOut}
              className="hover:text-[#8A2BE2] flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E293B] dark:text-white mb-2">
            ยินดีต้อนรับ, {userSession.name?.split(' ')[0] || userSession.email?.split('@')[0] || 'เพื่อน'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            นี่คือภาพรวมของ Side Hustle ของคุณในเดือนนี้
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-sm bg-gradient-to-br from-[#10B981] to-[#059669] text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">เดือน</span>
              </div>
              <div className="text-3xl font-bold mb-1">{formatCurrency(monthlyIncome)}</div>
              <div className="text-sm text-white/80">รายได้รวม</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#10B981]" />
                </div>
                <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-full">กำไร</span>
              </div>
              <div className="text-3xl font-bold text-[#1E293B] dark:text-white mb-1">{formatCurrency(netProfit)}</div>
              <div className="text-sm text-gray-500">กำไรสุทธิ</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#8A2BE2]/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-[#8A2BE2]" />
                </div>
                <span className="text-xs bg-[#8A2BE2]/10 text-[#8A2BE2] px-2 py-1 rounded-full">โปรเจกต์</span>
              </div>
              <div className="text-3xl font-bold text-[#1E293B] dark:text-white mb-1">{projects.length}</div>
              <div className="text-sm text-gray-500">ทั้งหมด</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#FFD600]/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-[#FFD600]" />
                </div>
                <span className="text-xs bg-[#FFD600]/10 text-[#FFD600] px-2 py-1 rounded-full">เป้าหมาย</span>
              </div>
              <div className="text-3xl font-bold text-[#1E293B] dark:text-white mb-1">
                {statistics?.milestonesCompleted || 0}
              </div>
              <div className="text-sm text-gray-500">สำเร็จ</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Projects and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Income Chart */}
            <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-[#8A2BE2]" />
                  การเติบโตของรายได้
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statistics?.monthlyData && statistics.monthlyData.length > 0 ? (
                  <div className="h-64 flex items-end justify-around gap-4 pt-4">
                    {statistics.monthlyData.slice(-6).map((data, i) => {
                      const maxValue = Math.max(...statistics.monthlyData.map(d => d.income))
                      const height = maxValue > 0 ? (data.income / maxValue) * 100 : 0
                      return (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="w-full max-w-[4rem] bg-[#8A2BE2]/10 rounded-t-md relative group-hover:bg-[#8A2BE2]/20 transition-colors" style={{ height: '100%' }}>
                            <div
                              className="absolute bottom-0 w-full bg-gradient-to-t from-[#8A2BE2] to-[#A855F7] rounded-t-md transition-all duration-500 hover:from-[#A855F7] hover:to-[#8A2BE2]"
                              style={{ height: `${Math.max(5, height)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {new Date(data.month + '-01').toLocaleString('th-TH', { month: 'short' })}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    ยังไม่มีข้อมูลรายได้
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-[#8A2BE2]" />
                  โปรเจกต์ล่าสุด
                </CardTitle>
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="text-[#8A2BE2] hover:text-[#8A2BE2] hover:bg-[#8A2BE2]/10">
                    ดูทั้งหมด
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <Link key={project.id} href={`/projects/${project.id}`}>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                          <div className={`w-12 h-12 rounded-xl bg-[#8A2BE2]/10 flex items-center justify-center flex-shrink-0`}>
                            <Target className="h-6 w-6 text-[#8A2BE2]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#1E293B] dark:text-white mb-1 truncate">{project.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className={`px-2 py-0.5 rounded-full ${project.status === 'active' ? 'bg-[#8A2BE2]/10 text-[#8A2BE2]' : project.status === 'completed' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#FFD600]/10 text-[#FFD600]'}`}>
                                {project.status === 'active' ? 'กำลังดำเนินการ' : project.status === 'completed' ? 'เสร็จสมบูรณ์' : 'หยุดชั่วคราว'}
                              </span>
                              <span>{project.progress?.percentage || 0}%</span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>ยังไม่มีโปรเจกต์</p>
                    <Link href="/projects/new" className="inline-block mt-2 text-[#8A2BE2] hover:underline">
                      สร้างโปรเจกต์แรกของคุณ
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Transactions and Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-[#8A2BE2] to-[#7C3AED] text-white">
              <CardHeader>
                <CardTitle className="text-white">การกระทำด่วน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/projects/new">
                  <Button className="w-full justify-start bg-white text-[#8A2BE2] hover:bg-gray-100">
                    <Plus className="mr-2 h-4 w-4" />
                    สร้างโปรเจกต์ใหม่
                  </Button>
                </Link>
                <Link href="/transactions/new">
                  <Button className="w-full justify-start bg-white/10 text-[#8A2BE2] hover:bg-white/20">
                    <DollarSign className="mr-2 h-4 w-4" />
                    บันทึกรายรับ-รายจ่าย
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button className="w-full justify-start bg-white/10 text-[#8A2BE2] hover:bg-white/20">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    ค้นหาไอเดียใหม่
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5 text-[#8A2BE2]" />
                  รายการล่าสุด
                </CardTitle>
                <Link href="/transactions">
                  <Button variant="ghost" size="sm" className="text-[#8A2BE2] hover:text-[#8A2BE2] hover:bg-[#8A2BE2]/10">
                    ดูทั้งหมด
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${transaction.type === 'income' ? 'bg-[#10B981]/10' : 'bg-red-500/10'}`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                          ) : (
                            <ArrowRight className="w-5 h-5 text-red-500 rotate-45" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-[#1E293B] dark:text-white truncate">
                            {transaction.description || (transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                              year: '2-digit'
                            })}
                          </div>
                        </div>
                        <div className={`font-bold text-sm ${transaction.type === 'income' ? 'text-[#10B981]' : 'text-red-500'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Wallet className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>ยังไม่มีรายการ</p>
                    <Link href="/transactions/new" className="inline-block mt-2 text-[#8A2BE2] hover:underline">
                      บันทึกรายการแรกของคุณ
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals Progress Section */}
        {statistics?.goalsProgress && statistics.goalsProgress.length > 0 && (
          <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-[#FFD600]" />
                ความคืบหน้าเป้าหมายรายเดือน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statistics.goalsProgress.map((goal) => (
                  <div key={goal.projectId} className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#8A2BE2]/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#8A2BE2]" />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${goal.progress >= 100 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#8A2BE2]/10 text-[#8A2BE2]'}`}>
                        {goal.progress >= 100 ? 'สำเร็จ' : `${goal.progress}%`}
                      </span>
                    </div>
                    <div className="font-medium text-sm text-[#1E293B] dark:text-white mb-2">
                      เป้าหมาย {formatCurrency(goal.goal)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>ความคืบหน้า</span>
                        <span>{formatCurrency(goal.current)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${goal.progress >= 100 ? 'bg-[#10B981]' : 'bg-[#8A2BE2]'}`}
                          style={{ width: `${Math.min(100, goal.progress)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}