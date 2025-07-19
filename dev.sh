#!/bin/bash

echo "🚀 Starting Ahmed Sam Studio Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies are already installed"
fi

# Check if port 5173 is available
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5173 is already in use. Stopping existing process..."
    lsof -ti:5173 | xargs kill -9
    sleep 2
fi

echo "🌐 Starting development server..."
echo "📍 Your app will be available at: http://localhost:5173"
echo "🔄 Hot reload is enabled - changes will reflect immediately"
echo ""
echo "Press Ctrl+C to stop the development server"
echo ""

# Start the development server
npm run dev 