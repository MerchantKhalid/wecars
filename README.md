# 🚗 Vehicle Rental Management System – Backend

### **Node.js + Express + TypeScript + PostgreSQL (NeonDB)**

A complete backend API for managing **users, vehicles, and bookings** with authentication, authorization, and business rules.
Built fully using **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, **JWT**, and **bcrypt**.

---

## Live Site

Check out the live application here: [WeCars Live](https://wecars-luhwoen7a-merchantkhalids-projects.vercel.app/)

---

## 🔥 Features

### 🔐 **Authentication & Authorization**

* User registration & login
* Password hashing using **bcrypt**
* Secure JWT token generation
* Role-based access (Admin / Customer)

### 🚗 **Vehicle Management**

* Admin can **add, update, delete** vehicles
* Public users can **view all vehicles**
* Vehicle availability automatically updates

### 👤 **User Management**

* Admin can **view all users**
* Users can update their own profile
* Users **cannot be deleted** if they have active bookings

### 📅 **Booking System**

* Customers can create bookings
* Auto price calculation
* Vehicle auto-status update (“available” → “booked”)
* Admin can mark bookings as returned
* Vehicles **cannot be deleted** if they have active bookings

---

## 🛠 Tech Stack

| Layer     | Technology             |
| --------- | ---------------------- |
| Runtime   | Node.js + TypeScript   |
| Framework | Express.js             |
| Database  | PostgreSQL (NeonDB)    |
| Auth      | JWT + bcrypt           |
| Query     | `pg` PostgreSQL client |

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── services/
 ├── models/
 ├── db/
 └── server.ts
```

Follows **modular layered architecture**:

**Routes → Controllers → Services → DB Models**

---

## 🗄 Database Schema

### **Users**

* `id SERIAL PRIMARY KEY`
* `name VARCHAR NOT NULL`
* `email UNIQUE NOT NULL`
* `password VARCHAR NOT NULL`
* `phone VARCHAR NOT NULL`
* `role ('admin' | 'customer')`

### **Vehicles**

* `id SERIAL PRIMARY KEY`
* `vehicle_name VARCHAR NOT NULL`
* `type ('car','bike','van','SUV')`
* `registration_number UNIQUE`
* `daily_rent_price NUMERIC`
* `availability_status ('available','booked')`

### **Bookings**

* `id SERIAL PRIMARY KEY`
* `customer_id REFERENCES users(id)`
* `vehicle_id REFERENCES vehicles(id)`
* `rent_start_date DATE NOT NULL`
* `rent_end_date DATE NOT NULL`
* `total_price NUMERIC`
* `status ('active','cancelled','returned')`

---

## ⚙️ Setup Instructions

### **1. Install Dependencies**

```
npm install
```

### **2. Create `.env` File**

```
DATABASE_URL=neon_db_url
JWT_SECRET=secret_key
PORT=5000
```

### **3. Run the Development Server**

```
npm run dev
```

API will be available at:

```
http://localhost:5000
```

---

## 🔐 Authentication Endpoints

### **Register**

```
POST /api/v1/auth/signup
```

### **Login**

```
POST /api/v1/auth/signin
```

Response includes:

```
Authorization: Bearer <token>
```

Use this token for all protected routes.

---

## 🚗 Vehicle Endpoints

| Action                 | Method | Endpoint                      |
| ---------------------- | ------ | ----------------------------- |
| Add Vehicle (Admin)    | POST   | `/api/v1/vehicles`            |
| Get All Vehicles       | GET    | `/api/v1/vehicles`            |
| Get Vehicle by ID      | GET    | `/api/v1/vehicles/:vehicleId` |
| Update Vehicle (Admin) | PUT    | `/api/v1/vehicles/:vehicleId` |
| Delete Vehicle (Admin) | DELETE | `/api/v1/vehicles/:vehicleId` |

---

## 👤 User Endpoints

| Action                  | Method | Endpoint                |
| ----------------------- | ------ | ----------------------- |
| Get All Users (Admin)   | GET    | `/api/v1/users`         |
| Update User (Admin/Own) | PUT    | `/api/v1/users/:userId` |
| Delete User (Admin)     | DELETE | `/api/v1/users/:userId` |

---

## 📅 Booking Endpoints

| Action                                     | Method | Endpoint                      |
| ------------------------------------------ | ------ | ----------------------------- |
| Create Booking                             | POST   | `/api/v1/bookings`            |
| Get Bookings (Admin → all, Customer → own) | GET    | `/api/v1/bookings`            |
| Update Booking (Cancel/Return)             | PUT    | `/api/v1/bookings/:bookingId` |

---

## 🔎 Business Logic Summary

### ✔ Price Calculation

```
total_price = daily_rent_price × number_of_days
```

### ✔ Bookings

* Creating a booking → vehicle becomes **booked**
* Cancelling/returning → vehicle becomes **available**

### ✔ Restrictions

* Users **cannot be deleted** if they have active bookings
* Vehicles **cannot be deleted** if they have active bookings

---

## 🧪 Testing (Postman Guide)

1. **Signup a new user**
2. **Login** → copy JWT token
3. In Postman → set:

   ```
   Authorization → Bearer Token → paste token
   ```
4. Now test:

   * Vehicle routes
   * Booking routes
   * User admin routes

---

## ✔ Final Notes

This project follows:

* Clean & readable code
* Modular & layered structure
* Standardized JSON responses
* Full validation & security


👨‍💻 Author
Mohammad Khalid Hasan

