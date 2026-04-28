import { useEffect, useState } from "react";

const starterQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    topic: "Programming",
    level: 2,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    questions: [
      {
        text: "Which keyword is used to declare a variable in JavaScript?",
        options: ["echo", "let", "print", "define"],
        answer: "let",
      },
      {
        text: "React is mainly used for:",
        options: ["Database", "Frontend UI", "Operating System", "Networking"],
        answer: "Frontend UI",
      },
      {
        text: "Which command starts a Vite React app?",
        options: ["npm run dev", "npm start vite", "node react", "react dev"],
        answer: "npm run dev",
      },
    ],
  },
  {
    id: 2,
    title: "Science Quiz",
    topic: "Science",
    level: 3,
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    questions: [
      {
        text: "What is the chemical formula of water?",
        options: ["CO2", "O2", "H2O", "NaCl"],
        answer: "H2O",
      },
      {
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars",
      },
      {
        text: "Which organ pumps blood in the human body?",
        options: ["Brain", "Heart", "Liver", "Lung"],
        answer: "Heart",
      },
    ],
  },
  {
    id: 3,
    title: "General Knowledge",
    topic: "Culture",
    level: 1,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    questions: [
      {
        text: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7",
      },
      {
        text: "Which language is commonly used with React?",
        options: ["JavaScript", "PHP", "SQL", "C"],
        answer: "JavaScript",
      },
      {
        text: "HTML is used to create:",
        options: ["Web pages", "Databases", "Mobile networks", "Servers only"],
        answer: "Web pages",
      },
    ],
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("EN");

  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState(starterQuizzes);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);

  const translations = {
    EN: {
      home: "Home",
      login: "Login",
      register: "Register",
      logout: "Logout",
      student: "Student",
      teacher: "Teacher",
      quizzes: "Quizzes",
      createQuiz: "Create Quiz",
      heroTitle: "Gamified Quiz App for Smart Learning",
      heroText:
        "A modern MERN quiz platform for teachers and students. Create quizzes, answer questions, track scores and win badges.",
      getStarted: "Get Started",
      explore: "Explore Quizzes",
      chooseRole: "Choose your role",
      studentMode: "Student Mode",
      teacherMode: "Teacher Mode",
      startQuiz: "Start Quiz",
      favorite: "Favorite",
      score: "Score",
      recent: "Recent Quizzes",
      available: "Available Quizzes",
      submit: "Submit Quiz",
      back: "Back",
      level: "Level",
      topic: "Topic",
      question: "Question",
      addQuestion: "Add Question",
      saveQuiz: "Save Quiz",
    },
    FR: {
      home: "Accueil",
      login: "Connexion",
      register: "Inscription",
      logout: "Déconnexion",
      student: "Étudiant",
      teacher: "Enseignant",
      quizzes: "Quiz",
      createQuiz: "Créer Quiz",
      heroTitle: "Application Quiz Gamifiée pour apprendre",
      heroText:
        "Une plateforme MERN moderne pour enseignants et étudiants. Créer des quiz, répondre, suivre les scores et gagner des badges.",
      getStarted: "Commencer",
      explore: "Voir les Quiz",
      chooseRole: "Choisir votre rôle",
      studentMode: "Mode Étudiant",
      teacherMode: "Mode Enseignant",
      startQuiz: "Commencer Quiz",
      favorite: "Favori",
      score: "Score",
      recent: "Quiz récents",
      available: "Quiz disponibles",
      submit: "Envoyer",
      back: "Retour",
      level: "Niveau",
      topic: "Thème",
      question: "Question",
      addQuestion: "Ajouter Question",
      saveQuiz: "Enregistrer Quiz",
    },
  };

  const t = translations[lang];

  const loginAs = (role) => {
    setUser({
      name: role === "teacher" ? "Teacher Demo" : "Student Demo",
      role,
    });
    setPage(role);
  };

  const logout = () => {
    setUser(null);
    setPage("home");
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setPage("passQuiz");
  };

  const finishQuiz = (result) => {
    setLastScore(result);
    setRecent([result.quiz, ...recent.filter((q) => q.id !== result.quiz.id)]);
    setPage("score");
  };

  const toggleFavorite = (quiz) => {
    const exists = favorites.some((q) => q.id === quiz.id);

    if (exists) {
      setFavorites(favorites.filter((q) => q.id !== quiz.id));
    } else {
      setFavorites([quiz, ...favorites]);
    }
  };

  const createQuiz = (quiz) => {
    setQuizzes([quiz, ...quizzes]);
    setPage("teacher");
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <Navbar
        t={t}
        user={user}
        page={page}
        setPage={setPage}
        logout={logout}
        dark={dark}
        setDark={setDark}
        lang={lang}
        setLang={setLang}
      />

      {page === "home" && <Home t={t} setPage={setPage} loginAs={loginAs} />}

      {page === "login" && <AuthPage t={t} type="login" loginAs={loginAs} />}

      {page === "register" && (
        <AuthPage t={t} type="register" loginAs={loginAs} />
      )}

      {page === "student" && (
        <StudentDashboard
          t={t}
          user={user}
          quizzes={quizzes}
          favorites={favorites}
          recent={recent}
          startQuiz={startQuiz}
          toggleFavorite={toggleFavorite}
          setPage={setPage}
        />
      )}

      {page === "teacher" && (
        <TeacherDashboard t={t} quizzes={quizzes} setPage={setPage} />
      )}

      {page === "quizzes" && (
        <QuizList
          t={t}
          quizzes={quizzes}
          favorites={favorites}
          startQuiz={startQuiz}
          toggleFavorite={toggleFavorite}
        />
      )}

      {page === "createQuiz" && <CreateQuiz t={t} createQuiz={createQuiz} />}

      {page === "passQuiz" && activeQuiz && (
        <PassQuiz
          t={t}
          quiz={activeQuiz}
          finishQuiz={finishQuiz}
          setPage={setPage}
        />
      )}

      {page === "score" && <ScorePage t={t} result={lastScore} setPage={setPage} />}

      <Footer />
    </div>
  );
}

function Navbar({
  t,
  user,
  page,
  setPage,
  logout,
  dark,
  setDark,
  lang,
  setLang,
}) {
  return (
    <header className="navbar">
      <button className="logo" onClick={() => setPage("home")}>
        <span>Quiz</span>App
      </button>

      <nav>
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          {t.home}
        </button>

        {user?.role === "student" && (
          <>
            <button onClick={() => setPage("student")}>{t.student}</button>
            <button onClick={() => setPage("quizzes")}>{t.quizzes}</button>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <button onClick={() => setPage("teacher")}>{t.teacher}</button>
            <button onClick={() => setPage("createQuiz")}>
              {t.createQuiz}
            </button>
          </>
        )}

        {!user && (
          <>
            <button onClick={() => setPage("login")}>{t.login}</button>
            <button className="nav-primary" onClick={() => setPage("register")}>
              {t.register}
            </button>
          </>
        )}

        {user && (
          <button className="danger" onClick={logout}>
            {t.logout}
          </button>
        )}

        <button onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>

        <button onClick={() => setLang(lang === "EN" ? "FR" : "EN")}>
          {lang}
        </button>
      </nav>
    </header>
  );
}

function Home({ t, setPage, loginAs }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <span className="badge">MERN Stack Hackathon</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="hero-actions">
            <button className="btn primary" onClick={() => setPage("register")}>
              {t.getStarted}
            </button>
            <button className="btn secondary" onClick={() => setPage("quizzes")}>
              {t.explore}
            </button>
          </div>
        </div>

        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
            alt="Students learning"
          />
        </div>
      </section>

      <section className="section">
        <h2>{t.chooseRole}</h2>

        <div className="role-grid">
          <div className="role-card">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
              alt="Student mode"
            />
            <div>
              <h3>🧑‍🎓 {t.studentMode}</h3>
              <p>
                List quizzes, pass quiz, use timer, view scores, recent quizzes
                and favorites.
              </p>
              <button className="btn primary" onClick={() => loginAs("student")}>
                Login Student
              </button>
            </div>
          </div>

          <div className="role-card">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
              alt="Teacher mode"
            />
            <div>
              <h3>👨‍🏫 {t.teacherMode}</h3>
              <p>
                Create quizzes, add questions, choose topics and define
                complexity level.
              </p>
              <button className="btn primary" onClick={() => loginAs("teacher")}>
                Login Teacher
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section colored">
        <h2>Hackathon Features</h2>

        <div className="feature-grid">
          <Feature icon="🔐" title="Authentication" text="Login, register and user roles." />
          <Feature icon="🏆" title="Gamification" text="Scores, badges and leaderboard." />
          <Feature icon="📊" title="Analytics" text="Results dashboard and progress tracking." />
          <Feature icon="📱" title="Responsive UI" text="Mobile friendly design." />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function AuthPage({ t, type, loginAs }) {
  const isLogin = type === "login";

  return (
    <section className="auth-page">
      <div className="auth-box">
        <h2>{isLogin ? t.login : t.register}</h2>
        <p>
          {isLogin
            ? "Welcome back to QuizApp"
            : "Create your learning account"}
        </p>

        {!isLogin && <input placeholder="Full name" />}
        <input placeholder="Email address" />
        <input placeholder="Password" type="password" />

        {!isLogin && (
          <select>
            <option>student</option>
            <option>teacher</option>
          </select>
        )}

        <div className="two-buttons">
          <button className="btn primary" onClick={() => loginAs("student")}>
            Student
          </button>
          <button className="btn secondary" onClick={() => loginAs("teacher")}>
            Teacher
          </button>
        </div>

        <small>
          Demo mode: choose Student or Teacher to continue the hackathon
          presentation.
        </small>
      </div>
    </section>
  );
}

function StudentDashboard({
  t,
  user,
  quizzes,
  favorites,
  recent,
  startQuiz,
  toggleFavorite,
  setPage,
}) {
  return (
    <section className="dashboard">
      <div className="dashboard-hero student-bg">
        <div>
          <span className="badge light-badge">Student Space</span>
          <h1>Hello, {user?.name || "Student"}</h1>
          <p>Choose a quiz, answer questions and improve your score.</p>
          <button className="btn primary" onClick={() => setPage("quizzes")}>
            {t.explore}
          </button>
        </div>
      </div>

      <Stats />

      <h2>{t.available}</h2>

      <QuizCards
        quizzes={quizzes}
        favorites={favorites}
        startQuiz={startQuiz}
        toggleFavorite={toggleFavorite}
        t={t}
      />

      <h2>{t.recent}</h2>
      <SmallList items={recent} empty="No recent quizzes yet." />
    </section>
  );
}

function TeacherDashboard({ t, quizzes, setPage }) {
  return (
    <section className="dashboard">
      <div className="dashboard-hero teacher-bg">
        <div>
          <span className="badge light-badge">Teacher Space</span>
          <h1>Teacher Dashboard</h1>
          <p>Create quizzes, manage questions and prepare learning content.</p>
          <button className="btn primary" onClick={() => setPage("createQuiz")}>
            {t.createQuiz}
          </button>
        </div>
      </div>

      <div className="teacher-panel">
        <div>
          <h2>{t.quizzes}</h2>
          <p>Total quizzes: {quizzes.length}</p>
        </div>

        <button className="btn primary" onClick={() => setPage("createQuiz")}>
          + {t.createQuiz}
        </button>
      </div>

      <div className="table">
        {quizzes.map((quiz) => (
          <div className="table-row" key={quiz.id}>
            <strong>{quiz.title}</strong>
            <span>{quiz.topic}</span>
            <span>Level {quiz.level}</span>
            <span>{quiz.questions.length} Questions</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div className="stats">
      <div>
        <h3>12</h3>
        <p>Completed</p>
      </div>
      <div>
        <h3>85%</h3>
        <p>Best Score</p>
      </div>
      <div>
        <h3>4</h3>
        <p>Badges</p>
      </div>
      <div>
        <h3>#2</h3>
        <p>Rank</p>
      </div>
    </div>
  );
}

function QuizList({ t, quizzes, favorites, startQuiz, toggleFavorite }) {
  return (
    <section className="dashboard">
      <div className="page-title">
        <h1>{t.available}</h1>
        <p>Choose a topic and start your quiz challenge.</p>
      </div>

      <QuizCards
        quizzes={quizzes}
        favorites={favorites}
        startQuiz={startQuiz}
        toggleFavorite={toggleFavorite}
        t={t}
      />
    </section>
  );
}

function QuizCards({ quizzes, favorites, startQuiz, toggleFavorite, t }) {
  return (
    <div className="quiz-grid">
      {quizzes.map((quiz) => {
        const isFavorite = favorites.some((q) => q.id === quiz.id);

        return (
          <article className="quiz-card" key={quiz.id}>
            <img src={quiz.image} alt={quiz.title} />

            <div className="quiz-body">
              <div className="quiz-meta">
                <span>
                  {t.topic}: {quiz.topic}
                </span>
                <span>
                  {t.level}: {quiz.level}
                </span>
              </div>

              <h3>{quiz.title}</h3>
              <p>{quiz.questions.length} questions • Timer enabled • Score tracking</p>

              <div className="card-actions">
                <button className="btn primary" onClick={() => startQuiz(quiz)}>
                  {t.startQuiz}
                </button>
                <button className="icon-btn" onClick={() => toggleFavorite(quiz)}>
                  {isFavorite ? "⭐" : "☆"}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function SmallList({ items, empty }) {
  if (!items.length) return <p className="empty">{empty}</p>;

  return (
    <div className="small-list">
      {items.map((item) => (
        <div key={item.id}>
          <strong>{item.title}</strong>
          <span>{item.topic}</span>
        </div>
      ))}
    </div>
  );
}

function CreateQuiz({ t, createQuiz }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Programming");
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const copy = [...questions];
    copy[index][field] = value;
    setQuestions(copy);
  };

  const updateOption = (qIndex, optionIndex, value) => {
    const copy = [...questions];
    copy[qIndex].options[optionIndex] = value;
    setQuestions(copy);
  };

  const submit = (e) => {
    e.preventDefault();

    const quiz = {
      id: Date.now(),
      title,
      topic,
      level,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
      questions,
    };

    createQuiz(quiz);
  };

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h1>{t.createQuiz}</h1>
        <p>Create a complete quiz with questions and complexity level.</p>

        <label>Quiz title</label>
        <input
          required
          placeholder="Example: React Basics"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Topic</label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Programming</option>
          <option>Science</option>
          <option>Math</option>
          <option>History</option>
          <option>Culture</option>
        </select>

        <label>Question complexity: {level}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />

        {questions.map((q, qIndex) => (
          <div className="question-builder" key={qIndex}>
            <h3>
              {t.question} {qIndex + 1}
            </h3>

            <input
              required
              placeholder="Question text"
              value={q.text}
              onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
            />

            {q.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                required
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  updateOption(qIndex, optionIndex, e.target.value)
                }
              />
            ))}

            <input
              required
              placeholder="Correct answer"
              value={q.answer}
              onChange={(e) => updateQuestion(qIndex, "answer", e.target.value)}
            />
          </div>
        ))}

        <button type="button" className="btn secondary" onClick={addQuestion}>
          + {t.addQuestion}
        </button>

        <button className="btn primary" type="submit">
          {t.saveQuiz}
        </button>
      </form>
    </section>
  );
}

function PassQuiz({ t, quiz, finishQuiz, setPage }) {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((old) => Math.max(0, old - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const submit = (e) => {
    e.preventDefault();

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) score++;
    });

    finishQuiz({
      quiz,
      score,
      total: quiz.questions.length,
    });
  };

  return (
    <section className="form-page">
      <form className="quiz-pass" onSubmit={submit}>
        <div className="quiz-top">
          <div>
            <h1>{quiz.title}</h1>
            <p>
              {quiz.topic} • Level {quiz.level}
            </p>
          </div>

          <div className="timer">⏱ {timeLeft}s</div>
        </div>

        {quiz.questions.map((q, index) => (
          <div className="question-card" key={index}>
            <h3>
              {index + 1}. {q.text}
            </h3>

            {q.options.map((option) => (
              <label className="option" key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  required
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [index]: option,
                    })
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ))}

        <div className="two-buttons">
          <button
            type="button"
            className="btn secondary"
            onClick={() => setPage("quizzes")}
          >
            {t.back}
          </button>

          <button className="btn primary" type="submit">
            {t.submit}
          </button>
        </div>
      </form>
    </section>
  );
}

function ScorePage({ t, result, setPage }) {
  const percentage = result ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <section className="score-page">
      <div className="score-card">
        <h1>🎉 Quiz Completed</h1>

        <div className="circle">
          <span>{percentage}%</span>
        </div>

        <h2>
          {t.score}: {result?.score || 0} / {result?.total || 0}
        </h2>

        <p>
          {percentage >= 80
            ? "Excellent! You earned the Gold Badge."
            : percentage >= 50
            ? "Good job! Keep practicing."
            : "Try again and improve your result."}
        </p>

        <div className="badges">
          <span> Fast Learner</span>
          <span> Quiz Player</span>
          <span> Active Student</span>
        </div>

        <button className="btn primary" onClick={() => setPage("quizzes")}>
          Back to Quizzes
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 QuizApp Hackathon — MERN Stack, Scrum/Jira Educational Project</p>
    </footer>
  );
}

export default App;