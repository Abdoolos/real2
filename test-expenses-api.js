const fetch = require('node-fetch');

async function testExpensesAPI() {
  try {
    console.log('🔍 Testing /api/expenses...\n');
    
    const response = await fetch('http://localhost:3000/api/expenses');
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const text = await response.text();
    console.log('\n📄 Response Body:');
    console.log(text);
    
    if (response.ok) {
      console.log('\n✅ API Success!');
      const data = JSON.parse(text);
      console.log('Data:', JSON.stringify(data, null, 2));
    } else {
      console.log('\n❌ API Failed!');
    }
    
  } catch (error) {
    console.error('\n💥 Error:', error.message);
    console.error(error.stack);
  }
}

testExpensesAPI();
