# Play-Video-Stream Backend

A robust, scalable backend API for the Play-Video-Stream platform built with Node.js, Express, and MongoDB. This backend provides comprehensive video streaming, user management, and content delivery services.

## 🚀 Features

### Core API Features
- **User Authentication & Authorization**: JWT-based secure authentication system
- **Video Management**: Upload, store, and stream video content
- **User Profiles**: Complete user profile management with avatars and cover images
- **File Upload**: Secure file upload with Cloudinary integration
- **Content Delivery**: Efficient video streaming and thumbnail generation
- **Database Management**: MongoDB with Mongoose ODM

### Security Features
- **Password Hashing**: Bcrypt-based password encryption
- **JWT Tokens**: Access and refresh token management
- **CORS Configuration**: Cross-origin resource sharing setup
- **Input Validation**: Request validation and sanitization
- **Rate Limiting**: API request throttling

### Performance Features
- **Static File Serving**: Efficient public file delivery
- **Database Indexing**: Optimized MongoDB queries
- **File Compression**: Large file handling capabilities
- **Caching**: Response caching for improved performance

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB with Mongoose 8.8.4
- **Authentication**: JWT 9.0.2 + Bcrypt 2.4.3
- **File Storage**: Cloudinary 2.5.1
- **File Upload**: Multer 1.4.5
- **Development**: Nodemon 3.1.7
- **Code Quality**: Prettier 3.4.2

## 📁 Project Structure

```
src/
├── app.js                 # Main Express application
├── server.js             # Server entry point
├── config/               # Configuration files
│   └── index.js         # Environment and app config
├── controllers/          # Request handlers
│   ├── auth.controller.js    # Authentication logic
│   ├── user.controller.js    # User management
│   └── video.controller.js   # Video operations
├── models/               # Database models
│   ├── user.model.js     # User schema and methods
│   └── video.model.js    # Video schema
├── routes/               # API route definitions
│   ├── auth.routes.js    # Authentication endpoints
│   ├── user.routes.js    # User management endpoints
│   └── vidoe.routes.js   # Video endpoints
├── middlewares/          # Custom middleware
│   ├── authenticate.js   # JWT authentication
│   └── upload.middleware.js # File upload handling
├── db/                   # Database connection
│   └── dbConnection.js   # MongoDB connection setup
├── utils/                # Utility functions
│   ├── ApiError.js       # Custom error handling
│   ├── asyncHandler.js   # Async error wrapper
│   ├── cloudinary.js     # Cloudinary configuration
│   └── generateTokens.js # JWT token generation
└── public/               # Static files
    └── temp/             # Temporary file storage
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance
- Cloudinary account
- npm or yarn

### Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/play-video-stream

# JWT Configuration
ACCESS_SECRET=your_access_secret_key
REFRESH_SECRET=your_refresh_secret_key
EXPIRY_TIME=1d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd video-streaming-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Verify server is running**
   Navigate to `http://localhost:8000` - should see "Health Check"

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh-token` - Refresh access token

### User Routes (`/api/v1/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /avatar` - Update user avatar
- `PUT /cover-image` - Update cover image

### Video Routes (`/api/v1/videos`)
- `POST /upload` - Upload new video
- `GET /all` - Get all videos
- `GET /:id` - Get video by ID
- `PUT /:id` - Update video
- `DELETE /:id` - Delete video
- `PUT /:id/thumbnail` - Update video thumbnail

## 📊 Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  firstName: String (required),
  lastName: String (required),
  avatar: { url: String, public_id: String },
  coverImage: { url: String, public_id: String },
  watchHistory: String,
  password: String (hashed, required),
  refreshToken: String
}
```

### Video Model
```javascript
{
  videoFile: { url: String, public_id: String },
  thumbnail: { url: String, public_id: String },
  owner: ObjectId (ref: User),
  title: String (required),
  description: String (required),
  duration: Number (required),
  views: Number (default: 0),
  isPublished: Boolean (default: false)
}
```

## 🔐 Authentication Flow

### Registration Process
1. User submits registration data
2. Password is hashed using bcrypt
3. User document is created in MongoDB
4. JWT tokens are generated
5. Response includes user data and tokens

### Login Process
1. User submits credentials
2. Password is verified against stored hash
3. JWT tokens are generated
4. Refresh token is stored in database
5. Access token is returned to client

### Token Management
- **Access Token**: Short-lived (1 day) for API requests
- **Refresh Token**: Long-lived for token renewal
- **Automatic Refresh**: Middleware handles token validation

## 📁 File Upload System

### Video Upload Process
1. File validation (type, size, format)
2. Upload to Cloudinary
3. Generate thumbnail
4. Store metadata in database
5. Return video information

### Supported Formats
- **Videos**: MP4, AVI, MOV, WMV
- **Images**: JPG, PNG, GIF, WebP
- **Max File Size**: 50MB (configurable)

## 🛡️ Security Features

### JWT Implementation
- Secure token generation
- Token expiration handling
- Refresh token rotation
- Secure cookie storage

### Password Security
- Bcrypt hashing (salt rounds: 10)
- Password strength validation
- Secure password comparison

### CORS Configuration
- Frontend origin restriction
- Credentials support
- Secure cookie handling

## 🚀 Performance Optimization

### Database Optimization
- Indexed fields for fast queries
- Efficient schema design
- Connection pooling
- Query optimization

### File Handling
- Stream-based file processing
- Asynchronous upload handling
- Temporary file cleanup
- CDN integration

## 🔧 Configuration

### Environment Variables
- Database connection strings
- JWT secret keys
- Cloudinary credentials
- Server ports and URLs

### CORS Settings
- Frontend URL restriction
- Credentials support
- Method restrictions
- Header permissions

## 📊 Error Handling

### Custom Error Classes
- `ApiError`: Standardized error responses
- `ValidationError`: Input validation errors
- `AuthenticationError`: Auth-related errors
- `DatabaseError`: Database operation errors

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "stack": "Error stack trace (development only)"
}
```

## 🧪 Testing

### Development Tools
- **Nodemon**: Auto-restart on file changes
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

### Testing Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

## 🚀 Deployment

### Production Build
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secrets
4. Configure CORS for production domain
5. Set up SSL certificates

### Environment Variables
- Production database URLs
- Secure JWT secrets
- Production CORS origins
- SSL configuration

## 📈 Monitoring & Logging

### Health Checks
- Database connection status
- API endpoint availability
- File storage connectivity
- Memory usage monitoring

### Error Logging
- Request/response logging
- Error stack traces
- Performance metrics
- Security event logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add comprehensive tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Open an issue in the repository
- Check the API documentation
- Review the error logs
- Contact the development team

## 🔗 Related Projects

- **Frontend**: [Play-Video-Stream Frontend](../video-streaming-frontend)
- **API Documentation**: Available at `/api/docs` (when implemented)
- **Postman Collection**: Available in the repository
