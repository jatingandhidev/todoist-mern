## <img height="25" src="/client/public/todoistlogo.jpg" /> Todoist

## Description

A task management and productivity tool. Features include task creation, organization using drag-and-drop, reminders, and notifications, all built with modern technologies.

---

## Features

- User authentication and management with Google OAuth.
- Task organization with drag-and-drop functionality using React Beautiful DnD.
- Notifications and alerts with React Toastify and SweetAlert2.
- State management with Redux and Redux Thunk.
- Backend integration with Express and MongoDB.
- Responsive design and intuitive user interface.

---

## Tech Stack

### Client

- **React (18.2.0)**
- **Redux (4.0.5) & Redux Thunk (2.3.0)** for state management.
- **React Beautiful DnD (13.1.1)** for drag-and-drop functionality.
- **React Toastify (10.0.4)** and **SweetAlert2 (11.10.3)** for user notifications.
- **Axios (1.6.5)** for API requests.
- **Moment (2.30.1)** for date and time manipulation.
- **React Icons (5.0.1)** for icons.
- **@react-oauth/google (0.12.1)** for authentication.

### Server

- **Express (4.18.2)** for building the RESTful API.
- **MongoDB (8.0.4)** for database management.
- **Mongoose (8.0.4)** for MongoDB object modeling.
- **bcrypt (5.1.1)** for password hashing.
- **jsonwebtoken (9.0.2)** for user authentication.
- **dotenv (16.3.1)** for environment variable management.
- **Cors (2.8.5)** for cross-origin resource sharing.
- **Nodemon (3.0.2)** for automatic server restarting during development.

---

## Setup and Installation

### Prerequisites

- Node.js (latest stable version recommended)
- npm or yarn package manager
- MongoDB database setup

### Steps

#### Client Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jatingandhidev/Todoist.git
   cd Todoist/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the client directory.
   - Add the Google OAuth keys and other required configurations.
4. Run the development server:
   ```bash
   npm start
   ```

#### Server Setup

1. Navigate to the server directory:
   ```bash
   cd Todoist/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the server directory.
   - Add MongoDB connection string, JWT secret, and other required keys.
4. Start the server:
   ```bash
   npm start
   ```

---

## Usage

- **Development Mode:** Visit `http://localhost:3000` to view the application locally.
- **API Server:** Ensure the server is running on `http://localhost:5000`.
- **Authentication:** Uses Google OAuth for secure login.
- **Drag-and-Drop:** Organize tasks effortlessly with React Beautiful DnD.

---

## Architecture

- **Frontend:** Built with React, Redux, and supporting libraries for a modular and scalable UI.
- **Backend:** RESTful API using Express and MongoDB for robust data handling and storage.
- **Authentication:** Secured with Google OAuth and JWT.

## Screenshots/Demo

_(Include screenshots or a link to a live demo if available)_

---

## Contributing

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your message here'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

# Contact

- Email: yourname@example.com
- GitHub: @yourusername

# References

- **React OAuth Integration:** https://react-oauth.dev
- **React Beautiful DnD Documentation:** https://react-beautiful-dnd.netlify.app
- **Express & MongoDB Integration:** https://mongoosejs.com/docs

