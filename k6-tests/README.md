# K6 Load Testing for Hobbies To-Do List App

## 📝 Overview

This directory contains load testing scripts for the Hobbies To-Do List app. Since the mobile app uses AsyncStorage (local storage), these tests are designed for a mock API backend that simulates the storage operations.

## ⚠️ Important Note

The Hobbies mobile app uses **AsyncStorage** for local data persistence - this means:
- ❌ No HTTP API to test directly
- ❌ All data is stored locally on the device
- ❌ k6 can only test HTTP endpoints

## 🎯 Solutions

### Option 1: Mock API Testing
Test a simulated backend API that mirrors the AsyncStorage operations.

### Option 2: Mobile Performance Testing
Use React Native testing tools instead of k6 to measure local storage performance.

## 📁 Structure

```
k6-tests/
├── README.md                   # This file
├── scripts/
│   └── hobbies-test.js        # K6 load test script
├── data/
│   └── sample-hobbies.json    # Sample data for testing
└── run-tests.sh               # Test runner script
```

## 🚀 Quick Start

### Prerequisites
```bash
# Install k6
# macOS
brew install k6

# Or download from https://k6.io/docs/getting-started/installation/
```

### Run Tests

```bash
# Run the test suite
./run-tests.sh
```

Or manually:
```bash
k6 run scripts/hobbies-test.js
```

## 📊 Test Scenarios

The load tests simulate:
1. **Create Hobby**: POST /api/hobbies
2. **Get All Hobbies**: GET /api/hobbies
3. **Get Single Hobby**: GET /api/hobbies/:id
4. **Update Hobby**: PUT /api/hobbies/:id
5. **Delete Hobby**: DELETE /api/hobbies/:id
6. **Toggle Completion**: PATCH /api/hobbies/:id/toggle

## 🎨 Metrics Measured

- Response time (p50, p95, p99)
- Request rate (requests per second)
- Error rate
- Throughput
- VU (Virtual Users) count

## ⚙️ Configuration

Edit `scripts/hobbies-test.js` to modify:
- Duration of test
- Number of virtual users
- API endpoint URL
- Request patterns

## 📈 Example Results

```
     data_received........: 1.2 MB
     data_sent............: 850 KB
     http_req_duration....: avg=45ms  min=12ms  med=38ms  max=280ms
     http_reqs............: 5000     req/s=500
     iterations...........: 1000
     vus.................: 50       max=50
```

## 🔧 Note for Mobile Apps

For actual mobile app performance testing, consider:
- React Native Performance Monitor
- Flipper Performance tool
- Chrome DevTools for web version
- Xcode Instruments for iOS

These tools test AsyncStorage performance directly on the device.

## 📚 Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 Best Practices](https://k6.io/docs/using-k6/http-best-practices/)
- [AsyncStorage Performance](https://react-native-async-storage.github.io/async-storage/docs/advanced/api/)

