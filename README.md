# 📊 B2B Project Management Application

A **full-stack B2B project management platform** designed to help teams plan, track, and manage projects efficiently. The application enables organizations to collaborate in real time, assign tasks, monitor progress, and maintain visibility across multiple projects.

---

## 📌 Table of Contents

- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Prerequisites](#prerequisites-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Docker Support](#docker-support-)
- [Configuration](#configuration-)
- [Project Structure](#project-structure-)
- [Contact](#contact-)

---
## ✨ Features

- 🏢 **Organization & Team Management**  
  Create organizations, manage teams, and control access.

- 📁 **Project Management**  
  Create, update, and track multiple projects.

- ✅ **Task & Workflow Management**  
  Assign tasks, set priorities, deadlines, and statuses.

- 👤 **Role-Based Access Control**  
  Admin, Manager, and Member roles with permissions.

- 💬 **Real-Time Collaboration**  
  Instant updates and communication across teams.

- 📊 **Progress Tracking & Analytics**  
  Monitor project health and task completion.

- 🔐 **Secure Authentication**  
  JWT-based authentication and protected routes.

- 📱 **Responsive UI**  
  Optimized for all screen sizes.

---

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB (Mongoose)

### Authentication
- JWT

### Real-Time
- Socket.IO (if applicable)

### DevOps
- Docker
- Docker Compose

---
## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit / Zustand
- Tailwind CSS
- ShadCN UI

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB (Mongoose)

### Authentication
- Passport js 
- JWT

### DevOps
- Docker
- Docker Compose

---
## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Docker & Docker Compose (optional)

---


## 🚀 Installation

### Clone the repository
```
git clone https://github.com/viv756/B2B-project-management.git
cd B2B-project-management
```

### Install dependencies
#### Backend
```
cd backend
npm install
```

#### Frontend
```
cd frontend
npm install
```
## 💻 Usage

### Development
#### Start Backend
```
npm run dev
```
#### Start Frontend
```
npm run dev
```

### 🐳 Docker Support
The project supports Dockerized development using Docker Compose.

#### Run with Docker
```
docker-compose up --build
```

#### Stop Containers

```
docker-compose down

```
#### Services
```
| Service  | Description           | Port  |
| -------- | --------------------- | ----- |
| frontend | React application     | 3000  |
| backend  | Node.js / Express API | 5000  |
| mongodb  | MongoDB database      | 27017 |
```
## ⚙️ Configuration
Create a .env file in the root or backend directory.
### Backend .env

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

### Frontend .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```
## 📁 Project Structure

```
B2B-project-management/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── hooks/
│   └── main.jsx
├── docker-compose.yml
├── docs/
├── .env.example
├── package.json
└── README.md
```

## 📧 Contact

GitHub: https://github.com/viv756

Project Live Link:
👉 https://team-sync-nm5p.onrender.com
