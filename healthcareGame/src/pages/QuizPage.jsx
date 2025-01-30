
import React, { useState } from "react";
import Header from "../pages/Header"; // Ensure this file exists
import "../styles/QuizPage.css";

const QuizPage = () => {
  const savePoints = async (username, topic, points) => {
    const response = await fetch('http://localhost:3001/savePoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, topic, points }),
    });
  };
  
  
  const topics = [
    {
      name: "Nutrition",
      questions: [
        {
          question: "What vitamin do you get from sunlight?",
          options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"],
          correct: 1, // Index of the correct answer
        },
        {
          question: "Which nutrient is essential for building muscle?",
          options: ["Protein", "Carbohydrates", "Fat", "Vitamins"],
          correct: 0,
        },
        {
          question: "What is a good source of healthy fats?",
          options: ["Potato chips", "Avocado", "Soda", "Candy"],
          correct: 1,
        },
        {
          question: "Which of the following foods is rich in Vitamin C?",
          options: ["Oranges", "Bread", "Milk", "Rice"],
          correct: 0,
        },
        {
          question: "What is the main benefit of fiber in your diet?",
          options: ["Builds muscles", "Improves digestion", "Increases energy", "Helps with vision"],
          correct: 1,
        },

        {
          question: "Which food group is the best source of energy?",
          options: ["Proteins", "Carbohydrates", "Vitamins", "Fats"],
          correct: 1, // Index of the correct answer
        },

        {
          question: "What mineral is important for strong bones?",
          options: ["Iron", "Calcium", "Zinc", "Magnesium"],
          correct: 1, // Index of the correct answer
        },

        {
          question: "Which is considered a whole grain?",
          options: ["White bread", "Brown Rice ", "Potato Chips", "sugar"],
          correct: 1, // Index of the correct answer
        },

        {
          question: "Which of these is NOT a natural sugar source?",
          options: ["Fruits", "Honey", "Vegetable", "Candy"],
          correct: 3, // Index of the correct answer
        },

        {
          question: "What is the main benefit of drinking water during meals?",
          options: [" It builds muscle", "It aids digestion", "It increases appetite", "Vitamin K"],
          correct: 1, // Index of the correct answer
        },
      ],
    },
    {
      name: "Exercise & Fitness",
      questions: [
        {
          question: "How many minutes of exercise should adults aim for daily?",
          options: ["15 minutes", "30 minutes", "60 minutes", "90 minutes"],
          correct: 1,
        },
        {
          question: "Which activity strengthens your heart the most?",
          options: ["Cardio exercises like running or swimming", "Reading", "Watching TV", "Playing Video Games"],
          correct: 0,
        },
        {
          question: "What is the best time to stretch your muscles?",
          options: ["Before sleeping", "After a workout", "During meals", "While watching TV"],
          correct: 1,
        },
        {
          question: "What does regular physical activity help prevent?",
          options: ["Heart disease ", "Sunburn", "Food allergies", "Short-term memory loss"],
          correct: 0,
        },
        {
          question: "What type of exercise improves flexibility?",
          options: [" Yoga", "Weightlifting", "Running", "Cycling"],
          correct: 0,
        },
        {
          question: "What is the recommended amount of exercise for children daily?",
          options: ["10 minutes", "30 minutes", "60 minutes", " 90 minutes"],
          correct: 2, // Index of the correct answer
        },
        {
          question: "What type of exercise improves endurance?",
          options: ["Weightlifting", "Yoga", "Running ", "Stretching"],
          correct: 2, // Index of the correct answer
        },
        {
          question: "What is the benefit of warming up before exercise?",
          options: ["Increases muscle size", "Prevents injuries ", "Makes you tired faster", " Slows down metabolism"],
          correct: 1, // Index of the correct answer
        },
        {
          question: "What is the best way to cool down after exercising?",
          options: ["Stretching", "Drinking soda", "Sitting immediately", "Eating snacks"],
          correct: 0, // Index of the correct answer
        },
        {
          question: "Which sport is considered great for overall fitness?",
          options: ["Tennis", "chess", "Video games", "slepping"],
          correct: 0, // Index of the correct answer
        },
      ],
    },
    // Add other topics here...

    {
      name: "Sleep",
      questions: [
        {
          question: "How many hours of sleep does an adult need on average?",
          options: ["4–5 hours", "7–9 hours ", "10–12 hours", "12–14 hours"],
          correct: 1,
        },
        {
          question: "What happens if you don’t get enough sleep?",
          options: ["Increased concentration", "Mood swings ", "Better memory", "Faster healing"],
          correct: 1,
        },
        {
          question: "Which hormone regulates your sleep cycle?",
          options: ["Melatonin", "Insulin", "Dopamine", "Adrenaline"],
          correct: 0,
        },
        {
          question: "What can help you sleep better at night?",
          options: ["Drinking coffee", "Reducing screen time before bed ", "Exercising right before bed", "Eating heavy meals late at night"],
          correct: 1,
        },
        {
          question: "Which sleep stage is responsible for dreaming?",
          options: [" REM sleep", "Light sleep", "Deep sleep", "Wakefulness"],
          correct: 0,
        },
      ],
    },


    {
      name: "Mental Health",
      questions: [
        {
          question: "What is a common symptom of stress?",
          options: ["Headaches", "Clear thinking", "Increased energy", "Better digestion"],
          correct: 0,
        },
        {
          question: "What can help reduce stress?",
          options: ["Deep breathing exercises ", "Overeating ", "Avoiding exercise", "Watching TV all day"],
          correct: 0,
        },
        {
          question: "Which activity is good for mental health?",
          options: ["Meditation", " Skipping meals", "Multitasking constantly", "Oversleeping"],
          correct: 0,
        },
        {
          question: "How can you improve your mood naturally?",
          options: ["Spending time in nature", "Eating more junk food", "Staying up late", "Isolating yourself"],
          correct: 0,
        },
        {
          question: "What is an important step in dealing with anxiety?",
          options: ["Ignoring it", "Seeking help from a professional", "Overworking yourself", "Staying alone"],
          correct: 1,
        },
      ],
    },



    {
      name: "Hygiene",
      questions: [
        {
          question: "How long should you wash your hands?",
          options: ["5 seconds", "20 seconds", "1 minute", "10 minutes"],
          correct: 1,
        },
        {
          question: "How often should you brush your teeth?",
          options: ["Once a day", "Twice a day", "Every 3 days", "Only when eating sweets"],
          correct: 1,
        },
        {
          question: "What does hand sanitizer help prevent?",
          options: ["Viruses and bacteria", "Sunburn", "Headaches", "Muscle strain"],
          correct: 0,
        },
        {
          question: "How often should you replace your toothbrush?",
          options: ["Every 3–4 months", "Every year", " Once a month", "Only when it breaks"],
          correct: 0,
        },
        {
          question: "What should you do after sneezing or coughing?",
          options: ["Shake hands with someone", " Wash your hands", "Touch your face", "Ignore it"],
          correct: 1,
        },
      ],
    },


    
    
  ];

  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState(null); // Track feedback for each question
  const [showAppreciation, setShowAppreciation] = useState(false);

  const handleTopicSelection = (index) => {
    setCurrentTopicIndex(index);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setShowAppreciation(false);
  };

  const handleAnswerSelection = (index) => {
    const question = topics[currentTopicIndex].questions[currentQuestionIndex];
    setSelectedAnswer(index);

    if (index === question.correct) {
      setUserPoints((prev) => prev + 1);
      setAnswerFeedback("correct");
    } else {
      setAnswerFeedback("incorrect");
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < topics[currentTopicIndex].questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerFeedback(null);
    } else {
      setShowAppreciation(true);
      savePoints('SIVADHARANI', topics[currentTopicIndex].name, userPoints);
    }
  };

  const resetQuiz = () => {
    setCurrentTopicIndex(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setShowAppreciation(false);
  };
  

  return (
    <div>
      <div className="quiz-page">
        {currentTopicIndex === null ? (
          <div className="topic-selection">
            <h2>Select a Topic:</h2>
            {topics.map((topic, index) => (
              <button
                key={index}
                className="topic-button"
                onClick={() => handleTopicSelection(index)}
              >
                {topic.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="quiz-section">
            {!showAppreciation ? (
              <>
 <h3>{topics[currentTopicIndex].questions[currentQuestionIndex].question}</h3>
<div className="options">
    {topics[currentTopicIndex].questions[currentQuestionIndex].options.map(
        (option, index) => (
    <button
     key={index}
       className={`option-button ${
               selectedAnswer !== null
            ? index === topics[currentTopicIndex].questions[currentQuestionIndex].correct
                              ? "correct"
           : index === selectedAnswer
                              ? "incorrect"
                              : ""
                            : ""
                        }`}
                        onClick={() => handleAnswerSelection(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
                {selectedAnswer !== null && selectedAnswer !== topics[currentTopicIndex].questions[currentQuestionIndex].correct && (
                  <p className="correct-answer-note">
                    Correct Answer: {topics[currentTopicIndex].questions[currentQuestionIndex].options[topics[currentTopicIndex].questions[currentQuestionIndex].correct]}
                  </p>
                )}
                {selectedAnswer !== null && (
                  <button className="next-button" onClick={nextQuestion}>
                    Next Question
                  </button>
                )}
              </>
            ) : (
              <div className="appreciation-section">
                <h2 className="appreciation-message">Great Job!</h2>
                <p>You completed the {topics[currentTopicIndex].name} quiz.</p>
                <button className="reset-button" onClick={resetQuiz}>
                  Back to Topics
                </button>
              </div>
            )}
          </div>
        )}
        <div className="points-display">
          <h3>Total Points: {userPoints}</h3>
        </div>
      </div>
    </div>
  );
};
export default QuizPage