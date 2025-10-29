#!/bin/zsh

# K6 Load Testing Script for Hobbies To-Do List
# This script runs k6 load tests against a mock API server

echo "🧪 K6 Load Testing for Hobbies To-Do List App"
echo "=============================================="
echo ""

# Check if k6 is installed
if ! command -v k6 &> /dev/null; then
    echo "❌ k6 is not installed!"
    echo ""
    echo "Install k6:"
    echo "  macOS:   brew install k6"
    echo "  Linux:   https://k6.io/docs/getting-started/installation/"
    echo "  Windows: https://k6.io/docs/getting-started/installation/"
    exit 1
fi

echo "✅ k6 is installed"
echo ""

# Check if mock server is running (optional)
# Uncomment if you want to check for a running API server
# if ! curl -s http://localhost:3000/api/health &> /dev/null; then
#     echo "⚠️  Warning: Mock API server is not running"
#     echo "   Start the mock server first, or run the test anyway"
#     echo ""
# fi

# Run different test scenarios
echo "Running load tests..."
echo ""
echo "📊 Test Configuration:"
echo "  - Virtual Users: Up to 50"
echo "  - Duration: ~4 minutes"
echo "  - Operations: CRUD operations on hobbies"
echo ""

# Run the main test
k6 run scripts/hobbies-test.js

echo ""
echo "✅ Tests completed!"
echo ""
echo "💡 Tips:"
echo "  - Check the output for response times and error rates"
echo "  - Modify scripts/hobbies-test.js to adjust test parameters"
echo "  - Set BASE_URL in the script to test your actual API"
echo ""

