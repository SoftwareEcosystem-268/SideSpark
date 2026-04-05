export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-[#F8FAFC] dark:bg-[#1E293B] relative z-10">
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
  )
}