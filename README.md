# CivicFix AI

CivicFix AI is a full-stack civic complaint platform for reporting, categorizing,
prioritizing, and resolving city infrastructure problems.

## Features

- Citizen registration and login with Spring Security and JWT
- PostgreSQL/H2 database persistence
- Complaint categories, geolocation, photo links, and priority scoring
- Nearby duplicate detection using geographic distance
- Citizen complaint tracking
- Administrator complaint queue and status management
- Analytics summary cards
- OpenStreetMap city and complaint location views
- Docker Compose deployment

## Technology

- React 19 + Vite
- Java 21 + Spring Boot 4
- Spring Data JPA + Spring Security
- H2 for local development and PostgreSQL for production
- JWT authentication
- Docker + Docker Compose

## Run locally

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8082
- Health: http://localhost:8082/api/health

## Demo administrator

- Email: `admin@civicfix.ai`
- Password: `Admin@123`

Change the demo password and `JWT_SECRET` before deploying publicly.

## Production containers

```powershell
docker compose up --build
```
