# 🚀 Employee & Task Management API

<div align="center">

![AdonisJS](https://img.shields.io/badge/AdonisJS-v5-5A45FF?style=for-the-badge&logo=adonisjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-Programming-3178C6?style=for-the-badge&logo=typescript)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)

A complete backend CRUD application built using **AdonisJS v5** and **PostgreSQL**, covering modern backend development concepts and best practices.

</div>

---

## 📖 Project Overview

This project demonstrates the implementation of a backend REST API using **AdonisJS v5** with **PostgreSQL** as the relational database.

The application manages **Users** and **Tasks** while implementing essential backend concepts such as validation, authentication, middleware, pagination, transactions, lifecycle hooks, service layers, and database relationships.

---

## 🎯 Features

### 👤 User Management

- Create User
- Get All Users
- Get User by ID
- Update User
- Delete User

### 📋 Task Management

- Create Task
- Get All Tasks
- Get Task by ID
- Update Task
- Delete Task
- Partial Update using PATCH

### 🔐 Authentication & Authorization

- JWT Authentication
- Admin Authorization
- Protected Routes
- Custom Middleware

### ⚡ Advanced Features

- Pagination
- Service Layer Architecture
- Database Transactions
- Lifecycle Hooks
- Custom Exception Handling
- Input Validation
- Database Relationships
- SQL Joins
- Data Preloading

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| AdonisJS v5 | Backend Framework |
| PostgreSQL | Relational Database |
| TypeScript | Development Language |
| JWT | Authentication |
| Lucid ORM | Database ORM |
| Vine Validator | Request Validation |

---

# 📂 Project Structure

```bash
app
├── Controllers
├── Models
├── Validators
├── Middleware
├── Services
├── Exceptions
│
database
├── migrations
│
start
├── routes.ts
```

---

# 🗄️ Database Design

## Users Table

| Column | Type |
|----------|----------|
| id | Integer |
| name | String |
| email | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## Tasks Table

| Column | Type |
|----------|----------|
| id | Integer |
| title | String |
| description | Text |
| status | String |
| user_id | Integer |
| created_at | Timestamp |
| updated_at | Timestamp |

---

# 🔗 Relationships

### One User → Many Tasks

```ts
User.hasMany(Task)
Task.belongsTo(User)
```

Implemented using:

- Preload
- SQL Joins
- Foreign Keys

---

# 🔒 Authentication Flow

```text
Login
   ↓
Generate JWT Token
   ↓
Send Token
   ↓
Protected Routes
   ↓
Middleware Verification
```

---

# 📑 API Endpoints

## Authentication

| Method | Endpoint |
|----------|------------|
| POST | /login |

---

## Users

| Method | Endpoint |
|----------|------------|
| POST | /users |
| GET | /users |
| GET | /users/:id |
| PUT | /users/:id |
| DELETE | /users/:id |

---

## Tasks

| Method | Endpoint |
|----------|------------|
| POST | /tasks |
| GET | /tasks |
| GET | /tasks/:id |
| PUT | /tasks/:id |
| PATCH | /tasks/:id |
| DELETE | /tasks/:id |

---

# 📄 Validation

Implemented custom validators for:

- User Creation
- User Update
- Admin Login
- Task Creation

Ensures:

- Required Fields
- Correct Data Types
- Input Sanitization
- Error Handling

---

# ⚙️ Middleware

### JWT Middleware

Protects routes by verifying tokens.

### Admin Middleware

Restricts access to admin-only operations.

---

# 🔄 Transactions

Implemented database transactions to ensure:

```text
All Success
      OR
All Rollback
```

Example:

- Create User
- Create Task

If task creation fails, user creation is automatically rolled back.

---

# 🎣 Lifecycle Hooks

Implemented:

```ts
@beforeSave()
```

Use Case:

- Automatically convert email addresses to lowercase before saving.

---

# 📊 Pagination

Example:

```http
GET /users?page=1&limit=5
```

Allows efficient handling of large datasets.

---

# 🚨 Exception Handling

Custom exceptions implemented for:

- User Not Found
- Authentication Errors
- Validation Errors

Provides meaningful API responses.

---

# 🚀 What I Learned

✅ AdonisJS v5 Architecture

✅ Routing

✅ Controllers

✅ Models

✅ Lucid ORM

✅ Migrations

✅ Validators

✅ Middleware

✅ JWT Authentication

✅ Authorization

✅ Service Layers

✅ Pagination

✅ Lifecycle Hooks

✅ Database Relationships

✅ Joins & Preloads

✅ Transactions

✅ Exception Handling

✅ PostgreSQL Integration

---

# 👨‍💻 Author

### Shyamsundar S S

M.Sc Data Science  
Coimbatore Institute of Technology

- Backend Development
- Machine Learning
- PostgreSQL
- AdonisJS

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star ⭐

</div>
