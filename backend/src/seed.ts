import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Seed Skills
  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { name: 'การออกแบบ' },
      update: {},
      create: {
        name: 'การออกแบบ',
        nameEn: 'Design',
        category: 'creative'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การเขียน' },
      update: {},
      create: {
        name: 'การเขียน',
        nameEn: 'Writing',
        category: 'creative'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การโปรแกรม' },
      update: {},
      create: {
        name: 'การโปรแกรม',
        nameEn: 'Programming',
        category: 'tech'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การตลาด' },
      update: {},
      create: {
        name: 'การตลาด',
        nameEn: 'Marketing',
        category: 'business'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'วิดีโอ' },
      update: {},
      create: {
        name: 'วิดีโอ',
        nameEn: 'Video',
        category: 'creative'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การถ่ายภาพ' },
      update: {},
      create: {
        name: 'การถ่ายภาพ',
        nameEn: 'Photography',
        category: 'creative'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การสอน' },
      update: {},
      create: {
        name: 'การสอน',
        nameEn: 'Teaching',
        category: 'education'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'การแปล' },
      update: {},
      create: {
        name: 'การแปล',
        nameEn: 'Translation',
        category: 'language'
      }
    })
  ])

  console.log(`✅ Created ${skills.length} skills`)

  // Seed Ideas
  const ideas = await Promise.all([
    prisma.idea.upsert({
      where: { id: 'idea-1' },
      update: {},
      create: {
        id: 'idea-1',
        title: 'ออกแบบโลโก้สำหรับ SME',
        description: 'รับจ้างออกแบบโลโก้สำหรับร้านค้าเล็กและธุรกิจ SME',
        skills: ['การออกแบบ'],
        difficulty: 'medium',
        estimatedIncomeMin: 5000,
        estimatedIncomeMax: 15000,
        incomeUnit: 'THB',
        timeToStart: '1-2 สัปดาห์',
        requiredTools: ['Figma', 'Adobe Illustrator'],
        resources: ['https://figma.com', 'https://behance.net'],
        steps: [
          'ศึกษาเทคนิคการออกแบบโลโก้',
          'สร้าง Portfolio งานตัวอย่าง',
          'ตั้งราคาบริการ',
          'เปิดช่องทางรับงาน',
          'ปรับปรุง Portfolio ตามงานที่ทำจริง'
        ]
      }
    }),
    prisma.idea.upsert({
      where: { id: 'idea-2' },
      update: {},
      create: {
        id: 'idea-2',
        title: 'เขียนบทความ/Content',
        description: 'รับเขียนบทความ SEO, โพสต์โซเชียลมีเดีย และ Content ต่างๆ',
        skills: ['การเขียน'],
        difficulty: 'easy',
        estimatedIncomeMin: 1000,
        estimatedIncomeMax: 5000,
        incomeUnit: 'THB',
        timeToStart: '1 สัปดาห์',
        requiredTools: ['Notion', 'Grammarly'],
        resources: ['https://medium.com', 'https://wordpress.com'],
        steps: [
          'ฝึกเขียนให้ถูกต้องและน่าสนใจ',
          'สร้าง Portfolio งานตัวอย่าง',
          'ตั้งราคาบริการ',
          'เปิดช่องทางรับงาน',
          'เก็บรีวิวจากลูกค้า'
        ]
      }
    }),
    prisma.idea.upsert({
      where: { id: 'idea-3' },
      update: {},
      create: {
        id: 'idea-3',
        title: 'เขียนเว็บไซต์ง่ายๆ',
        description: 'รับเขียนเว็บไซต์สำหรับร้านค้า, Landing Page ด้วย Next.js หรือ WordPress',
        skills: ['การโปรแกรม', 'การออกแบบ'],
        difficulty: 'medium',
        estimatedIncomeMin: 10000,
        estimatedIncomeMax: 30000,
        incomeUnit: 'THB',
        timeToStart: '2-4 สัปดาห์',
        requiredTools: ['VS Code', 'Next.js', 'WordPress'],
        resources: ['https://nextjs.org', 'https://wordpress.org'],
        steps: [
          'เรียนรู้ Next.js หรือ WordPress',
          'สร้าง Portfolio เว็บไซต์ตัวอย่าง',
          'ตั้งราคาบริการ',
          'เปิดช่องทางรับงาน',
          'ปรับปรุง Portfolio ตามงานที่ทำจริง'
        ]
      }
    }),
    prisma.idea.upsert({
      where: { id: 'idea-4' },
      update: {},
      create: {
        id: 'idea-4',
        title: 'ทำวิดีโอยูทูป/Shorts',
        description: 'สร้างเนื้อหาวิดีโอ รับจ้างตัดต่อ หรือทำวิดีโอโฆษณา',
        skills: ['วิดีโอ', 'การถ่ายภาพ'],
        difficulty: 'easy',
        estimatedIncomeMin: 2000,
        estimatedIncomeMax: 10000,
        incomeUnit: 'THB',
        timeToStart: '1 สัปดาห์',
        requiredTools: ['CapCut', 'DaVinci Resolve'],
        resources: ['https://youtube.com', 'https://tiktok.com'],
        steps: [
          'ศึกษาการตัดต่อวิดีโอ',
          'สร้าง Portfolio วิดีโอตัวอย่าง',
          'ตั้งราคาบริการ',
          'เปิดช่องทางรับงาน',
          'ปรับปรุง Portfolio ตามงานที่ทำจริง'
        ]
      }
    })
  ])

  console.log(`✅ Created ${ideas.length} ideas`)

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
