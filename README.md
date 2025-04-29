# Quiz App Hackathon

Welcome to the Hackathon project! Our goal is to build a simple, fun, and educational **gamified quiz app** using **MERN** (MongoDB, Express, React, Node) Stack.


## 🎯 Educational Purpose

This project was developed as part of a 5-hour educational hackathon to simulate real-world product development using **Scrum/Jira** and agile practices.
It is designed to synthesize what we learned throughout the year.


## 🚀 Tech Stack

- **Frontend**: React
- **Backend**: Node.js / Express / MongoDB


## Project Structure

<pre lang="markdown">
quiz-app-hackathon/
├── frontend/
│   ├── package.json
│   ├── src/
│   └── public/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── controllers/
│   ├── routes/
│   └── models/
├── README.md
└── LICENSE
</pre>

## 📌 Product Backlog

Below are the major epics that define the core features of this open source quiz app.

### 1. 👥 User Authentication
- Sign up / Log in
- Cookie Management / Token Refresh
- Different roles (e.g., Teacher, Student)

### 2. 🧑‍🎓 Student mode
- List quizzes (as topics)
- Pass a quiz (timer, score...)
- List recent quizzes
- List favorite quizzes

### 3. 👨‍🏫 Teacher mode
- List quizzes (as topics)
- Create, edit and delete quizzes
- Create, edit and delete questions
- Question types: single/multi choice, Fill blank...
- Question complexity: 1-5
- Manage classes

### 4. 🏆 Gamification & Scoring
- Track scores
- Display leaderboards
- Award badges / achievements

### 5. 🔒 Security
- Private routing
- Input validation to prevent Injections (XSS, SQL Injection...)
- Prevent Session Hijacking...

### 6. 📊 Analytics & Feedback
- Quiz results dashboard
- Identify most failed questions
- Provide answer explanations

### 7. 📱 UI/UX & Accessibility
- Mobile-friendly design (responsive)
- Dark mode
- Language


## 📄 License

This project is licensed under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

You are free to use, modify, and distribute this code, provided that any modified files remain under the MPL-2.0 license. For full details, see the [LICENSE](LICENSE) file in this repository.
