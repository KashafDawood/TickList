Sure! Here's a detailed documentation for your Project Management System:

---

# Project Management System Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Socket.IO Integration](#socketio-integration)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction
The Project Management System is designed to facilitate project and task management with real-time updates and notifications. It supports user authentication, project creation, task assignments, and role management, making it a comprehensive tool for team collaboration.

## Features
- **User Authentication:** Secure login and registration.
- **Project Management:** Create, update, and manage projects.
- **Task Management:** Assign and track tasks within projects.
- **Real-Time Notifications:** Instant updates using Socket.IO.
- **Invitation System:** Invite users to join projects and manage their roles.
- **Role Management:** Different roles for project managers and members.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Real-Time Communication:** Socket.IO

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/KashafDawood/Project-Management-System.git
   cd Project-Management-System
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE=mongodb://localhost:27017/project-management
   DATABASE_PASSWORD=your_password
   PORT=3000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ```

4. **Run the Server:**
   ```bash
   npm start
   ```

## Usage
1. **Register a new user** and log in.
2. **Create a project** and assign tasks to project members.
3. **Invite users** to join projects and manage their roles.
4. **Receive real-time notifications** about project updates.

## API Endpoints

### User Routes
- **POST /api/v1/users/signup:** Register a new user.
- **POST /api/v1/users/login:** Log in an existing user.
- **GET /api/v1/users/logout:** Log out the current user.

### Project Routes
- **POST /api/v1/projects:** Create a new project.
- **GET /api/v1/projects:** Get all projects.
- **GET /api/v1/projects/:id:** Get a single project by ID.
- **PATCH /api/v1/projects/:id:** Update a project by ID.
- **DELETE /api/v1/projects/:id:** Delete a project by ID.

### Task Routes
- **POST /api/v1/tasks:** Create a new task.
- **GET /api/v1/tasks:** Get all tasks.
- **GET /api/v1/tasks/:id:** Get a single task by ID.
- **PATCH /api/v1/tasks/:id:** Update a task by ID.
- **DELETE /api/v1/tasks/:id:** Delete a task by ID.

### Notification Routes
- **POST /api/v1/notifications/inviteUserToProject:** Invite a user to a project.
- **PATCH /api/v1/notifications/respondToInvitation:** Respond to a project invitation.

## Socket.IO Integration
The application uses Socket.IO for real-time notifications. Users receive instant updates about project activities and task assignments.

### Socket Events
- **connection:** Establish a new WebSocket connection.
- **join:** Join a room based on user ID.
- **notification:** Receive real-time notifications.
- **disconnect:** Handle user disconnection.

## Project Structure
```
Project-Management-System/
├── controllers/
│   ├── authController.js
│   ├── notificationController.js
│   ├── projectController.js
│   └── taskController.js
├── models/
│   ├── notificationModel.js
│   ├── projectModel.js
│   ├── taskModel.js
│   └── userModel.js
├── routes/
│   ├── notificationRoutes.js
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── app.js
├── server.js
└── .env
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
