# Newark-Dashboard2
Prerequisites
Node.js (v18 or higher recommended)
npm
MongoDB (local or Atlas)

# Backend Setup
# Go to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file by copying the example
cp .env.example .env

# Open the newly created .env file and update your MongoDB URI
# Example:
# MONGO_URI=mongodb://localhost:27017/newark_dashboard

# Start the server (make sure nodemon is installed globally or defined in devDependencies)
npm run dev

# Frontend Setup

# Open a new terminal and go to the frontend folder
cd frontend

# Clean up any old builds (optional but recommended)
rm -rf node_modules package-lock.json ~/.esbuild

# Install frontend dependencies
npm install

# Start the React app using Vite
npm run dev
