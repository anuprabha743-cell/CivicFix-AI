# 🏙️ CivicFix AI
### AI-Powered Civic Issue Reporting & Resolution Platform

<p align="center">
  <b>Building smarter, safer and more responsive communities through technology.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Java-Backend-ED8B00?style=for-the-badge&logo=openjdk" />
  <img src="https://img.shields.io/badge/Spring%20Boot-Framework-6DB33F?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker" />
</p>

---

## 📌 Overview

**CivicFix AI** is a modern civic issue reporting and management platform designed to connect citizens with local authorities.

The platform provides a digital environment where citizens can report public infrastructure and community-related problems, track complaint progress, and interact with an organized complaint management system.

It aims to improve transparency, accountability and efficiency in civic issue resolution.

## ✨ Key Features

- 🔐 **User Authentication** – Secure registration and login.
- 📝 **Complaint Reporting** – Submit civic complaints through the platform.
- 📊 **Complaint Tracking** – Monitor complaint status and progress.
- 🛠️ **Admin Dashboard** – Manage and review submitted complaints.
- 🔄 **Status Management** – Organize complaints through different resolution stages.
- 🔒 **Role-Based Access** – Separate citizen and administrator permissions.
- ⚡ **REST API Integration** – Connect frontend and backend services.
- 🐳 **Docker Support** – Containerization support for deployment workflows.

## 🧰 Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, CSS |
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT |
| API | REST APIs |
| Database | SQL |
| Containerization | Docker, Docker Compose |
| Build Tool | Maven |
| Version Control | Git, GitHub |

## 🏗️ Project Architecture

```text
CivicFix-AI/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
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

## 🔄 How It Works

1. Citizens register or log in to the platform.
2. Users submit civic complaints.
3. The backend processes and stores complaint information.
4. Administrators review and manage submitted complaints.
5. Complaint statuses are updated as issues progress.
6. Citizens can track their complaints.

## ⚙️ Installation & Setup

### Prerequisites

Install the following tools:

- Java Development Kit (JDK)
- Node.js and npm
- Git
- Docker Desktop (optional)

### 1. Clone the repository

```bash
git clone https://github.com/anuprabha743-cell/CivicFix-AI.git
```

```bash
cd CivicFix-AI
```

### 2. Start the backend

```bash
cd backend
```

```bash
.\mvnw.cmd spring-boot:run
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

**Note:** Configure the database and application settings in `backend/src/main/resources/application.properties` before running the backend. Use the database configuration required by your project.

## 📸 Screenshots

Add your application screenshots here after capturing the running application.

- Home Page
- Citizen Dashboard
- Complaint Submission
- Admin Dashboard

## 🎯 Project Objectives

- Digitize civic complaint management.
- Improve communication between citizens and authorities.
- Increase transparency in complaint tracking.
- Support structured complaint resolution.
- Build a scalable full-stack civic technology solution.

## 🚀 Future Enhancements

- AI-powered complaint classification.
- Automatic complaint priority detection.
- Location-based complaint mapping.
- Image-based civic issue recognition.
- Real-time complaint notifications.
- Analytics dashboard for civic authorities.

## 👩‍💻 Developer

**Anu Prabha R**

Computer Science and Engineering Student | Full-Stack Developer | AI Enthusiast

- GitHub: https://github.com/anuprabha743-cell
- Project: https://github.com/anuprabha743-cell/CivicFix-AI

---

<p align="center">
  <b>Building technology for better communities. 💙</b>
</p>
