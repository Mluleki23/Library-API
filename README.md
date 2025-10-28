<img src="https://socialify.git.ci/Mluleki23/Library-API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Library-API" width="640" height="320" />
Here’s a **concise README.md** you can include in your `Library-API` project 👇

---

# 📚 Library API

A simple **RESTful API** built with **TypeScript** and **Express** for managing a library system with **Authors** and **Books**.
Supports CRUD operations, validation, and error handling.

---

## 🚀 Project Overview

The Library API allows librarians to:

* Add and manage **authors** and **books**
* Search, update, or delete book records
* Validate entries (e.g., ensure each book has a valid author)

---

## ⚙️ Tech Stack

* **Node.js + Express (v5)**
* **TypeScript**
* **ts-node / nodemon**
* **express-validator**

---

## 🧩 Features

### Authors

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/authors`           | Create new author       |
| GET    | `/authors`           | List all authors        |
| GET    | `/authors/:id`       | Get author by ID        |
| PUT    | `/authors/:id`       | Update author           |
| DELETE | `/authors/:id`       | Delete author           |
| GET    | `/authors/:id/books` | List books by an author |

### Books

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | `/books`     | Create new book |
| GET    | `/books`     | List all books  |
| GET    | `/books/:id` | Get book by ID  |
| PUT    | `/books/:id` | Update book     |
| DELETE | `/books/:id` | Delete book     |

---

## 🧠 Middleware

* **Logger** – logs request method & URL
* **Validation** – checks required fields
* **Error Handling** – handles invalid data, not found, and duplicates

---

## 🏗️ Setup & Run

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

---

## 🧪 Testing

Use **Postman** or **Thunder Client** to test all endpoints.
Document responses in your project README or Postman collection.

---

