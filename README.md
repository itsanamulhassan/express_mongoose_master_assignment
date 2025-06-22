# 📚 Book Borrowing API

A RESTful API built with **Express.js**, **Mongoose**, and **TypeScript** that allows users to manage books and borrow records. Includes validation using **Zod**, error handling middleware, and MongoDB aggregation for analytics.

---

## 🚀 Features

- ✅ Add, update, retrieve, and delete books.
- ✅ Borrow books with quantity validation.
- ✅ Automatically update book availability.
- ✅ Custom error handling with consistent error formats.
- ✅ Schema validation using **Zod** before database operations.
- ✅ Aggregation to get borrowed books summary.
- ✅ Organized and modular project structure using MVC pattern.
- ✅ Fully typed with **TypeScript** for reliability and developer experience.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Zod for schema validation
- TypeScript
- ts-node-dev for development

---

## 📁 Folder Structure

src/
│
├── app/
│ ├── controllers/ # Route handlers (books, borrow)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route declarations
│ ├── middlewares/ # Custom middlewares (validation, error handling)
│ ├── utils/ # Utility functions (error handlers, formatters)
│ └── app.ts # Main Express app setup
│
├── config/ # Database config and environment variables
├── server.ts # Entry point
└── types/ # Custom type declarations (optional)

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- Node.js (>=18.x)
- MongoDB (Local or Atlas)
- npm or yarn

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-borrow-api
```

---

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- Node.js (>=18.x)
- MongoDB (Local or Atlas)
- npm or yarn

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-borrow-api
```

# Clone the repository

git clone https://github.com/your-username/book-borrow-api.git
cd book-borrow-api

# Install dependencies

npm install

# Start the server

npm run dev
🧪 API Endpoints
📘 Books
Method Endpoint Description
POST /api/books Create a new book
GET /api/books Get all books (filter + sort)
GET /api/books/:id Get a single book by ID
PUT /api/books/:id Update book details
DELETE /api/books/:id Delete a book
🔄 Borrowing
Method Endpoint Description
POST /api/borrow Borrow a book
GET /api/borrow/summary Get borrowing summary report
✅ Example Request Payload

{
"title": "The Theory of Everything",
"author": "Stephen Hawking",
"genre": "SCIENCE",
"isbn": "9780553380163",
"description": "An overview of cosmology and black holes.",
"copies": 5,
"available": true
}

🧹 Scripts
Command Description
npm run dev Run the app in dev mode
npm run build Compile TypeScript files
npm start Start compiled app
📩 Contributing

    Fork this repo

    Create your feature branch (git checkout -b feature/myFeature)

    Commit your changes (git commit -am 'Add some feature')

    Push to the branch (git push origin feature/myFeature)

    Open a pull request

📃 License

This project is licensed under the MIT License.

---

Let me know if you’d like to add environment setup for Docker, Postman collections, or Swagger documentation.
