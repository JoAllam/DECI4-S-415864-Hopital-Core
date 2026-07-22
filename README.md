# Hospital Core

## Overview
Hospital Core is a full-stack hospital management platform developed as a mono-repository. It demonstrates a modern healthcare application using React, Express, MongoDB, Docker, Kubernetes, CI/CD automation, cloud deployment, and automated testing.

---

# Features

- React Single Page Application (SPA)
- Doctor Dashboard
- Patient Management (CRUD)
- Appointment Booking Microservice
- MongoDB / MongoDB Atlas
- Docker & Docker Compose
- Kubernetes (Deployments, Services, Ingress, HPA)
- GitHub Actions CI Pipeline
- Lighthouse CI
- Semantic Versioning & CHANGELOG
- Jest Tests
- Playwright End-to-End Tests
- Netlify + Vercel Production Deployment

---

# Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MongoDB / MongoDB Atlas |
| Microservice | Appointment Service |
| Containers | Docker |
| Orchestration | Docker Compose, Kubernetes (Minikube) |
| Testing | Jest, Playwright |
| CI/CD | GitHub Actions |
| Deployment | Netlify, Vercel |

---

# Repository Structure

```text
.
├── backend/
├── frontend/
├── infra/
│   └── k8s/
├── microservices/
│   └── appointment-service/
├── tests/
│   └── e2e/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

---

# System Architecture

```text
                   Internet
                       │
                Netlify Frontend
                       │
          ┌────────────┴────────────┐
          │                         │
 Backend API (Vercel)     Appointment Service
          │                         │
          └────────────┬────────────┘
                       │
                 MongoDB Atlas
```

---

# Docker Architecture

```text
+---------------------------------------------------+
| Docker Compose                                    |
|                                                   |
|  +-----------+      +----------------------+      |
|  | Frontend  | ---> | Backend API         |      |
|  +-----------+      +----------------------+      |
|         \                 |                      |
|          \                |                      |
|           \      +----------------------+        |
|            ----> | Appointment Service  |        |
|                  +----------------------+        |
|                          |                       |
|                  +----------------------+        |
|                  | MongoDB Container    |        |
|                  +----------------------+        |
+---------------------------------------------------+
```

---

# Kubernetes Architecture

```text
                    Ingress
                       │
          ┌────────────┴────────────┐
          │                         │
   Frontend Service         Backend Service
                                    │
                         HPA + ReplicaSet
                                    │
                         Appointment Service
                                    │
                           MongoDB Service
```

---

# Conceptual VPC Blueprint

```text
Internet
    │
Public Subnet
 └── Netlify Frontend
        │ HTTPS
Private Application Layer
 ├── Backend API
 ├── Appointment Service
 └── Kubernetes Cluster
        │
Private Data Layer
 └── MongoDB Atlas
```

---

# Data Flow

```text
User
 ↓
React SPA
 ↓
REST API
 ↓
Express Controllers
 ↓
MongoDB
 ↓
JSON Response
 ↓
React UI Update
```

---

# Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital
```

## Frontend

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APPOINTMENT_API_URL=http://localhost:5001/api/appointments
```

## Appointment Service

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/hospital
```

---

# Local Setup

```bash
git clone https://github.com/JoAllam/DECI4-S-415864-Hospital-Core.git
cd Hospital-Core
npm install
```

Run backend

```bash
cd backend
npm install
npm start
```

Run frontend

```bash
cd frontend
npm install
npm start
```

Run appointment service

```bash
cd microservices/appointment-service
npm install
npm start
```

---

# Docker

```bash
docker compose up --build
```

---

# Kubernetes

Deploy

```bash
kubectl apply -f infra/k8s/
```

Verify

```bash
kubectl get pods
kubectl get services
kubectl get ingress
kubectl get hpa
```

---

# Database Seeding

```bash
cd backend
npm run seed
```

---

# REST API

## Patients

| Method | Endpoint |
|--------|----------|
| GET | /api/patients |
| POST | /api/patients |
| GET | /api/patients/:id |
| PUT | /api/patients/:id |
| DELETE | /api/patients/:id |

### Sample Request

```json
{
  "fullName":"John Doe",
  "phone":"01012345678",
  "email":"john@example.com"
}
```

### Sample Response

```json
{
  "_id":"...",
  "fullName":"John Doe"
}
```

---

## Appointments

| Method | Endpoint |
|--------|----------|
| GET | /api/appointments |
| POST | /api/appointments |

### Sample Request

```json
{
  "patientName":"John Doe",
  "doctor":"Dr. Ahmed",
  "date":"2026-07-26",
  "time":"10:00"
}
```

### Sample Response

```json
{
  "_id":"...",
  "status":"Scheduled"
}
```

---

# Testing

Backend

```bash
cd backend
npm test
```

Appointment Service

```bash
cd microservices/appointment-service
npm test
```

End-to-End

```bash
npx playwright test
```

---

# CI/CD

The GitHub Actions workflow automatically:

- Installs dependencies
- Runs backend tests
- Runs appointment-service tests
- Builds the React application
- Executes Playwright E2E tests
- Runs Lighthouse CI
- Publishes semantic releases after successful validation

---

# Production Deployment

Frontend

https://hospital-core-deci.netlify.app/

Backend API

https://deci-4-s-415864-hopital-core-backen.vercel.app/api/patients

Appointment API

https://deci-4-s-415864-hopital-core-appoin.vercel.app/api/appointments

---

# Data Model

## Patient

- firstName
- lastName
- gender
- dateOfBirth
- phone
- email
- address
- bloodType
- emergencyContact
- status

## Medical Record

- patientId
- diagnosis
- medication
- labResult
- notes
- doctor
- createdAt

## Appointment

- patientId
- doctor
- date
- time
- status

---

# License

Educational project developed for the DECI Hospital Core assignment.
