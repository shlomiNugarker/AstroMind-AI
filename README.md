# AstroMind-AI

AstroMind-AI is a full-stack web application leveraging AI for astrological insights, user coaching, and interactive chat. It includes a backend built with Node.js (TypeScript) and a frontend powered by React (TypeScript).

## Features

- **AI-Powered Astrology Forecasts**: Provides astrological predictions for users.
- **Chat System**: Interactive chat leveraging AI-based responses.
- **User Authentication & Authorization**: Secure login, JWT-based authentication.
- **Coach-Trainee Management**: Supports structured coaching sessions.
- **Multilingual Support**: UI available in multiple languages (English, Hebrew).

## Tech Stack

- **Backend**: Node.js, Express, PostgreSQL, TypeScript, OpenAI API.
- **Frontend**: React, Redux, TailwindCSS, Vite.

## Project Structure

```
AstroMind-AI/
│── backend/        # Node.js server with API & authentication
│   ├── src/
│   │   ├── controllers/    # API logic
│   │   ├── middlewares/    # Auth & Role checks
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # AI & User services
│   │   ├── utils/          # Helper functions
│── frontend/       # React UI with Vite & Tailwind
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── pages/          # Application views
│   │   ├── services/       # API calls
│   │   ├── context/        # Global state management
│   │   ├── hooks/          # Custom React hooks
│── README.md       # Documentation
```

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- OpenAI API key (for AI functionalities)

### Backend Setup

```sh
cd backend
npm install
npm run dev
```

### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### User Management

- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Chat

- `POST /chat/`- Process AI-based requests

## Environment Variables

Create a `.env` file in the backend directory with:

```env
DATABASE_URL=your_database_url
PORT=3030
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

## Deployment

### Backend

```sh
npm run build
npm start
```

### Frontend

```sh
npm run build
npm run preview
```

## Contribution

1. Fork the repo.
2. Create a feature branch (`feature-xyz`).
3. Commit your changes.
4. Push and open a pull request.

## License

This project is licensed under the MIT License.
