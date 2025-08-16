#!/usr/bin/env node

/**
 * Backend Deployment Test Script
 * Run this after deploying your backend to verify everything works
 * 
 * Usage: node test-backend.js <your-heroku-app-url>
 * Example: node test-backend.js https://remotemind-backend-john.herokuapp.com
 */

import https from 'https';
import http from 'http';

// Get backend URL from command line argument
const backendUrl = process.argv[2];

if (!backendUrl) {
  console.error('❌ Please provide your backend URL');
  console.log('Usage: node test-backend.js <your-backend-url>');
  console.log('Example: node test-backend.js https://remotemind-backend.onrender.com');
  process.exit(1);
}

// Remove trailing slash
const baseUrl = backendUrl.replace(/\/$/, '');

console.log('🧪 Testing RemoteMind Backend Deployment');
console.log('🔗 Backend URL:', baseUrl);
console.log('\n' + '='.repeat(50));

// Test endpoints
const tests = [
  {
    name: 'Health Check',
    path: '/health',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'CORS Headers',
    path: '/health',
    method: 'OPTIONS',
    expectedStatus: 204
  },
  {
    name: 'Create Checkout Session (should fail without data)',
    path: '/api/create-checkout-session',
    method: 'POST',
    expectedStatus: 400,
    data: JSON.stringify({})
  }
];

// Helper function to make HTTP requests
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Run tests
async function runTests() {
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      console.log(`\n🔍 Testing: ${test.name}`);
      console.log(`   ${test.method} ${test.path}`);
      
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000'
        }
      };
      
      const response = await makeRequest(baseUrl + test.path, options, test.data);
      
      if (response.statusCode === test.expectedStatus) {
        console.log(`   ✅ PASS - Status: ${response.statusCode}`);
        passed++;
        
        // Additional checks
        if (test.name === 'CORS Headers') {
          const corsHeader = response.headers['access-control-allow-origin'];
          if (corsHeader) {
            console.log(`   ✅ CORS header present: ${corsHeader}`);
          } else {
            console.log(`   ⚠️  CORS header missing`);
          }
        }
        
        if (test.name === 'Health Check' && response.body) {
          try {
            const data = JSON.parse(response.body);
            console.log(`   📊 Response: ${JSON.stringify(data)}`);
          } catch (e) {
            console.log(`   📊 Response: ${response.body}`);
          }
        }
        
      } else {
        console.log(`   ❌ FAIL - Expected: ${test.expectedStatus}, Got: ${response.statusCode}`);
        console.log(`   📄 Response: ${response.body}`);
        failed++;
      }
      
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
      failed++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your backend is working correctly.');
    console.log('\n📋 Next Steps:');
    console.log('1. Update your frontend .env.local with:');
    console.log(`   VITE_API_URL=${baseUrl}/api`);
    console.log('2. Configure Stripe webhooks to point to:');
    console.log(`   ${baseUrl}/webhook/stripe`);
    console.log('3. Test the complete payment flow');
  } else {
    console.log('\n⚠️  Some tests failed. Check your backend deployment.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check Render logs in your dashboard');
    console.log('2. Verify environment variables are set');
    console.log('3. Ensure your app is running (check Render dashboard)');
  }
  
  console.log('\n🔗 Useful URLs:');
  console.log(`   Backend: ${baseUrl}`);
  console.log(`   Health: ${baseUrl}/health`);
  console.log(`   Render Dashboard: https://dashboard.render.com`);
  console.log(`   Stripe Dashboard: https://dashboard.stripe.com/webhooks`);
}

// Run the tests
runTests().catch(console.error);