# Financial Analytics Dashboard

## Overview

Financial Analytics Dashboard is a full-stack web application that helps users manage and analyze their financial transactions. Users can register, log in securely, add transactions, view transaction history, delete transactions, and export transaction data in CSV format.

---

## Features

* User Registration and Login
* JWT Authentication
* Protected Routes
* Add Transactions
* View Transactions
* Delete Transactions
* CSV Export Functionality
* Analytics Dashboard
* Responsive User Interface

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

```text
financial-dashboard/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.ts
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Tejashree-coder/Financial-Analytics-Dashboard.git
cd Financial-Analytics-Dashboard
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Authentication

The application uses JWT (JSON Web Token) authentication.

After successful login, a token is generated and must be included in the Authorization header for protected routes.

Example:

```http
Authorization: Bearer <jwt_token>
```

---

# API Documentation

## Base URL

```text
http://localhost:5000/api
```

---

## Authentication Routes

### Register User

**POST** `/auth/register`

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "_____________"
}
```

Success Response:

```json
{
  "message": "User registered successfully",
  "user": {}
}
```

---

### Login User

**POST** `/auth/login`

Request Body:

```json
{
  "email": "john@example.com",
  "password": "_________"
}
```

Success Response:

```json
{
  "message": "Login Successful",
  "token": "jwt_token"
}
```

---

### User Profile

**GET** `/auth/profile`

Protected Route

Headers:

```http
Authorization: Bearer <jwt_token>
```

Response:

```json
{
  "message": "Welcome User"
}
```

---

## Transaction Routes

### Add Transaction

**POST** `/transactions`

Protected Route

Request Body Example:

```json
{
  "title": "Salary",
  "category": "Income",
  "amount": 50000,
  "status": "Completed"
}
```

Response:

```json
{
  "_id": "...",
  "title": "Salary",
  "category": "Income",
  "amount": 50000,
  "status": "Completed"
}
```

---

### Get All Transactions

**GET** `/transactions`

Protected Route

Response:

```json
[
  {
    "_id": "...",
    "title": "Salary",
    "category": "Income",
    "amount": 50000,
    "status": "Completed"
  }
]
```

---

### Delete Transaction

**DELETE** `/transactions/:id`

Protected Route

Response:

```json
{
  "message": "Deleted"
}
```

---

### Export Transactions as CSV

**GET** `/transactions/export/csv`

Protected Route

Downloads a CSV file containing all user transactions.

Response Type:

```text
transactions.csv
```

CSV Format:

```csv
Title,Category,Amount,Status
Salary,Income,50000,Completed
Groceries,Expense,2000,Completed
```

---

## CSV Export Headers

The exported CSV file contains the following headers:

| Header   | Description          |
| -------- | -------------------- |
| Title    | Transaction title    |
| Category | Transaction category |
| Amount   | Transaction amount   |
| Status   | Transaction status   |

Example:

```csv
Title,Category,Amount,Status
Salary,Income,50000,Completed
Food,Expense,1200,Completed
Rent,Expense,10000,Pending
```

---

## Future Enhancements

* Edit Transaction
* Monthly Reports
* Charts and Graph Analytics
* Pagination
* Advanced Filters
* PDF Export
* User Profile Management

---

## Author

Tejashree Bhoi

GitHub: https://github.com/Tejashree-coder
