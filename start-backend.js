#!/usr/bin/env node

/**
 * Backend Server Starter
 * This script starts the backend server and keeps it running
 */

import './backend-example.js';

// Keep the process alive
process.stdin.resume();

console.log('Backend server started. Press Ctrl+C to stop.');