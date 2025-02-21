# AstroMind-AI

## 📌 Overview

AstroMind-AI is a **React + Node.js** application that provides an AI-powered chat experience using **GPT-4o**. The project includes a **full authentication system, user roles, and chat history storage using MongoDB**. The frontend is built with **React (Vite) + Tailwind CSS**, while the backend is implemented in **Express.js with TypeScript**.

## 📂 Project Structure

```
AstroMind-AI/
│── backend/          # Backend server (Node.js + Express + TypeScript)
│── frontend/         # Frontend application (React + Vite + Tailwind)
│── package.json      # Dependencies and scripts
│── README.md         # Project documentation
```

### 🔹 Backend Structure (`backend/`)

```
backend/
│── src/
│   │── controllers/   # Handles API logic (authentication, users, chat)
│   │── models/        # Mongoose models (User, ChatMessage)
│   │── routes/        # API endpoints (Auth, User, Chat)
│   │── services/      # Business logic (OpenAI integration, user services)
│   │── middlewares/   # Authentication middleware
│   │── config/        # Environment variables and settings
│   │── database/      # MongoDB connection
│── dist/             # Compiled TypeScript files
│── tsconfig.json     # TypeScript configuration
```

### 🔹 Frontend Structure (`frontend/`)

```
frontend/
│── src/
│   │── components/    # UI components (Chat, Layout, ProtectedRoute)
│   │── context/       # AuthContext (manages user authentication state)
│   │── pages/         # Application pages (Login, Register, Home, Admin)
│   │── services/      # API requests (auth, chat, users)
│   │── styles/        # Tailwind CSS styles
│   │── main.tsx       # Entry point
│── package.json      # Dependencies and scripts
│── vite.config.ts    # Vite configuration
```

## 🚀 Features

### ✅ Authentication

- User authentication with **JWT tokens**
- **Login / Register / Logout** functionality
- **Role-based access control (Admin/User)**

### ✅ AI-Powered Chat

- **GPT-4o** integration for chat responses
- **Chat history storage** using MongoDB
- **User-friendly UI with real-time chat experience**

### ✅ User Management

- Profile management
- Admin dashboard for managing users

### ✅ UI/UX

- Responsive design using **Tailwind CSS**
- RTL support for **Hebrew and Arabic**

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-repo/AstroMind-AI.git
cd AstroMind-AI
```

### 2️⃣ Setup the Backend

```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev            # Start the server
```

### 3️⃣ Setup the Frontend

```sh
cd frontend
npm install
npm run dev  # Runs on http://localhost:3000
```

## 🔗 API Endpoints

### 🔹 Authentication Routes (`/api/auth`)

| Method | Route       | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/login`    | User login        |
| POST   | `/register` | User registration |
| GET    | `/me`       | Get current user  |

### 🔹 Chat Routes (`/api/chat`)

| Method | Route      | Description      |
| ------ | ---------- | ---------------- |
| GET    | `/history` | Get chat history |
| POST   | `/`        | Send message     |

## 📜 Tech Stack

### **Backend:**

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **TypeScript**
- **JWT Authentication**

### **Frontend:**

- **React + Vite**
- **Tailwind CSS**
- **React Router**
- **Context API**

## ⚡ Notes

- The project requires an **OpenAI API key** to function properly.
- MongoDB must be set up and configured in `.env` file.

## 👨‍💻 Author



