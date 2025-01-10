`Library Management System Backend`

This is the backend of a Library Management System built using Node.js, Express, and MySQL. The backend provides API endpoints for managing books, users, and authentication.

**Features**:

User authentication (login, registration) using JWT.
Role-based access (e.g., different views for adults and kids).
CRUD operations for books and users.
File uploads for book images using multer.
MySQL database integration with mysql2.
Cross-Origin Resource Sharing (CORS) support.

**Technologies Used**:

Backend: Node.js, Express
Database: MySQL
Authentication: JWT and bcrypt
File Uploads: Multer
Environment Management: dotenv

**Getting Started**:
// Prerequisites //

Node.js installed
MySQL installed and running
A MySQL database with necessary tables

**Installation**:

1. Install Dependencies
   Open your terminal and run the following command to install the required dependencies:

npm install bcryptjs cors dotenv express jsonwebtoken multer mysql2

2. Install Dev Dependencies
   Install nodemon to automatically restart your server during development:

npm install --save-dev nodemon

**Start the server**:

node server.js

**Environment Variables**:
Create a `.env` file in the project root and add the following variables:

PORT=5000
DB_HOST=localhost
DB_USER=<your-mysql-username>
DB_PASSWORD=<your-mysql-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-secret-key>

**API Endpoints**:

User signup API curl:
POST

```
curl --location 'http://localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "Kathyi",
    "password": "password",
    "dob": "1993-04-18"
}
'

```

User Login curl:
POST

```
curl --location 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImFnZSI6MzEsImlhdCI6MTcyODc5MDI3MiwiZXhwIjoxNzI4NzkzODcyfQ.B9FBJF3MkHOSoSnu5fjp762XjiaOxFJA2KvkudffyLs' \
--data '{
    "username": "chitti",
    "password": "password"
}
'
```

Upload books:
POST

```
curl --location 'http://localhost:3000/api/books' \
--form 'title="Three Bears"' \
--form 'author="Denslow"' \
--form 'category="adult"' \
--form 'publicationYear="1903"' \
--form 'pdf=@"/Users/kathyayani/Documents/Three Bears.pdf"'

```

Get Kids Books:
GET

```
curl --location 'http://localhost:3000/api/books/kids'

```

Get Adult Books:
GET

```
curl --location 'http://localhost:3000/api/books/adult' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImFnZSI6MjMsImlhdCI6MTcyOTMyNzQ0NCwiZXhwIjoxNzI5MzMxMDQ0fQ.H8926FngzdO1Td7hutve5EUxbizzuDYQNgG4OE-mj-M'

```
