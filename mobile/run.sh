#!/bin/zsh

# Hobbies To-Do List Startup Script

echo "🎯 Starting Hobbies To-Do List App..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start Expo with tunnel for QR code
echo "🚀 Starting Expo development server..."
echo "📱 Scan the QR code with your iOS device using the Camera app"
npm start

