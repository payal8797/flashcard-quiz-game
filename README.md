# 🎓 Flashcard Quiz App

A beautiful and responsive quiz application built with **React**, **TypeScript**, **Ant Design**, and the [Open Trivia API](https://opentdb.com/). Users can select a quiz category, choose difficulty and number of questions, and answer multiple-choice questions one by one — with real-time feedback and a final score summary.

---

## ✨ Features

- 🧠 **Category-based quizzes** via Open Trivia DB
- 🎯 **Multiple choice questions** with correct/incorrect feedback
- 📊 **Score tracking** with results screen
- 💡 **Shuffled options** without re-randomizing on re-render
- 📱 **Responsive UI** built with Ant Design
- 🧭 **React Router navigation** with category URLs

---

## 📦 Tech Stack

- **Frontend**: React + TypeScript
- **UI**: Ant Design (antd)
- **Routing**: React Router DOM
- **Data**: Open Trivia API (`https://opentdb.com/api.php`)
- **Utilities**: Lodash (for `shuffle()`), Axios

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/flashcard-quiz-app.git
cd flashcard-quiz-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 API Used

### Open Trivia DB API:

- Categories: `https://opentdb.com/api_category.php`
- Questions:
  ```
  https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
  ```

---

## 📈 To Do / Future Features

- ✅ Review mode after quiz
- ✅ Retry same quiz
- 🔄 Save history or streaks (localStorage)
- 🎉 Confetti on high scores
- 🌙 Dark mode toggle

---

## Checkout here: https://flashcard-quiz-game.netlify.app/
