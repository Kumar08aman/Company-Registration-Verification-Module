# Company Registration & Verification System

A full-stack web application designed to streamline company onboarding and verification processes. The platform enables companies to register, upload verification documents, manage profiles, and securely access a protected dashboard.

---

## Features

* Secure JWT Authentication & Authorization
* Company Registration and Login
* Password Encryption using bcrypt
* Protected Routes for Authorized Access
* Company Profile Management
* Document/Image Upload with Cloudinary
* RESTful API Integration
* Responsive Dashboard UI
* Real-Time Data Fetching with React Query
* Centralized State Management using Redux Toolkit

---

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Query
* Material UI
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt.js
* Multer
* Cloudinary

---

## Project Structure

```bash id="v4xw7o"
backend/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│── server.js

frontend/
│── src/
│   ├── components/
│── public/
```

---

## Authentication Flow

1. User registers a company account
2. Password is securely hashed using bcrypt
3. JWT token is generated after login
4. Protected routes validate user authentication
5. Authorized users can manage company details and upload verification documents

---

## Installation & Setup

### Clone Repository

```bash id="w20f18"
git clone https://github.com/YOUR_USERNAME/company-registration-verification-system.git
cd company-registration-verification-system
```

---

### Backend Setup

```bash id="6c43u9"
cd backend
npm install
npm start
```

---

### Frontend Setup

```bash id="y3lh13"
cd frontend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env id="4udqlm"
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## API Endpoints

### Authentication Routes

```http id="gj9aqn"
POST /api/auth/register
POST /api/auth/login
```

### Company Routes

```http id="w78h0w"
GET    /api/company/profile
PUT    /api/company/update
POST   /api/company/upload
```

---

## Key Learnings

* Building scalable REST APIs
* Implementing secure authentication systems
* Managing application state efficiently
* Handling file uploads and cloud storage
* Structuring full-stack applications professionally
* Integrating frontend and backend services seamlessly

---

## Future Improvements

* Email Verification System
* Admin Approval Dashboard
* Role-Based Access Control
* Company Analytics
* Notification System
* Docker Deployment

---

## Author

Aman Kumar

---

## License

This project is developed for learning and portfolio purposes.
