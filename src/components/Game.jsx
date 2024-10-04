import React, { useState } from "react";
import styles from "./Game.module.css";
import { useNavigate } from "react-router-dom";
export default function Game() {

  const questions = [
    {
      question: "A young man from Bihar who tops the toughest exam in India but faces challenges on the way. Which movie am I?",
      answer: "Chhichhore",
      hints: [
        "A college drama with themes of friendship and life lessons",
        "Sushant Singh Rajput plays a father and a former engineering student",
        "Directed by Nitesh Tiwari"
      ]
    },
    {
      question: "A small-town genius who rises to fame by teaching underprivileged kids and helping them crack the IIT entrance exam. Which movie am I?",
      answer: "Super 30",
      hints: [
        "Sushant plays a brilliant mathematician inspired by a real-life figure",
        "Based on the life of Anand Kumar",
        "The story revolves around the coaching institute in Patna"
      ]
    },
    {
      question: "A story of an underdog boxer who rises to fame, despite all odds. Which movie am I?",
      answer: "Mary Kom",
      hints: [
        "Based on the real-life story of an Indian female boxer",
        "Priyanka Chopra plays the lead role",
        "It's a sports biopic",
      ],
    },
    {
      question: "A group of friends reunites at a wedding and reflects on their old relationships and lives. Which movie am I?",
      answer: "Zindagi Na Milegi Dobara",
      hints: [
        "A road trip through Spain",
        "Hrithik Roshan, Farhan Akhtar, and Abhay Deol star in the film",
        "It explores themes of friendship and self-discovery",
      ],
    },
    {
      question: "A young man from the slums becomes a millionaire by answering quiz questions. Which movie am I?",
      answer: "Slumdog Millionaire",
      hints: [
        "Dev Patel plays the lead role",
        "Directed by Danny Boyle",
        "Won multiple Oscars",
      ],
    },
    {
      question: "A man with an extraordinary memory helps the Indian cricket team in an unexpected way. Which movie am I?",
      answer: "M.S. Dhoni: The Untold Story",
      hints: [
        "A biopic of one of India's greatest cricket captains",
        "Sushant Singh Rajput plays the lead role",
        "It showcases the rise of a small-town boy to the Indian cricket team",
      ],
    },
    {
      question: "A man falls in love with a woman but hides his identity, leading to chaos and confusion. Which movie am I?",
      answer: "Rab Ne Bana Di Jodi",
      hints: [
        "Shahrukh Khan plays two contrasting roles",
        "It’s a story of love, disguise, and dance competitions",
        "Directed by Aditya Chopra",
      ],
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore((prevScore) => prevScore + 10);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHintIndex(0);
      setUserAnswer("");
    } else {
      // Save the final score after answering the last question
      localStorage.setItem("score", score + 1); // Store final score
      localStorage.setItem("user", "Player"); // Store user name (or replace with actual username)
      setGameOver(true); // End the game
      navigate("/greet"); // Navigate to the GreetingCard component
    }
  };

  const showNextHint = () => {
    if (hintIndex < questions[currentQuestion].hints.length - 1) {
      setHintIndex(hintIndex + 1);
    } else {
      setHintIndex(0);
    }
  };

  if (gameOver) {
    return (
      <div className={styles.card}>
        <h2 className={styles.question}>Game Over!</h2>
        <p className={styles.score}>Your final score: {score}</p>
      </div>
    );
  }

  return (
    <div className={styles.game}>
    <div className={styles.card}>
      <h2 className={styles.questionHead}>Dumb_Charades Game</h2>
      <p className={styles.question}>
        Question {currentQuestion + 1}: {questions[currentQuestion].question}
      </p>
      <p className={styles.hint}>
        Hint: {questions[currentQuestion].hints[hintIndex]}
      </p>
      <button className={styles.button} onClick={showNextHint}>
        Show Next Hint
      </button>

      <div>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Submit Answer
        </button>
      </div>

      <p className={styles.score}>Your Score: {score}</p>
    </div>
    </div>
  );
}