# SkillSphere LMS (MERN)

MERN-based LMS with assessments, progress tracking, badges, and certificates.

## Stack
- MongoDB, Express.js, React (Vite), Node.js
- Material UI + Tailwind for UI
- notistack + react-confetti for celebrations

## Setup
1. Server
   - Create server/.env with MONGO_URI, JWT_SECRET, PORT
   - npm install
   - npm run seed
   - npm run dev

2. Client
   - Create client/.env with VITE_API_URL
   - npm install
   - npm run dev

## Features
- JWT Auth (login/register)
- Course catalog, My Learning
- Assessments with attempt limits and lead notifications
- Progress Tracker (Beginner → Intermediate → Advanced)
- Badge Timeline (Bronze → Silver → Gold with animations + progress rings)
- Auto badges and certificates with confetti and toasts
- Admin weightage control
