# 📚 Book Review Hub - Frontend

![React](https://img.shields.io/badge/React-19%2E0%2E0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2E7%2E2-blue)
![Vite](https://img.shields.io/badge/Vite-6%2E3%2E1-ff69b4)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4%2E1%2E5-06b6d4)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This is the frontend for **Book Review Hub**, a modern and responsive web application where users can review, rate, and explore books.

It is built with scalability and maintainability in mind using React + TypeScript + Vite + TailwindCSS.

---

## 🗂️ Table of Contents

- [📚 Book Review Hub - Frontend](#-book-review-hub---frontend)
  - [🗂️ Table of Contents](#️-table-of-contents)
  - [🚀 Features](#-features)
  - [🧱 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
  - [⚙️ Setup \& Installation](#️-setup--installation)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
  - [▶️ Run the Application](#️-run-the-application)
  - [📋 Planned Features (under evaluation)](#-planned-features-under-evaluation)
  - [🧩 Features Implemented at MVP Stage](#-features-implemented-at-mvp-stage)
  - [📄 License](#-license)

---

## 🚀 Features

* ✅ Authentication (login, register)
* ✅ Browse and search books
* ✅ Submit and view reviews
* ✅ Responsive and mobile-friendly layout
* ✅ API integration with secure token handling

---

## 🧱 Tech Stack

| Purpose          | Technology                |
| ---------------- | ------------------------- |
| UI Framework     | React 19.0.0              |
| Language         | TypeScript 5.7.2          |
| Bundler/Tooling  | Vite 6.3.1                |
| Styling          | Tailwind CSS 4.1.5        |
| State Management | React Context (MVP stage) |
| Routing          | React Router DOM          |
| API Handling     | Axios                     |
| Linting          | ESLint, Prettier          |
| Deployment       | (Coming soon)             |

---

## 📂 Project Structure

```bash
bookreviewhub-frontend/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Static files (images, icons, etc.)
│   ├── components/           # Reusable components
│   ├── features/             # Feature-based folders (auth, books, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── layouts/              # Layout components
│   ├── pages/                # Top-level route components
│   ├── routes/               # Routing configuration
│   ├── services/             # API clients
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .eslintrc.cjs             # ESLint config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite config
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/tlavu2004/bookreviewhub-frontend.git
cd bookreviewhub-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

---

## ▶️ Run the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📋 Planned Features (under evaluation)

| No. | Feature Description           | Priority | Complexity |
| --- | ----------------------------- | -------- | ---------- |
| 1   | Auth token handling (JWT)     | High     | Medium     |
| 2   | Protected routes (auth guard) | High     | Medium     |
| 3   | Review voting                 | Medium   | Medium     |
| 4   | Book filters (genre, etc.)    | Medium   | Medium     |
| 5   | Pagination                    | Medium   | Easy       |
| 6   | Admin/moderator UI            | Low      | Hard       |

---

## 🧩 Features Implemented at MVP Stage

* Login / Register flow
* JWT token persistence
* Home, login, register, and dashboard pages
* Book browsing (static for now)
* Review submission (initial version)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
