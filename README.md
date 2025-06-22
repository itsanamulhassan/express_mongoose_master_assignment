# 📚 Library Management API

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
│ ├── middlewares/ # Custom middlewares (validation, error handling)  
│ ├── models/ # Mongoose schemas  
│ ├── routes/ # API route declarations  
│ ├── schemas/ #Zod schemas for validation  
│ └── types/ # Custom type declarations  
│ ├── utils/ # Utility functions (error handlers, formatters)  
├── server.ts # Entry point  
└── app.ts # Main Express app setup

---

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- Node.js (>=22.25.0)
- MongoDB (Local or Atlas)
- npm

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=8888
DB_URL=http://localhost:8888/api/books
```

---

# Clone the repository

git clone https://github.com/itsanamulhassan/express_mongoose_master_assignment
cd library_management_app

# Install dependencies

npm install

# Start the server

npm run dev
🧪 API Endpoints
📘 Books
Method Endpoint Description
POST /api/books Create a new book
GET /api/books Get all books (filter + sort)
GET /api/books/:bookId Get a single book by ID
PUT /api/books/:bookId Update book details
DELETE /api/books/:bookId Delete a book

🔄 Borrowing
Method Endpoint Description
POST /api/borrow Borrow a book
GET /api/borrow Get borrowing summary report

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
