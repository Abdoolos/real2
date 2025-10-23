import 'dotenv/config'
import { Client } from 'pg'

async function main() {
  const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('Missing DIRECT_URL/DATABASE_URL')
    process.exit(1)
  }
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()
  const tables = ['expenses','categories','subcategories','users']
  for (const t of tables) {
    const res = await client.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 ORDER BY ordinal_position`,
      [t]
    )
    console.log(`\n== Columns for ${t} ==`)
    if (res.rows.length === 0) {
      console.log('(table not found)')
    } else {
      for (const r of res.rows) console.log(`- ${r.column_name} (${r.data_type})`)
    }
  }
  await client.end()
}

main().catch(e => { console.error(e); process.exit(1) })
