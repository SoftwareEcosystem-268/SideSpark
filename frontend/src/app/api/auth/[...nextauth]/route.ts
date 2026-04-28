// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
          console.log("🔗 NextAuth is calling:", apiURL); // [DEBUG] เช็คว่า URL ตรงไหม

          const res = await fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();

          if (res.ok && data.user) {
            console.log("✅ Login Success:", data.user.email);
            return data.user;
          }

          // [DEBUG] ถ้าเฟล ให้ดูว่า Express ตอบกลับมาว่าอะไร
          console.error(
            "❌ Auth Failed. Express said:",
            data.message || data.error,
          );
          throw new Error(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } catch (error: any) {
          console.error("🚨 Fetch Error:", error.message);
          throw new Error(
            error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
          );
        }
      },
    }),
  ],
  // ... callbacks และ pages เหมือนเดิม ...
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },
  secret: process.env.NEXTAUTH_SECRET, // สำคัญมาก! ต้องมีใน .env
});

export { handler as GET, handler as POST };
