// Supabase REST API Wrapper (بديل Prisma عند فشل الاتصال المباشر)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function fetchFromSupabase(table, options = {}) {
  const { select = '*', limit, where, orderBy } = options;
  
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}`;
  
  if (limit) url += `&limit=${limit}`;
  if (where) {
    Object.entries(where).forEach(([key, value]) => {
      url += `&${key}=eq.${value}`;
    });
  }
  if (orderBy) url += `&order=${orderBy}`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Supabase API error: ${response.status}`);
  }
  
  return response.json();
}

async function insertToSupabase(table, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`Supabase API error: ${response.status}`);
  }
  
  return response.json();
}

module.exports = {
  fetchFromSupabase,
  insertToSupabase
};
