# Newark-Dashboard2

A MERN stack dashboard application using React (Vite) frontend and Node.js + Express backend.

---

## Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB (local or Atlas)

---

## Backend Setup

1. Go to backend folder:
cd backend


2. Install dependencies:
npm install

3. Copy the example env file:
cp .env.example .env

4. Edit `.env` and add your MongoDB URI:
MONGO_URI=mongodb://localhost:27017/newark_dashboard

5. Start the server:
npm run dev


## Frontend Setup

1. Open a new terminal and go to frontend:
cd frontend

2. (Optional) Clean previous builds:
rm -rf node_modules package-lock.json ~/.esbuild

3. Install dependencies:
npm install

4. Start the frontend app:
npm run dev

## Environment File

- File: `backend/.env`
- Sample:
MONGO_URI=your-mongodb-connection-string-here

- Copy example:
cp backend/.env.example backend/.env