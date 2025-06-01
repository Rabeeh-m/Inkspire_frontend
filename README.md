# Inkspire Frontend

Inkspire is an online publication platform, built with React and styled with Tailwind CSS. It provides a responsive user interface for browsing, creating, and managing posts, engaging in real-time chat, and interacting with social features like following, liking, commenting, and bookmarking. The frontend communicates with the Inkspire Django backend via RESTful APIs and WebSockets for real-time functionality.

## Features
- User Authentication: Register, login, and manage profiles with JWT-based authentication and OTP verification.
- Post Management: View, create, edit, and delete posts with rich text editing (via CKEditor integration).
- Social Features: Follow/unfollow users, like/unlike posts, comment/reply, and bookmark posts with real-time notifications.
- Real-Time Chat: WebSocket-based private messaging with file upload support.
- Dashboard: Author dashboard for managing posts, comments, and notifications; admin dashboard for user and content moderation.
- Responsive Design: Mobile-friendly UI styled with Tailwind CSS.
- Payment Integration: PayPal checkout for premium subscriptions.

## Tech Stack
- Framework: React Vite
- Styling: Tailwind CSS
- API Requests: Axios
- WebSockets: JavaScript WebSocket API
- State Management: Redux

## Prerequisites
- **Node.js 16+** and npm
- **Git**


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Rabeeh-m/Inkspire_frontend.git
cd inkspire-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
VITE_API_BASE_URL=https://inkspire-hmj0.onrender.com/api
VITE_WS_BASE_URL=wss://inkspire-hmj0.onrender.com/ws
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### 4. Start the Development Server
```bash
npm run dev
```


## Contributing
- Fork the repository.
- Create a feature branch (git checkout -b feature/your-feature).
- Commit changes (git commit -m "Add your feature").
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.
