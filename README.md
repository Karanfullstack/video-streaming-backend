# Play - (Youtube like) App Backend

This is the backend for a play application built with Node.js, Express, and MongoDB. It provides APIs for managing user authentication, video uploads, comments, likes, and subscriptions.

## Features

- User authentication (sign-up, login, and JWT-based session management)
- Video upload and retrieval
- Commenting system
- Like and dislike functionality for videos
- Video search and recommendations
- User subscriptions to channels

## Tech Stack

- **Node.js**: JavaScript runtime for the server-side application
- **Express.js**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing user data, videos, comments, etc.
- **Mongoose**: ODM for MongoDB to interact with the database
- **JWT**: JSON Web Tokens for user authentication
- **Cloudinary** (optional): For storing and serving video files
- **Bcrypt**: For password hashing
- **Mulitpart/form-data**: For handling video uploads

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or use a cloud service like MongoDB Atlas)
- Cloudinary account (optional, for video storage)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/play-backend.git
    cd play-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the following environment variables:

    ```
    MONGODB_URI=mongodb://localhost:27017/play
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_URL=your_cloudinary_url (optional)
    ```

4. Run the app locally:
    ```bash
    npm start
    ```

    This will start the backend server on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login with credentials
- **GET /api/auth/logout**: Logout user

### Users

- **GET /api/users/me**: Get current user profile
- **GET /api/users/:id**: Get a user's profile by ID
- **PUT /api/users/:id**: Update user profile

### Videos

- **POST /api/videos**: Upload a new video
- **GET /api/videos**: Get all videos
- **GET /api/videos/:id**: Get video details by ID
- **GET /api/videos/search**: Search videos by title/description

### Comments

- **POST /api/videos/:id/comments**: Post a comment on a video
- **GET /api/videos/:id/comments**: Get all comments for a video

### Likes & Dislikes

- **POST /api/videos/:id/like**: Like a video
- **POST /api/videos/:id/dislike**: Dislike a video

### Subscriptions

- **POST /api/users/:id/subscribe**: Subscribe to a channel
- **POST /api/users/:id/unsubscribe**: Unsubscribe from a channel

## Development

### Running Locally

- Install dependencies:
    ```bash
    npm install
    ```

- To start the development server with live reloading, use:
    ```bash
    npm run dev
    ```

### Testing

We recommend writing unit and integration tests to ensure the app functions as expected.

Install testing dependencies:
```bash
npm install --save-dev jest supertest
