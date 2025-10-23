import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Client } from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  try {
    const root = process.cwd()
    const sqlPath = path.join(root, 'supabase-schema.sql')

    if (!fs.existsSync(sqlPath)) {
      console.error(`❌ لم يتم العثور على الملف: ${sqlPath}`)
      process.exit(1)
    }

  const sql = fs.readFileSync(sqlPath, 'utf-8')
  const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL

    if (!dbUrl) {
      console.error('❌ متغير البيئة DIRECT_URL أو DATABASE_URL غير موجود')
      process.exit(1)
    }

    // Supabase عادة يتطلب SSL
    const client = new Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      statement_timeout: 60000,
    })

    console.log('🔌 الاتصال بقاعدة البيانات...')
    await client.connect()

    console.log('📄 تشغيل ملف SQL: supabase-schema.sql (قد يستغرق دقيقة)')
    await client.query(sql)

    console.log('✅ تم تطبيق المخطط بنجاح!')
    await client.end()

    console.log('\nالخطوات التالية:')
    console.log('- اختبر REST: GET {NEXT_PUBLIC_SUPABASE_URL}/rest/v1/categories?select=*')
    console.log('- افتح صفحة المصاريف وتأكد من ظهور البيانات')
  } catch (err) {
    console.error('❌ فشل تطبيق المخطط:')
    console.error(err?.message || err)
    process.exit(1)
  }
}

main()
