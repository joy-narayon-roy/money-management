<img src="assets/banner.png" alt="Money Management Banner" width="100%" />

<div style="display:flex;align-items: center;">
  <img src="assets/logo.png" alt="Money Management Logo" width="100" />
  <h1>Money Management</h1>
</div>

**A personal finance platform for tracking income, expenses, liabilities, and net balance.**


  <br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Vite-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Go](https://img.shields.io/badge/Go-Fiber-00ADD8?style=flat-square&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-Unspecified-lightgrey?style=flat-square)


---

## Overview

**Money Management** is a full-stack personal finance application designed to give a clear, real-time picture of your financial health. It consolidates income, expenses, and liabilities into a single dashboard and computes your current balance automatically — removing the manual work of spreadsheet-based tracking.

The project is built on a strict, type-safe, and performant stack: a **React + TypeScript** frontend powered by **Vite**, and a **Go (Fiber)** backend backed by **PostgreSQL**, chosen for speed, reliability, and clean separation of concerns between client and server.

---

## Core Capabilities

| Capability             | Description                                         |
| ---------------------- | --------------------------------------------------- |
| **Income Tracking**    | Record and categorize all sources of incoming funds |
| **Expense Tracking**   | Log and organize spending across categories         |
| **Liability Tracking** | Monitor outstanding debts and financial obligations |
| **Balance Overview**   | Automatically computed, real-time current balance   |

> Additional capabilities — budgeting, analytics, and reporting — are planned. See [Roadmap](#roadmap).

---

## Architecture & Tech Stack

| Layer        | Technology                               | Purpose                                |
| ------------ | ---------------------------------------- | -------------------------------------- |
| **Frontend** | React 19 + TypeScript, bundled with Vite | Fast, type-safe, component-driven UI   |
| **Backend**  | Go + [Fiber](https://gofiber.io/)        | High-performance, low-latency REST API |
| **Database** | PostgreSQL                               | Reliable, relational data persistence  |

The client and server are fully decoupled and communicate over a REST API, allowing each to be developed, tested, and deployed independently.

---

## Project Structure

```
money-management/
├── assets/          # Logo, banner, and README media
├── client/          # React + TypeScript frontend (Vite)
└── server/          # Go Fiber backend API
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) v18 or later
- [Go](https://go.dev/) v1.21 or later
- [PostgreSQL](https://www.postgresql.org/) (local instance or remote connection)

### 1. Clone the Repository

```bash
git clone https://github.com/joy-narayon-roy/money-management.git
cd money-management
```

### 2. Configure and Run the Backend

```bash
cd server
go mod download
```

Create a `.env` file (or set environment variables) with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=money_management
```

Start the API server:

```bash
go run main.go
```

### 3. Configure and Run the Frontend

```bash
cd client
npm install
npm run dev
```

Once both services are running, the client will be available locally — check your terminal output for the exact ports.

---

## Roadmap

- [ ] Budgeting and spending limits
- [ ] Category-wise analytics and charts
- [ ] Monthly and yearly financial summaries
- [ ] Authentication and multi-user support
- [ ] Data export (CSV / PDF)

---

## Contributing

Contributions, issues, and feature requests are welcome. Please check the [issues page](https://github.com/joy-narayon-roy/money-management/issues) before opening a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## License

No license has been specified for this project yet. If you intend to accept external contributions, consider adding one — [MIT](https://choosealicense.com/licenses/mit/) is a common, permissive choice.

---

<div align="center">

**Joy Narayon Roy**
[GitHub](https://github.com/joy-narayon-roy)

</div>
