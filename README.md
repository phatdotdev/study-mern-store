# 🛒 MERN Store Application

A full-stack E-Commerce / Product Management application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This project demonstrates complete CRUD operations, RESTful API design, state management, and modern UI components.

---

## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Setup](#installation--setup)
- [API Endpoints](#-api-endpoints)
- [Author](#-author)

---

## ✨ Features

- 📦 **Product CRUD Operations:** Create, Read, Update, and Delete products seamlessly.
- 🎨 **Modern UI & Responsive Design:** User-friendly interface built with React and Chakra UI / Tailwind CSS.
- 🌓 **Dark / Light Mode:** Built-in theme toggling support.
- 🔄 **Global State Management:** Centralized state handling for smooth user interactions.
- 🌐 **RESTful API Backend:** Robust Node.js & Express server handling database queries.

---

## 🛠 Tech Stack

**Frontend:**
- React.js (Vite)
- Chakra UI / Tailwind CSS
- Axios / Native Fetch API
- React Router DOM

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- Dotenv (Environment configuration)

---

## 📁 Project Structure

```text
study-mern-store/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Request handlers & business logic
│   ├── models/          # Mongoose schemas (Product, etc.)
│   ├── routes/          # Express API route definitions
│   └── server.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Cards)
│   │   ├── pages/       # Application views (HomePage, CreatePage)
│   │   ├── store/       # Global state management
│   │   └── App.jsx      # Main React component
│   └── package.json
├── .env.example
├── package.json
└── README.md
