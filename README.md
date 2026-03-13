# YouTube Clone - MERN Stack

A comprehensive, full-stack video-sharing platform inspired by YouTube, built using the **MERN** (MongoDB, Express, React, Node.js) stack. This project demonstrates a complete implementation of user authentication, video management, interactive features, and a responsive UI.

## 🚀 Project Overview

The **YouTube Clone** is designed to provide a seamless video-watching and sharing experience. Users can browse videos by categories, search for specific content, interact with videos through likes and comments, and manage their own channels.

### � Live Demo
Watch the project in action: [Video Demo](https://drive.google.com/file/d/16rVQJ4LGVQl7EginwWwJ8aM6I1zs8hvO/view?usp=sharing)

### �🛠 Tech Stack

- **Frontend:** React, React Router, Axios, CSS Modules / Vanilla CSS.
- **Backend:** Node.js, Express.js (ES Modules).
- **Database:** MongoDB Atlas (with GridFS for video storage if applicable).
- **Authentication:** JSON Web Tokens (JWT).
- **Version Control:** Git.

---

## ✨ Feature Breakdown

### 🏠 Home Page
- **Dynamic Header:** Includes a search bar and a hamburger menu to toggle the sidebar.
- **Static Sidebar:** Easy navigation to different sections.
- **Category Filters:** At least 6 category buttons (e.g., Music, Gaming, Tech) to filter the video grid instantly.
- **Responsive Video Grid:** Displays video thumbnails in an optimized layout for all devices.

### 📺 Video Cards
- High-quality **Thumbnails**.
- Clear **Video Title** and **Channel Name**.
- Real-time **View Counts** tracking.

### 🔐 User Authentication
- **Registration & Login:** Secure access using Username, Email, and Password.
- **JWT Protection:** Secure token-based authentication for sensitive actions.
- **Smart Redirection:** 
  - If a user tries to Sign Up but an account already exists, the app automatically switches to **Sign In**.
  - If a user tries to Sign In but no account is found, the app prompts for **Sign Up**.
- **Protected Routes:** Only authenticated users can access features like uploading videos or managing their channel.

### 🔍 Search & Filters
- **Global Search:** Find videos by their title using the search bar in the header.
- **Category-Based Filtering:** quickly narrow down videos based on specific genres or topics.

### 🎥 Video Player Page
- **Interactive Player:** High-quality video playback.
- **Engagement Tools:** Like and Dislike buttons to reflect user sentiment.
- **Comment Section:** Full **CRUD** operations—Add, Edit, and Delete comments to foster community interaction.

### 📽 Channel Management & Uploads
- **Create Your Channel:** Set up a personalized space for your content.
- **Video Ownership Logic:** Users can strictly **Delete** or **Update** only the videos belonging to their own channel.
- **Video Management:** Full **CRUD** operations for your own videos:
  - **Create:** Upload new videos using GridFS for efficient storage.
  - **Read:** View your uploaded content in a dedicated channel view.
  - **Update:** Edit video details (Option in the "more" icon).
  - **Delete:** Remove videos from your channel (Option in the "more" icon).

### 📱 Responsiveness
- Optimized for **Mobile**, **Tablet**, and **Desktop** screens to ensure a consistent experience across all devices.

---

## ⚙ Technical Setup

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **MongoDB Atlas** account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/youtube-clone.git
   cd youtube-clone
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup:**
   ```bash
   cd ../backend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `/backend` directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Running the Application

This project uses **ES Modules** (`import`/`export`).

1. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```

The application should now be running at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).

---

## 📂 Folder Structure

### Frontend (`/frontend`)
```text
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components (Sidebar, VideoCard, etc.)
├── config/          # API and global configurations
├── data/            # Mock data or constants
├── redux/           # State management (if applicable)
├── service/         # API service calls (Axios instances)
├── utils/           # Helper functions
├── App.jsx          # Main App routing and layout
└── main.jsx         # Entry point
```

### Backend (`/backend`)
```text
backend/
├── config/          # Database and GridFS configurations
├── controllers/     # Request handlers (logic)
├── middlewares/     # Auth and error handling middlewares
├── models/          # Mongoose schemas (User, Video)
├── routers/         # API route definitions
├── db.js            # Database connection logic
└── server.js        # Main server entry point
```

---

## 📜 License
This project is licensed under the MIT License.
`