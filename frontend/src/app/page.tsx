import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, BarChart3, Target, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative bg-[#F8FAFC] dark:bg-[#1E293B] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-[#F8FAFC]/80 dark:bg-[#1E293B]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
            <img
              src="/images/logo.jpg"
              alt="SideSpark Logo"
              width="120"
              className="rounded mix-blend-multiply border-t-[5px] border-white dark:border-transparent dark:mix-blend-normal"
            />
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex hover:text-[#8A2BE2]">
                เข้าสู่ระบบ
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#8A2BE2] hover:bg-[#8A2BE2]/90 text-white shadow-md shadow-[#8A2BE2]/20">
                สมัครสมาชิก
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD600] text-[#1E293B] text-sm font-bold mb-6 shadow-lg shadow-[#FFD600]/20">
          <span className="flex h-2 w-2 rounded-full bg-[#1E293B] animate-pulse opacity-80"></span>
            แพลตฟอร์มอันดับ 1 สำหรับนักศึกษา
        </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1E293B] dark:text-white">
            เริ่มต้น Side Hustle <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#10B981]">
              อย่างมั่นใจและเป็นระบบ
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            เปลี่ยนทักษะของคุณให้เป็นรายได้ จัดการโปรเจกต์ และติดตามผลกำไรอย่างมืออาชีพ 
            รวบรวมทุกเครื่องมือที่นักศึกษาไทยต้องการไว้ในที่เดียว
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 bg-[#8A2BE2] hover:bg-[#8A2BE2]/90 h-14 rounded-full shadow-xl shadow-[#8A2BE2]/30 transition-transform hover:-translate-y-1">
              เริ่มต้นใช้งานฟรี <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-transform hover:-translate-y-1">
              ดูตัวอย่างแอป
            </Button>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFD600]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#FFD600]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-7 w-7 text-[#FFD600]" />
              </div>
              <CardTitle className="text-xl">ค้นหาไอเดียทำเงิน</CardTitle>
              <CardDescription className="text-base mt-2">
                เลือกทักษะที่คุณมี ระบบจะวิเคราะห์และแนะนำไอเดียที่เหมาะสมพร้อมประเมินรายได้ล่วงหน้า
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8A2BE2]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-[#8A2BE2]" />
              </div>
              <CardTitle className="text-xl">วางแผนโปรเจกต์</CardTitle>
              <CardDescription className="text-base mt-2">
                กำหนดเป้าหมาย สร้าง To-do list แยกย่อยงานที่ต้องทำ เพื่อให้คุณไม่พลาดทุกเดดไลน์
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#10B981]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-[#10B981]" />
              </div>
              <CardTitle className="text-xl">ติดตามรายได้</CardTitle>
              <CardDescription className="text-base mt-2">
                บันทึกบัญชีรายรับ-รายจ่าย ดูสรุปผลกำไรแบบกราฟที่เข้าใจง่ายในหน้าเดียว
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Preview Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">ทดลองใช้งานหน้าต่างจำลอง</h2>
          <p className="text-gray-500">สัมผัสประสบการณ์ใช้งานจริงของ SideSpark</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl">
          <CardContent className="p-0">
            <Tabs defaultValue="dashboard" className="w-full">
              <div className="px-6 pt-6 border-b border-gray-100 dark:border-gray-800">
                <TabsList className="w-full justify-start h-auto bg-transparent gap-6 p-0">
                  <TabsTrigger value="dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-[#8A2BE2] data-[state=active]:text-[#8A2BE2] rounded-none px-2 py-3 bg-transparent shadow-none">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="discover" className="data-[state=active]:border-b-2 data-[state=active]:border-[#8A2BE2] data-[state=active]:text-[#8A2BE2] rounded-none px-2 py-3 bg-transparent shadow-none">
                    ค้นหาไอเดีย
                  </TabsTrigger>
                  <TabsTrigger value="track" className="data-[state=active]:border-b-2 data-[state=active]:border-[#8A2BE2] data-[state=active]:text-[#8A2BE2] rounded-none px-2 py-3 bg-transparent shadow-none">
                    ติดตามรายได้
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 md:p-8">
                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6 m-0 animate-in fade-in-50 duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-none shadow-sm bg-gray-50 dark:bg-gray-800/50">
                      <CardContent className="p-5">
                        <div className="text-sm font-medium text-gray-500 mb-1">รายได้เดือนนี้</div>
                        <div className="text-2xl font-bold text-[#1E293B] dark:text-white">฿12,500</div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-[#10B981]/10">
                      <CardContent className="p-5">
                        <div className="text-sm font-medium text-[#10B981] mb-1">กำไรสุทธิ</div>
                        <div className="text-2xl font-bold text-[#10B981]">฿8,500</div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-[#8A2BE2]/10">
                      <CardContent className="p-5">
                        <div className="text-sm font-medium text-[#8A2BE2] mb-1">Streak ทำงาน</div>
                        <div className="text-2xl font-bold text-[#8A2BE2]">7 วัน</div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-[#FFD600]/10">
                      <CardContent className="p-5">
                        <div className="text-sm font-medium text-[#D4B300] dark:text-[#FFD600] mb-1">เป้าหมายสำเร็จ</div>
                        <div className="text-2xl font-bold text-[#D4B300] dark:text-[#FFD600]">3/5</div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="border-none shadow-sm bg-gray-50 dark:bg-gray-800/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-[#8A2BE2]" />
                        ภาพรวมการเติบโต
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 flex items-end justify-around gap-4 pt-4">
                        {[40, 60, 45, 80].map((height, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                            <div className="w-full max-w-[4rem] bg-[#8A2BE2]/20 rounded-t-md relative group-hover:bg-[#8A2BE2]/30 transition-colors" style={{ height: '100%' }}>
                              <div
                                className="absolute bottom-0 w-full bg-gradient-to-t from-[#8A2BE2] to-[#A855F7] rounded-t-md transition-all duration-500"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 font-medium">สัปดาห์ {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Discover Tab */}
                <TabsContent value="discover" className="space-y-6 m-0 animate-in fade-in-50 duration-500">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                      <Lightbulb className="h-5 w-5 text-[#FFD600]" />
                      ทักษะที่คุณสนใจคืออะไร?
                    </h3>
                    <div className="flex gap-3 flex-wrap">
                      {['การออกแบบ', 'การเขียน', 'เขียนโปรแกรม', 'การตลาด', 'ตัดต่อวิดีโอ'].map((skill, i) => (
                        <Button key={skill} variant={i === 0 ? "default" : "outline"} className={i === 0 ? "bg-[#8A2BE2] hover:bg-[#8A2BE2]/90 text-white rounded-full" : "rounded-full"}>
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">ไอเดียทำเงินที่แนะนำ</h3>
                    {[
                      { title: 'ออกแบบโลโก้สำหรับ SME', price: '฿5,000 - ฿15,000' },
                      { title: 'รับออกแบบ UI/UX เว็บไซต์', price: '฿10,000 - ฿30,000' }
                    ].map((idea, i) => (
                      <div key={i} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#8A2BE2] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-[#8A2BE2] transition-colors" />
                          <span className="font-medium">{idea.title}</span>
                        </div>
                        <span className="text-[#10B981] font-semibold bg-[#10B981]/10 px-3 py-1 rounded-full text-sm">
                          {idea.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Track Tab */}
                <TabsContent value="track" className="space-y-6 m-0 animate-in fade-in-50 duration-500">
                  <div className="bg-gradient-to-br from-[#10B981] to-[#059669] p-8 rounded-2xl text-white shadow-lg shadow-[#10B981]/20">
                    <h3 className="font-medium text-white/80 mb-1">ยอดเงินคงเหลือสุทธิ</h3>
                    <div className="text-4xl font-bold tracking-tight mb-2">฿8,500.00</div>
                    <p className="text-sm text-white/90 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> เติบโตขึ้น 12% จากเดือนที่แล้ว
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 pt-2">รายการล่าสุด</h3>
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#10B981]" />
                        </div>
                        <div>
                          <div className="font-medium">ค่าจ้างออกแบบโลโก้</div>
                          <div className="text-xs text-gray-500">วันนี้, 14:30 น.</div>
                        </div>
                      </div>
                      <span className="text-[#10B981] font-bold text-lg">+฿5,000</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-red-500 rotate-45" />
                        </div>
                        <div>
                          <div className="font-medium">ค่าบริการซอฟต์แวร์รายเดือน</div>
                          <div className="text-xs text-gray-500">20 มี.ค. 2026</div>
                        </div>
                      </div>
                      <span className="text-red-500 font-bold text-lg">-฿2,000</span>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-[#F8FAFC] dark:bg-[#1E293B] mt-24 relative z-10">
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="mb-6">
                <img
                  src="/images/logo.jpg"
                  alt="SideSpark Logo"
                  width="120"
                  className="rounded mix-blend-multiply border-t-[5px] border-white dark:border-transparent dark:mix-blend-normal hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                แอปที่ช่วยให้นักศึกษาไทยเริ่มต้นทำโปรเจกต์และหารายได้เสริมได้อย่างเป็นระบบ
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#1E293B] dark:text-white">เมนูหลัก</h3>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-[#8A2BE2] transition-colors">ฟีเจอร์</a></li>
                <li><a href="#" className="hover:text-[#8A2BE2] transition-colors">ราคา</a></li>
                <li><a href="#" className="hover:text-[#8A2BE2] transition-colors">บทความ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#1E293B] dark:text-white">ติดตามเรา</h3>
              <div className="flex gap-4">
                <a href="#" className="rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8A2BE2]/30 transition-all duration-300">
                  <img src="/images/facebook.png" alt="Facebook" width="40" height="40" />
                </a>
                <a href="#" className="rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8A2BE2]/30 transition-all duration-300">
                  <img src="/images/instagram.png" alt="Instagram" width="40" height="40" />
                </a>
                <a href="#" className="rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8A2BE2]/30 transition-all duration-300">
                  <img src="/images/youtube.png" alt="YouTube" width="40" height="40" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200/50 dark:border-gray-800/50 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 SideSpark. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    </div>
  )
}