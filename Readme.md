
# 🌱 Greener AI: AI-Powered Sustainability Platform

Greener AI is an AI-powered sustainability platform developed for the **Power Learn Project Final project**. It helps communities take effective environmental action by combining personalized AI guidance, gamified action tracking, and social sharing.

---

## ✨ Features

Greener AI focuses on making sustainable living accessible and engaging, particularly for African communities.

### 🤖 AI Chat Assistant

Provides instant, personalized sustainability advice (e.g., composting, climate-resilient farming, water conservation) using the **Google Gemini 2.5 Flash API**.

### 📝 Action Logging & Impact

Users can log green activities (planting, recycling) to earn Points and track tangible environmental impact (CO₂ saved, water conserved, trees planted).

### 🎮 Gamification

Includes **Points**, **Levels (1–10)**, and **Leaderboards** to maintain user motivation and engagement.

### 👥 Community Platform

Allows users to share tips, comment on others' posts, and celebrate collective environmental success.

### 📊 Personal Dashboard

Visualizes user progress, total points, and environmental impact metrics.

---

## 🛠️ Technology Stack

Greener AI is built as a complete **MERN-stack application** utilizing **TypeScript** for robustness.

| Component      | Technology                         | Description                                           |
| -------------- | ---------------------------------- | ----------------------------------------------------- |
| Frontend       | React 18, TypeScript, Tailwind CSS | The user interface and highly responsive design.      |
| Backend        | Node.js, Express.js, TypeScript    | REST API server handling all business logic.          |
| Database       | MongoDB (Mongoose)                 | Flexible NoSQL data storage for users, actions, tips. |
| AI Integration | Google Gemini 2.5 Flash            | Core AI engine for sustainability advice.             |
| Authentication | JWT & bcryptjs                     | Secure authentication and session management.         |

---

## 🚀 Installation & Setup

Follow these steps to get a local copy of the project running.

### **Prerequisites**

You need the following installed:

* Node.js (v16+)
* npm (v8+)
* MongoDB (Local or Atlas)
* A Gemini API Key (from Google AI Studio)
* Git

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/greener-ai.git
cd greener-ai
```

---

### **Step 2: Backend Setup**

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:3000
```

Start the server:

```bash
npm run dev
```

---

### **Step 3: Frontend Setup**

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm start
```

---

## Access Application

* **Frontend:** [http://localhost:3000](http://localhost:5731)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints Overview

### **Authentication**

| Method | Endpoint           | Auth? | Description   |
| ------ | ------------------ | ----- | ------------- |
| POST   | /api/auth/register | No    | Register user |
| POST   | /api/auth/login    | No    | Log in user   |

### **AI**

| Method | Endpoint     | Auth?    | Description            |
| ------ | ------------ | -------- | ---------------------- |
| POST   | /api/ai/chat | Optional | Chat with AI assistant |

### **Actions**

| Method | Endpoint                  | Auth? | Description                  |
| ------ | ------------------------- | ----- | ---------------------------- |
| POST   | /api/actions              | Yes   | Log new action & earn points |
| GET    | /api/actions/user/:userId | No    | Get user’s logged actions    |

### **Community Tips**

| Method | Endpoint      | Auth? | Description    |
| ------ | ------------- | ----- | -------------- |
| POST   | /api/tips     | Yes   | Create tip     |
| GET    | /api/tips/top | No    | Top liked tips |

### **Dashboard**

| Method | Endpoint                   | Auth? | Description         |
| ------ | -------------------------- | ----- | ------------------- |
| GET    | /api/dashboard/stats       | Yes   | User stats & impact |
| GET    | /api/dashboard/leaderboard | No    | Top users by points |

---

## 🤝 Contributing

We welcome contributions!
Feel free to open an issue or submit a pull request for new features, improvements, or bug fixes.





