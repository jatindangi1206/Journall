# Design Journalist

A modern content management system for writers and journalists.

## Technologies Used

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Prerequisites

1. Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. MongoDB Community Edition - [installation guide](https://www.mongodb.com/docs/manual/administration/install-community/)

## Installation & Setup

### 1. Start MongoDB

```sh
# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

### 2. Backend Setup

```sh
# Navigate to backend directory
cd design-journalist-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env if needed (default values should work for local development)
```

### 3. Frontend Setup

```sh
# Navigate to frontend directory
cd design-journalist

# Install dependencies
npm install
```

## Running the Application

For the application to work properly, you need to start both the backend and frontend servers in the correct order:

### 1. Start the Backend Server

```sh
# In the design-journalist-backend directory
npm run dev

# The server will start on http://localhost:3000
# You should see: "Server is running on port 3000" and "Connected to MongoDB"
```

### 2. Start the Frontend Development Server

```sh
# In the design-journalist directory
npm run dev

# The frontend will start on http://localhost:8080
# It will also be available on your local network IPs
```

## Accessing the Application

Once both servers are running, you can access the application through:

- Local: http://localhost:8080
- Network: The URLs shown in your terminal (e.g., http://192.168.1.x:8080)

## Development Notes

- The backend API runs on port 3000 and provides RESTful endpoints for article management
- Articles are stored in MongoDB under the 'design-journalist' database
- Frontend automatically connects to the backend API
- Any changes to the frontend code will trigger hot-reload
- Backend uses nodemon for automatic restarts when files change

## Common Issues

1. If you see a blank page, ensure:
   - Both backend and frontend servers are running
   - MongoDB service is running
   - Check the browser console for any errors

2. If ports are already in use:
   - Backend: Edit PORT in .env file
   - Frontend: Vite will automatically try the next available port

## API Endpoints

- GET /api/articles - Get all articles
- GET /api/articles/:id - Get single article
- POST /api/articles - Create article
- PUT /api/articles/:id - Update article
- DELETE /api/articles/:id - Delete article
- GET /api/articles/status/published - Get published articles
- GET /api/articles/status/drafts - Get draft articles
