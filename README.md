# 🏙️ CivicFix AI
### Smart Civic Issue Reporting & Intelligent Resolution Platform

<p align="center">
  <strong>Transforming civic problem reporting into a smarter, faster and more transparent digital experience.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Java-Backend-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-Framework-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Full--Stack-Development-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/REST_API-Integration-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Authentication-JWT-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active_Development-brightgreen?style=flat-square" />
</p>

---

## 🌐 Overview

**CivicFix AI** is a full-stack civic technology platform designed to modernize how citizens report, monitor and manage public infrastructure issues.

From damaged roads and water leakage to waste management and other community concerns, the platform provides a centralized digital environment for reporting civic problems and tracking their resolution.

By connecting citizens and administrators through a structured complaint management system, CivicFix AI aims to promote transparency, accountability and efficient public service management.

**Our Vision:** Building smarter communities through accessible technology and intelligent civic management.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | User registration and login with JWT-based authentication |
| 📝 Complaint Management | Submit and manage civic complaints through a digital platform |
| 📊 Complaint Tracking | Monitor complaint progress and resolution status |
| 👥 Role-Based Access | Separate access for citizens and administrators |
| 🛠️ Admin Management | Review, manage and update submitted complaints |
| 🔄 Status Updates | Maintain structured complaint resolution workflows |
| ⚡ REST API Integration | Seamless communication between frontend and backend |
| 🐳 Docker Support | Containerization support for deployment and development |

---

## 🖥️ Technology Stack

### Frontend
- React.js
- JavaScript
- CSS3
- Vite

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- RESTful APIs
- Maven

### Database & Infrastructure
- SQL database configuration
- Database schema management
- Docker
- Docker Compose
- Git & GitHub

---

## 🏗️ System Architecture

CivicFix AI follows a modular full-stack architecture that separates the user interface, business logic, security and data management layers.

```text
             ┌─────────────────────────┐
             │       CITIZEN           │
             │      ADMIN USER         │
             └────────────┬────────────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │    REACT FRONTEND       │
             │       + VITE            │
             └────────────┬────────────┘
                          │
                    REST API
                          │
                          ▼
             ┌─────────────────────────┐
             │   SPRING BOOT BACKEND  │
             │                         │
             │  Authentication        │
             │  Complaint Management  │
             │  Business Logic        │
             │  Security & JWT        │
             └────────────┬────────────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │     DATABASE LAYER      │
             │  Persistent Data Store  │
             └─────────────────────────┘
```

---

## 📂 Project Structure

```text
CivicFix-AI/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/civicfix/ai/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── database/
│   └── schema.sql
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Java JDK
- Node.js and npm
- Git
- Docker Desktop (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/anuprabha743-cell/CivicFix-AI.git
```

```bash
cd CivicFix-AI
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Configure the database connection and application properties in:

```text
src/main/resources/application.properties
```

Make sure the required database is running and configured according to your project settings.

### 3. Start the Backend Server

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The Spring Boot application will start using its configured server port.

### 4. Start the Frontend

Open a new terminal from the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the localhost URL displayed in your terminal to access the application.

---

## 🔒 Security & Authentication

Security is an important part of CivicFix AI.

The backend includes:

- JWT-based authentication.
- Spring Security integration.
- Role-based authorization.
- Protected application endpoints.
- Structured authentication and request handling.

---

## 📸 Application Preview

Screenshots of the application will be added here.

| Application Interface | Preview |
|---|---|
| Home Page | Coming Soon |
| Citizen Dashboard | Coming Soon |
| Complaint Submission | Coming Soon |
| Admin Dashboard | Coming Soon |

---

## 🚀 Future Enhancements

The project is designed with opportunities for further development:

- 🤖 AI-powered civic complaint classification.
- 🎯 Intelligent complaint priority prediction.
- 📍 GPS-based issue reporting and location mapping.
- 🖼️ Image-based civic issue recognition.
- 🔔 Real-time complaint notifications.
- 📈 Analytics and insights dashboard.
- 🗺️ Interactive civic issue visualization.
- ☁️ Cloud deployment and scalable infrastructure.

---

## 🎯 Project Goals

- Digitize traditional civic complaint reporting.
- Improve transparency in public issue management.
- Simplify communication between citizens and administrators.
- Enable structured tracking of civic complaints.
- Build a scalable and maintainable civic technology solution.

---

## 👩‍💻 Developer

### Anu Prabha R

**Computer Science and Engineering Student | Full-Stack Developer | AI Enthusiast**

Passionate about building practical software solutions using modern web technologies, backend engineering and artificial intelligence.

<p>
  <a href="https://github.com/anuprabha743-cell">
    <img src="https://img.shields.io/badge/GitHub-Anu%20Prabha-181717?style=for-the-badge&logo=github" />
  </a>
</p>

**Repository:** [CivicFix AI](https://github.com/anuprabha743-cell/CivicFix-AI) 

---

<p align="center">
  <strong>🏙️ CivicFix AI — Empowering Communities Through Technology.</strong>
  <br/>
  <i>Innovate. Connect. Resolve.</i>
</p>
