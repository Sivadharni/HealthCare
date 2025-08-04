
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";

const QuizPage = () => {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Topics array with all 20 topics and 20 questions each
  const topics = [
    {
      name: "Nutrition Basics",
      icon: "🥗",
      color: "#28a745",
      questions: [
        { question: "What vitamin do you get from sunlight?", options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"], correct: 1 },
        { question: "Which nutrient is essential for building muscle?", options: ["Protein", "Carbohydrates", "Fat", "Vitamins"], correct: 0 },
        { question: "What is a good source of healthy fats?", options: ["Potato chips", "Avocado", "Soda", "Candy"], correct: 1 },
        { question: "Which food is rich in Vitamin C?", options: ["Oranges", "Bread", "Milk", "Rice"], correct: 0 },
        { question: "What is the main benefit of fiber?", options: ["Builds muscles", "Improves digestion", "Increases energy", "Helps vision"], correct: 1 },
        { question: "Which food group provides energy?", options: ["Proteins", "Carbohydrates", "Vitamins", "Fats"], correct: 1 },
        { question: "What mineral strengthens bones?", options: ["Iron", "Calcium", "Zinc", "Magnesium"], correct: 1 },
        { question: "Which is a whole grain?", options: ["White bread", "Brown rice", "Potato chips", "Sugar"], correct: 1 },
        { question: "What is NOT a natural sugar?", options: ["Fruits", "Honey", "Vegetables", "Candy"], correct: 3 },
        { question: "Why drink water with meals?", options: ["Builds muscle", "Aids digestion", "Increases appetite", "Tastes good"], correct: 1 },
        { question: "Which vitamin helps with vision?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correct: 0 },
        { question: "What is a complete protein?", options: ["Rice", "Chicken", "Apple", "Bread"], correct: 1 },
        { question: "Which food is high in iron?", options: ["Spinach", "Banana", "Orange", "Milk"], correct: 0 },
        { question: "What does protein do?", options: ["Provides energy", "Builds muscle", "Improves vision", "Helps sleep"], correct: 1 },
        { question: "Which is a healthy snack?", options: ["Chips", "Nuts", "Candy", "Soda"], correct: 1 },
        { question: "What vitamin helps blood clotting?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], correct: 3 },
        { question: "Which food is high in potassium?", options: ["Banana", "Apple", "Bread", "Rice"], correct: 0 },
        { question: "What does fiber prevent?", options: ["Constipation", "Headaches", "Colds", "Insomnia"], correct: 0 },
        { question: "Which is a good source of omega-3?", options: ["Salmon", "Chicken", "Beef", "Pork"], correct: 0 },
        { question: "What vitamin helps immune system?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "All of these"], correct: 3 }
      ]
    },
    {
      name: "Mental Health",
      icon: "🧠",
      color: "#6f42c1",
      questions: [
        { question: "What is a good way to reduce stress?", options: ["Deep breathing", "Eating junk food", "Staying up late", "Avoiding people"], correct: 0 },
        { question: "How much sleep do adults need?", options: ["4-5 hours", "7-9 hours", "10-12 hours", "2-3 hours"], correct: 1 },
        { question: "What activity improves mental health?", options: ["Meditation", "Avoiding sunlight", "Staying indoors", "Watching TV"], correct: 0 },
        { question: "What is mindfulness?", options: ["Being present", "Forgetting everything", "Daydreaming", "Sleeping"], correct: 0 },
        { question: "Which is a sign of good mental health?", options: ["Feeling happy most days", "Never feeling sad", "Avoiding problems", "Ignoring emotions"], correct: 0 },
        { question: "What helps with anxiety?", options: ["Regular exercise", "Avoiding social situations", "Staying in bed", "Eating junk food"], correct: 0 },
        { question: "How can you improve mood?", options: ["Spending time with friends", "Isolating yourself", "Avoiding sunlight", "Staying up late"], correct: 0 },
        { question: "What is healthy coping?", options: ["Talking to someone", "Keeping everything inside", "Getting angry", "Ignoring feelings"], correct: 0 },
        { question: "Which promotes relaxation?", options: ["Reading a book", "Arguing", "Scary movies", "Social media"], correct: 0 },
        { question: "What is important for emotional well-being?", options: ["Self-care", "Being perfect", "Ignoring needs", "Pleasing everyone"], correct: 0 },
        { question: "What is depression?", options: ["A mental health condition", "A physical illness", "A type of food", "A weather condition"], correct: 0 },
        { question: "How can you help someone with mental health issues?", options: ["Listen without judgment", "Tell them to get over it", "Ignore them", "Make fun of them"], correct: 0 },
        { question: "What is a panic attack?", options: ["Sudden intense fear", "A type of exercise", "A food allergy", "A sleep disorder"], correct: 0 },
        { question: "Which is a healthy way to express emotions?", options: ["Writing in a journal", "Breaking things", "Yelling at others", "Keeping quiet"], correct: 0 },
        { question: "What is therapy?", options: ["Professional mental health support", "A type of medicine", "A form of exercise", "A diet plan"], correct: 0 },
        { question: "How can you reduce stress at work?", options: ["Take breaks", "Work longer hours", "Skip lunch", "Avoid colleagues"], correct: 0 },
        { question: "What is positive thinking?", options: ["Focusing on good things", "Ignoring problems", "Being unrealistic", "Avoiding reality"], correct: 0 },
        { question: "Which helps with sleep?", options: ["Regular bedtime", "Using phone in bed", "Drinking coffee", "Watching TV"], correct: 0 },
        { question: "What is self-esteem?", options: ["How you feel about yourself", "Your physical strength", "Your intelligence", "Your wealth"], correct: 0 },
        { question: "How can you build confidence?", options: ["Setting small goals", "Avoiding challenges", "Comparing to others", "Staying home"], correct: 0 }
      ]
    },
    {
      name: "Physical Fitness",
      icon: "💪",
      color: "#ffc107",
      questions: [
        { question: "How many minutes of exercise daily?", options: ["15 minutes", "30 minutes", "60 minutes", "90 minutes"], correct: 1 },
        { question: "Which strengthens your heart most?", options: ["Cardio exercises", "Reading", "Watching TV", "Video games"], correct: 0 },
        { question: "When is best to stretch?", options: ["Before sleeping", "After workout", "During meals", "While watching TV"], correct: 1 },
        { question: "What does exercise prevent?", options: ["Heart disease", "Sunburn", "Food allergies", "Memory loss"], correct: 0 },
        { question: "What exercise is best for flexibility?", options: ["Weight lifting", "Yoga", "Running", "Swimming"], correct: 1 },
        { question: "How often should you exercise?", options: ["Once a month", "Once a week", "3-5 times a week", "Every day for hours"], correct: 2 },
        { question: "What does strength training do?", options: ["Makes you taller", "Builds muscle", "Improves eyesight", "Makes you smarter"], correct: 1 },
        { question: "Which is a good warm-up?", options: ["Jumping jacks", "Big meal", "Watching TV", "Taking a nap"], correct: 0 },
        { question: "What if you feel pain during exercise?", options: ["Ignore it", "Stop and rest", "Exercise harder", "Take pain medication"], correct: 1 },
        { question: "Which burns most calories?", options: ["Walking slowly", "Running", "Standing", "Sitting"], correct: 1 },
        { question: "What is cardio exercise?", options: ["Heart-pumping activity", "Reading books", "Sleeping", "Eating"], correct: 0 },
        { question: "How can you stay motivated to exercise?", options: ["Find activities you enjoy", "Force yourself", "Avoid exercise", "Make excuses"], correct: 0 },
        { question: "What is a rep in exercise?", options: ["One complete movement", "A type of food", "A rest period", "A warm-up"], correct: 0 },
        { question: "What is a set in exercise?", options: ["Group of repetitions", "A type of equipment", "A rest day", "A warm-up"], correct: 0 },
        { question: "Which is NOT a benefit of exercise?", options: ["Better sleep", "More energy", "Weight gain", "Stronger heart"], correct: 2 },
        { question: "What is the FITT principle?", options: ["Exercise guidelines", "A diet plan", "A type of equipment", "A warm-up"], correct: 0 },
        { question: "How can you prevent injury?", options: ["Proper form", "Rushing through", "Skipping warm-up", "Ignoring pain"], correct: 0 },
        { question: "What is overtraining?", options: ["Exercising too much", "Not exercising", "Eating too much", "Sleeping too much"], correct: 0 },
        { question: "Which is aerobic exercise?", options: ["Running", "Weight lifting", "Stretching", "Resting"], correct: 0 },
        { question: "What is anaerobic exercise?", options: ["Short intense bursts", "Long slow activity", "Stretching", "Resting"], correct: 0 },
        { question: "How can you track progress?", options: ["Keep a log", "Ignore results", "Compare to others", "Give up"], correct: 0 }
      ]
    },
    {
      name: "Sleep Hygiene",
      icon: "😴",
      color: "#17a2b8",
      questions: [
        { question: "How many hours should adults sleep?", options: ["4-5 hours", "7-9 hours", "10-12 hours", "2-3 hours"], correct: 1 },
        { question: "What is sleep hygiene?", options: ["Good sleep habits", "Cleaning your bed", "Sleeping medicine", "A type of exercise"], correct: 0 },
        { question: "What helps you sleep better?", options: ["Regular bedtime", "Using phone in bed", "Drinking coffee", "Watching TV"], correct: 0 },
        { question: "What is insomnia?", options: ["Difficulty sleeping", "Sleeping too much", "Sleepwalking", "Snoring"], correct: 0 },
        { question: "Which helps with sleep?", options: ["Dark room", "Bright lights", "Loud noise", "Cold temperature"], correct: 0 },
        { question: "What is sleep apnea?", options: ["Breathing stops during sleep", "Sleeping too much", "Sleepwalking", "Snoring"], correct: 0 },
        { question: "How can you fall asleep faster?", options: ["Relaxation techniques", "Watching TV", "Using phone", "Drinking coffee"], correct: 0 },
        { question: "What is a sleep cycle?", options: ["Pattern of sleep stages", "A type of bed", "Sleeping medicine", "A dream"], correct: 0 },
        { question: "Which is bad for sleep?", options: ["Caffeine", "Warm milk", "Reading", "Meditation"], correct: 0 },
        { question: "What is REM sleep?", options: ["Dream sleep", "Deep sleep", "Light sleep", "No sleep"], correct: 0 },
        { question: "How can you improve sleep quality?", options: ["Exercise regularly", "Stay up late", "Eat heavy meals", "Use phone in bed"], correct: 0 },
        { question: "What is a sleep disorder?", options: ["Problem with sleep", "Sleeping too much", "Good sleep", "Normal sleep"], correct: 0 },
        { question: "Which temperature is best for sleep?", options: ["Cool", "Hot", "Very cold", "Very hot"], correct: 0 },
        { question: "What is sleep deprivation?", options: ["Not enough sleep", "Too much sleep", "Good sleep", "Normal sleep"], correct: 0 },
        { question: "How can you reset your sleep schedule?", options: ["Gradual changes", "Staying up all night", "Drinking coffee", "Watching TV"], correct: 0 },
        { question: "What is a sleep diary?", options: ["Record of sleep patterns", "A type of bed", "Sleeping medicine", "A dream journal"], correct: 0 },
        { question: "Which helps with jet lag?", options: ["Gradual adjustment", "Staying up late", "Drinking alcohol", "Eating heavy meals"], correct: 0 },
        { question: "What is sleep paralysis?", options: ["Can't move when waking", "Sleeping too much", "Sleepwalking", "Snoring"], correct: 0 },
        { question: "How can you create a bedtime routine?", options: ["Consistent activities", "Random activities", "Staying up late", "Using phone"], correct: 0 },
        { question: "What is the best sleep position?", options: ["Comfortable position", "Only on back", "Only on stomach", "Only on side"], correct: 0 }
      ]
    },
    {
      name: "Cardiovascular Health",
      icon: "❤️",
      color: "#dc3545",
      questions: [
        { question: "What is the heart's main function?", options: ["Pump blood", "Think", "Digest food", "Breathe"], correct: 0 },
        { question: "What is blood pressure?", options: ["Force of blood on arteries", "Heart rate", "Blood type", "Blood volume"], correct: 0 },
        { question: "What is a normal blood pressure?", options: ["120/80", "200/100", "80/60", "150/90"], correct: 0 },
        { question: "What is a heart attack?", options: ["Blocked blood flow to heart", "Fast heartbeat", "Slow heartbeat", "Heart murmur"], correct: 0 },
        { question: "What is cholesterol?", options: ["Fat in blood", "Sugar in blood", "Protein in blood", "Water in blood"], correct: 0 },
        { question: "What is good cholesterol called?", options: ["HDL", "LDL", "VLDL", "IDL"], correct: 0 },
        { question: "What is bad cholesterol called?", options: ["LDL", "HDL", "VLDL", "IDL"], correct: 0 },
        { question: "What is a stroke?", options: ["Blocked blood flow to brain", "Heart attack", "Blood clot", "High blood pressure"], correct: 0 },
        { question: "What is arrhythmia?", options: ["Irregular heartbeat", "Fast heartbeat", "Slow heartbeat", "Normal heartbeat"], correct: 0 },
        { question: "What is atherosclerosis?", options: ["Hardening of arteries", "Heart attack", "Stroke", "High blood pressure"], correct: 0 },
        { question: "What is the normal heart rate?", options: ["60-100 beats per minute", "20-40 beats per minute", "120-160 beats per minute", "40-60 beats per minute"], correct: 0 },
        { question: "What is a pacemaker?", options: ["Device to regulate heartbeat", "Heart medicine", "Heart surgery", "Heart test"], correct: 0 },
        { question: "What is angina?", options: ["Chest pain", "Heart attack", "Stroke", "High blood pressure"], correct: 0 },
        { question: "What is heart failure?", options: ["Heart can't pump enough blood", "Heart attack", "Stroke", "High blood pressure"], correct: 0 },
        { question: "What is a heart murmur?", options: ["Abnormal heart sound", "Heart attack", "Stroke", "High blood pressure"], correct: 0 },
        { question: "What is an EKG?", options: ["Heart electrical test", "Heart surgery", "Heart medicine", "Heart exercise"], correct: 0 },
        { question: "What is a stent?", options: ["Device to open arteries", "Heart medicine", "Heart surgery", "Heart test"], correct: 0 },
        { question: "What is bypass surgery?", options: ["Heart blood vessel surgery", "Heart medicine", "Heart test", "Heart exercise"], correct: 0 },
        { question: "What is a heart transplant?", options: ["New heart surgery", "Heart medicine", "Heart test", "Heart exercise"], correct: 0 },
                 { question: "What is CPR?", options: ["Emergency heart procedure", "Heart medicine", "Heart surgery", "Heart test"], correct: 0 }
       ]
     },
     {
       name: "Respiratory System",
       icon: "🫁",
       color: "#20c997",
       questions: [
         { question: "What is the main function of lungs?", options: ["Breathe oxygen", "Pump blood", "Digest food", "Think"], correct: 0 },
         { question: "What is asthma?", options: ["Lung airway disease", "Heart disease", "Stomach problem", "Skin condition"], correct: 0 },
         { question: "What is COPD?", options: ["Chronic lung disease", "Heart disease", "Diabetes", "Arthritis"], correct: 0 },
         { question: "What is pneumonia?", options: ["Lung infection", "Heart attack", "Stomach virus", "Skin rash"], correct: 0 },
         { question: "What is bronchitis?", options: ["Airway inflammation", "Heart problem", "Stomach ache", "Headache"], correct: 0 },
         { question: "What is emphysema?", options: ["Lung damage", "Heart disease", "Liver problem", "Kidney disease"], correct: 0 },
         { question: "What is a pulmonary embolism?", options: ["Blood clot in lung", "Heart attack", "Stroke", "Kidney stone"], correct: 0 },
         { question: "What is pleurisy?", options: ["Lung lining inflammation", "Heart problem", "Stomach ache", "Headache"], correct: 0 },
         { question: "What is tuberculosis?", options: ["Bacterial lung infection", "Heart disease", "Diabetes", "Cancer"], correct: 0 },
         { question: "What is cystic fibrosis?", options: ["Genetic lung disease", "Heart disease", "Diabetes", "Arthritis"], correct: 0 },
         { question: "What is sleep apnea?", options: ["Breathing stops during sleep", "Heart disease", "Diabetes", "Arthritis"], correct: 0 },
         { question: "What is a lung transplant?", options: ["New lung surgery", "Heart surgery", "Kidney surgery", "Liver surgery"], correct: 0 },
         { question: "What is a chest X-ray?", options: ["Lung imaging test", "Heart test", "Blood test", "Urine test"], correct: 0 },
         { question: "What is a spirometry test?", options: ["Lung function test", "Heart test", "Blood test", "Urine test"], correct: 0 },
         { question: "What is oxygen therapy?", options: ["Extra oxygen treatment", "Heart medicine", "Diabetes medicine", "Pain medicine"], correct: 0 },
         { question: "What is a ventilator?", options: ["Breathing machine", "Heart machine", "Kidney machine", "Liver machine"], correct: 0 },
         { question: "What is pulmonary rehabilitation?", options: ["Lung exercise program", "Heart exercise", "Diet program", "Meditation"], correct: 0 },
         { question: "What is a pulmonary function test?", options: ["Lung capacity test", "Heart test", "Blood test", "Urine test"], correct: 0 },
         { question: "What is a bronchoscopy?", options: ["Lung airway exam", "Heart exam", "Stomach exam", "Brain exam"], correct: 0 },
         { question: "What is a thoracentesis?", options: ["Lung fluid removal", "Heart procedure", "Kidney procedure", "Liver procedure"], correct: 0 }
       ]
     },
     {
       name: "Digestive Health",
       icon: "🩺",
       color: "#fd7e14",
       questions: [
         { question: "What is the main function of stomach?", options: ["Digest food", "Pump blood", "Breathe", "Think"], correct: 0 },
         { question: "What is acid reflux?", options: ["Stomach acid backflow", "Heart disease", "Lung problem", "Brain issue"], correct: 0 },
         { question: "What is gastritis?", options: ["Stomach inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is an ulcer?", options: ["Stomach sore", "Heart sore", "Lung sore", "Brain sore"], correct: 0 },
         { question: "What is irritable bowel syndrome?", options: ["Digestive disorder", "Heart disorder", "Lung disorder", "Brain disorder"], correct: 0 },
         { question: "What is celiac disease?", options: ["Gluten intolerance", "Lactose intolerance", "Sugar intolerance", "Fat intolerance"], correct: 0 },
         { question: "What is Crohn's disease?", options: ["Inflammatory bowel disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is colitis?", options: ["Colon inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is diverticulitis?", options: ["Colon pouch inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is appendicitis?", options: ["Appendix inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is gallstones?", options: ["Gallbladder stones", "Kidney stones", "Liver stones", "Heart stones"], correct: 0 },
         { question: "What is pancreatitis?", options: ["Pancreas inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is hepatitis?", options: ["Liver inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is cirrhosis?", options: ["Liver scarring", "Heart scarring", "Lung scarring", "Brain scarring"], correct: 0 },
         { question: "What is a colonoscopy?", options: ["Colon exam", "Heart exam", "Lung exam", "Brain exam"], correct: 0 },
         { question: "What is an endoscopy?", options: ["Digestive tract exam", "Heart exam", "Lung exam", "Brain exam"], correct: 0 },
         { question: "What is a barium swallow?", options: ["Digestive X-ray test", "Heart test", "Lung test", "Brain test"], correct: 0 },
         { question: "What is a liver biopsy?", options: ["Liver tissue sample", "Heart sample", "Lung sample", "Brain sample"], correct: 0 },
         { question: "What is a cholecystectomy?", options: ["Gallbladder removal", "Heart removal", "Lung removal", "Brain removal"], correct: 0 },
         { question: "What is a colectomy?", options: ["Colon removal", "Heart removal", "Lung removal", "Brain removal"], correct: 0 }
       ]
     },
     {
       name: "Immune System",
       icon: "🛡️",
       color: "#6f42c1",
       questions: [
         { question: "What is the immune system?", options: ["Body's defense system", "Digestive system", "Respiratory system", "Nervous system"], correct: 0 },
         { question: "What are antibodies?", options: ["Immune proteins", "Digestive enzymes", "Respiratory cells", "Nerve cells"], correct: 0 },
         { question: "What is an allergy?", options: ["Immune overreaction", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is an autoimmune disease?", options: ["Body attacks itself", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is lupus?", options: ["Autoimmune disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is rheumatoid arthritis?", options: ["Joint autoimmune disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is multiple sclerosis?", options: ["Nerve autoimmune disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is diabetes type 1?", options: ["Autoimmune diabetes", "Heart diabetes", "Lung diabetes", "Brain diabetes"], correct: 0 },
         { question: "What is psoriasis?", options: ["Skin autoimmune disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is celiac disease?", options: ["Gluten autoimmune disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is HIV?", options: ["Virus that attacks immune system", "Heart virus", "Lung virus", "Brain virus"], correct: 0 },
         { question: "What is AIDS?", options: ["Advanced HIV disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is a vaccine?", options: ["Immune system training", "Heart medicine", "Lung medicine", "Brain medicine"], correct: 0 },
         { question: "What is immunotherapy?", options: ["Immune system treatment", "Heart treatment", "Lung treatment", "Brain treatment"], correct: 0 },
         { question: "What is a bone marrow transplant?", options: ["Immune system transplant", "Heart transplant", "Lung transplant", "Brain transplant"], correct: 0 },
         { question: "What is a stem cell transplant?", options: ["Immune system transplant", "Heart transplant", "Lung transplant", "Brain transplant"], correct: 0 },
         { question: "What is an organ transplant?", options: ["New organ surgery", "Heart surgery", "Lung surgery", "Brain surgery"], correct: 0 },
         { question: "What is rejection?", options: ["Body rejects transplant", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is immunosuppression?", options: ["Suppress immune system", "Heart medicine", "Lung medicine", "Brain medicine"], correct: 0 },
         { question: "What is inflammation?", options: ["Immune response", "Heart response", "Lung response", "Brain response"], correct: 0 }
       ]
     },
     {
       name: "Bone Health",
       icon: "🦴",
       color: "#e83e8c",
       questions: [
         { question: "What is osteoporosis?", options: ["Bone thinning disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is arthritis?", options: ["Joint inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is osteoarthritis?", options: ["Joint wear and tear", "Heart wear", "Lung wear", "Brain wear"], correct: 0 },
         { question: "What is rheumatoid arthritis?", options: ["Autoimmune joint disease", "Heart disease", "Lung disease", "Brain disease"], correct: 0 },
         { question: "What is a fracture?", options: ["Broken bone", "Broken heart", "Broken lung", "Broken brain"], correct: 0 },
         { question: "What is a sprain?", options: ["Ligament injury", "Heart injury", "Lung injury", "Brain injury"], correct: 0 },
         { question: "What is a strain?", options: ["Muscle injury", "Heart injury", "Lung injury", "Brain injury"], correct: 0 },
         { question: "What is scoliosis?", options: ["Spine curvature", "Heart curvature", "Lung curvature", "Brain curvature"], correct: 0 },
         { question: "What is kyphosis?", options: ["Hunchback", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is lordosis?", options: ["Swayback", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is a herniated disc?", options: ["Spine disc problem", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is sciatica?", options: ["Nerve pain in leg", "Heart pain", "Lung pain", "Brain pain"], correct: 0 },
         { question: "What is carpal tunnel syndrome?", options: ["Wrist nerve problem", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is tennis elbow?", options: ["Elbow tendon problem", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is a rotator cuff tear?", options: ["Shoulder tendon tear", "Heart tear", "Lung tear", "Brain tear"], correct: 0 },
         { question: "What is a meniscus tear?", options: ["Knee cartilage tear", "Heart tear", "Lung tear", "Brain tear"], correct: 0 },
         { question: "What is ACL tear?", options: ["Knee ligament tear", "Heart tear", "Lung tear", "Brain tear"], correct: 0 },
         { question: "What is a hip replacement?", options: ["New hip joint", "New heart", "New lung", "New brain"], correct: 0 },
         { question: "What is a knee replacement?", options: ["New knee joint", "New heart", "New lung", "New brain"], correct: 0 },
         { question: "What is physical therapy?", options: ["Movement treatment", "Heart treatment", "Lung treatment", "Brain treatment"], correct: 0 }
       ]
     },
     {
       name: "Eye Care",
       icon: "👁️",
       color: "#17a2b8",
       questions: [
         { question: "What is the main function of eyes?", options: ["See", "Hear", "Smell", "Taste"], correct: 0 },
         { question: "What is myopia?", options: ["Nearsightedness", "Farsightedness", "Astigmatism", "Color blindness"], correct: 0 },
         { question: "What is hyperopia?", options: ["Farsightedness", "Nearsightedness", "Astigmatism", "Color blindness"], correct: 0 },
         { question: "What is astigmatism?", options: ["Blurred vision", "Clear vision", "Color vision", "Night vision"], correct: 0 },
         { question: "What is presbyopia?", options: ["Age-related farsightedness", "Age-related nearsightedness", "Age-related blindness", "Age-related color blindness"], correct: 0 },
         { question: "What is cataracts?", options: ["Cloudy eye lens", "Clear eye lens", "Broken eye lens", "Missing eye lens"], correct: 0 },
         { question: "What is glaucoma?", options: ["Eye pressure disease", "Eye infection", "Eye injury", "Eye cancer"], correct: 0 },
         { question: "What is macular degeneration?", options: ["Central vision loss", "Peripheral vision loss", "Color vision loss", "Night vision loss"], correct: 0 },
         { question: "What is diabetic retinopathy?", options: ["Diabetes eye damage", "Diabetes heart damage", "Diabetes kidney damage", "Diabetes nerve damage"], correct: 0 },
         { question: "What is retinal detachment?", options: ["Retina separates from eye", "Retina tears", "Retina swells", "Retina shrinks"], correct: 0 },
         { question: "What is conjunctivitis?", options: ["Pink eye", "Black eye", "Blue eye", "Green eye"], correct: 0 },
         { question: "What is dry eye syndrome?", options: ["Insufficient tears", "Too many tears", "No tears", "Colored tears"], correct: 0 },
         { question: "What is an eye exam?", options: ["Vision test", "Eye surgery", "Eye medicine", "Eye exercise"], correct: 0 },
         { question: "What is an ophthalmologist?", options: ["Eye doctor", "Heart doctor", "Lung doctor", "Brain doctor"], correct: 0 },
         { question: "What is an optometrist?", options: ["Vision specialist", "Heart specialist", "Lung specialist", "Brain specialist"], correct: 0 },
         { question: "What is LASIK?", options: ["Laser eye surgery", "Eye medicine", "Eye exercise", "Eye test"], correct: 0 },
         { question: "What is an eye patch?", options: ["Eye covering", "Eye medicine", "Eye surgery", "Eye test"], correct: 0 },
         { question: "What is eye drops?", options: ["Eye medicine", "Eye surgery", "Eye test", "Eye exercise"], correct: 0 },
         { question: "What is an eye chart?", options: ["Vision test tool", "Eye surgery tool", "Eye medicine", "Eye exercise"], correct: 0 },
         { question: "What is color blindness?", options: ["Color vision problem", "No vision", "Blurred vision", "Double vision"], correct: 0 }
       ]
     },
     {
       name: "Dental Health",
       icon: "🦷",
       color: "#28a745",
       questions: [
         { question: "What is the main function of teeth?", options: ["Chew food", "Talk", "Breathe", "Think"], correct: 0 },
         { question: "What is a cavity?", options: ["Tooth decay", "Tooth growth", "Tooth cleaning", "Tooth whitening"], correct: 0 },
         { question: "What is gingivitis?", options: ["Gum inflammation", "Tooth inflammation", "Tongue inflammation", "Lip inflammation"], correct: 0 },
         { question: "What is periodontitis?", options: ["Gum disease", "Tooth disease", "Tongue disease", "Lip disease"], correct: 0 },
         { question: "What is plaque?", options: ["Bacteria film on teeth", "Tooth enamel", "Tooth dentin", "Tooth pulp"], correct: 0 },
         { question: "What is tartar?", options: ["Hardened plaque", "Soft plaque", "Tooth enamel", "Tooth dentin"], correct: 0 },
         { question: "What is a root canal?", options: ["Tooth nerve treatment", "Tooth cleaning", "Tooth whitening", "Tooth extraction"], correct: 0 },
         { question: "What is a crown?", options: ["Tooth cap", "Tooth filling", "Tooth cleaning", "Tooth whitening"], correct: 0 },
         { question: "What is a filling?", options: ["Tooth repair", "Tooth cleaning", "Tooth whitening", "Tooth extraction"], correct: 0 },
         { question: "What is a bridge?", options: ["Tooth replacement", "Tooth cleaning", "Tooth whitening", "Tooth extraction"], correct: 0 },
         { question: "What is a denture?", options: ["Removable teeth", "Permanent teeth", "Baby teeth", "Wisdom teeth"], correct: 0 },
         { question: "What is an implant?", options: ["Artificial tooth root", "Natural tooth root", "Tooth cleaning", "Tooth whitening"], correct: 0 },
         { question: "What is braces?", options: ["Teeth straightening", "Teeth cleaning", "Teeth whitening", "Teeth extraction"], correct: 0 },
         { question: "What is a retainer?", options: ["Teeth position holder", "Teeth cleaner", "Teeth whitener", "Teeth extractor"], correct: 0 },
         { question: "What is wisdom teeth?", options: ["Back molars", "Front teeth", "Canine teeth", "Incisor teeth"], correct: 0 },
         { question: "What is a tooth extraction?", options: ["Tooth removal", "Tooth cleaning", "Tooth whitening", "Tooth repair"], correct: 0 },
         { question: "What is a dental cleaning?", options: ["Teeth cleaning", "Teeth whitening", "Teeth extraction", "Teeth repair"], correct: 0 },
         { question: "What is fluoride?", options: ["Tooth strengthener", "Tooth whitener", "Tooth cleaner", "Tooth extractor"], correct: 0 },
         { question: "What is a dental sealant?", options: ["Tooth protector", "Tooth whitener", "Tooth cleaner", "Tooth extractor"], correct: 0 },
         { question: "What is a dental X-ray?", options: ["Tooth imaging", "Tooth cleaning", "Tooth whitening", "Tooth extraction"], correct: 0 }
       ]
     },
     {
       name: "Skin Care",
       icon: "🧴",
       color: "#ffc107",
       questions: [
         { question: "What is the main function of skin?", options: ["Protect body", "Pump blood", "Breathe", "Think"], correct: 0 },
         { question: "What is acne?", options: ["Skin pimple condition", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is eczema?", options: ["Skin inflammation", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is psoriasis?", options: ["Skin scaling disease", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is dermatitis?", options: ["Skin inflammation", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is a rash?", options: ["Skin irritation", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is hives?", options: ["Skin allergic reaction", "Skin cancer", "Skin infection", "Skin inflammation"], correct: 0 },
         { question: "What is a wart?", options: ["Viral skin growth", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is a mole?", options: ["Skin pigment spot", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is skin cancer?", options: ["Skin cell cancer", "Skin infection", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is melanoma?", options: ["Serious skin cancer", "Skin infection", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is a sunburn?", options: ["UV skin damage", "Skin infection", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is a blister?", options: ["Fluid-filled skin bump", "Skin cancer", "Skin infection", "Skin allergy"], correct: 0 },
         { question: "What is a boil?", options: ["Skin infection", "Skin cancer", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is cellulitis?", options: ["Skin infection", "Skin cancer", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is a fungal infection?", options: ["Fungus skin infection", "Skin cancer", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is ringworm?", options: ["Fungal skin infection", "Skin cancer", "Skin allergy", "Skin inflammation"], correct: 0 },
         { question: "What is athlete's foot?", options: ["Foot fungal infection", "Foot cancer", "Foot allergy", "Foot inflammation"], correct: 0 },
         { question: "What is a dermatologist?", options: ["Skin doctor", "Heart doctor", "Lung doctor", "Brain doctor"], correct: 0 },
         { question: "What is sunscreen?", options: ["UV protection", "Skin moisturizer", "Skin cleanser", "Skin medicine"], correct: 0 }
       ]
     },
     {
       name: "Women's Health",
       icon: "👩",
       color: "#e83e8c",
       questions: [
         { question: "What is a mammogram?", options: ["Breast X-ray", "Heart X-ray", "Lung X-ray", "Brain X-ray"], correct: 0 },
         { question: "What is a Pap smear?", options: ["Cervical cancer test", "Breast cancer test", "Ovarian cancer test", "Uterine cancer test"], correct: 0 },
         { question: "What is menopause?", options: ["End of periods", "Start of periods", "Irregular periods", "Heavy periods"], correct: 0 },
         { question: "What is PMS?", options: ["Pre-menstrual syndrome", "Post-menstrual syndrome", "During menstruation", "Between periods"], correct: 0 },
         { question: "What is endometriosis?", options: ["Uterine tissue problem", "Ovarian problem", "Breast problem", "Cervical problem"], correct: 0 },
         { question: "What is PCOS?", options: ["Polycystic ovary syndrome", "Breast syndrome", "Uterine syndrome", "Cervical syndrome"], correct: 0 },
         { question: "What is a hysterectomy?", options: ["Uterus removal", "Ovary removal", "Breast removal", "Cervix removal"], correct: 0 },
         { question: "What is a mastectomy?", options: ["Breast removal", "Uterus removal", "Ovary removal", "Cervix removal"], correct: 0 },
         { question: "What is breast cancer?", options: ["Breast cell cancer", "Uterine cancer", "Ovarian cancer", "Cervical cancer"], correct: 0 },
         { question: "What is cervical cancer?", options: ["Cervix cancer", "Breast cancer", "Ovarian cancer", "Uterine cancer"], correct: 0 },
         { question: "What is ovarian cancer?", options: ["Ovary cancer", "Breast cancer", "Cervical cancer", "Uterine cancer"], correct: 0 },
         { question: "What is uterine cancer?", options: ["Uterus cancer", "Breast cancer", "Ovarian cancer", "Cervical cancer"], correct: 0 },
         { question: "What is a gynecologist?", options: ["Women's health doctor", "Heart doctor", "Lung doctor", "Brain doctor"], correct: 0 },
         { question: "What is a midwife?", options: ["Pregnancy helper", "Heart helper", "Lung helper", "Brain helper"], correct: 0 },
         { question: "What is prenatal care?", options: ["Pregnancy care", "Heart care", "Lung care", "Brain care"], correct: 0 },
         { question: "What is postpartum?", options: ["After childbirth", "Before childbirth", "During childbirth", "Between pregnancies"], correct: 0 },
         { question: "What is a cesarean section?", options: ["Surgical childbirth", "Natural childbirth", "Home childbirth", "Water childbirth"], correct: 0 },
         { question: "What is gestational diabetes?", options: ["Pregnancy diabetes", "Type 1 diabetes", "Type 2 diabetes", "Pre-diabetes"], correct: 0 },
         { question: "What is preeclampsia?", options: ["Pregnancy complication", "Heart complication", "Lung complication", "Brain complication"], correct: 0 },
         { question: "What is a miscarriage?", options: ["Pregnancy loss", "Pregnancy gain", "Pregnancy complication", "Pregnancy success"], correct: 0 }
       ]
     },
     {
       name: "Men's Health",
       icon: "👨",
       color: "#007bff",
       questions: [
         { question: "What is a prostate exam?", options: ["Prostate check", "Heart check", "Lung check", "Brain check"], correct: 0 },
         { question: "What is prostate cancer?", options: ["Prostate cell cancer", "Heart cancer", "Lung cancer", "Brain cancer"], correct: 0 },
         { question: "What is BPH?", options: ["Enlarged prostate", "Enlarged heart", "Enlarged lung", "Enlarged brain"], correct: 0 },
         { question: "What is testicular cancer?", options: ["Testicle cancer", "Prostate cancer", "Heart cancer", "Lung cancer"], correct: 0 },
         { question: "What is erectile dysfunction?", options: ["Penile problem", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is infertility?", options: ["Unable to conceive", "Able to conceive", "Multiple pregnancies", "Early pregnancy"], correct: 0 },
         { question: "What is a vasectomy?", options: ["Male sterilization", "Female sterilization", "Heart surgery", "Lung surgery"], correct: 0 },
         { question: "What is a circumcision?", options: ["Foreskin removal", "Heart removal", "Lung removal", "Brain removal"], correct: 0 },
         { question: "What is a hernia?", options: ["Organ protrusion", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is an inguinal hernia?", options: ["Groin hernia", "Belly hernia", "Chest hernia", "Head hernia"], correct: 0 },
         { question: "What is a hydrocele?", options: ["Testicle fluid", "Heart fluid", "Lung fluid", "Brain fluid"], correct: 0 },
         { question: "What is varicocele?", options: ["Enlarged testicle veins", "Enlarged heart veins", "Enlarged lung veins", "Enlarged brain veins"], correct: 0 },
         { question: "What is a urologist?", options: ["Urinary system doctor", "Heart doctor", "Lung doctor", "Brain doctor"], correct: 0 },
         { question: "What is a PSA test?", options: ["Prostate blood test", "Heart blood test", "Lung blood test", "Brain blood test"], correct: 0 },
         { question: "What is testosterone?", options: ["Male hormone", "Female hormone", "Heart hormone", "Lung hormone"], correct: 0 },
         { question: "What is low testosterone?", options: ["Low male hormone", "Low female hormone", "Low heart hormone", "Low lung hormone"], correct: 0 },
         { question: "What is male pattern baldness?", options: ["Hair loss", "Hair gain", "Hair color change", "Hair texture change"], correct: 0 },
         { question: "What is gynecomastia?", options: ["Male breast enlargement", "Female breast enlargement", "Heart enlargement", "Lung enlargement"], correct: 0 },
         { question: "What is a digital rectal exam?", options: ["Prostate exam", "Heart exam", "Lung exam", "Brain exam"], correct: 0 },
         { question: "What is a semen analysis?", options: ["Sperm test", "Blood test", "Urine test", "Stool test"], correct: 0 }
       ]
     },
     {
       name: "Child Health",
       icon: "👶",
       color: "#ff69b4",
       questions: [
         { question: "What is a pediatrician?", options: ["Children's doctor", "Adult doctor", "Heart doctor", "Lung doctor"], correct: 0 },
         { question: "What is a vaccine?", options: ["Disease prevention", "Disease treatment", "Disease cure", "Disease diagnosis"], correct: 0 },
         { question: "What is a growth chart?", options: ["Child development tracker", "Adult tracker", "Heart tracker", "Lung tracker"], correct: 0 },
         { question: "What is a well-child visit?", options: ["Regular child checkup", "Sick child visit", "Emergency visit", "Specialist visit"], correct: 0 },
         { question: "What is a developmental milestone?", options: ["Child development marker", "Adult marker", "Heart marker", "Lung marker"], correct: 0 },
         { question: "What is autism?", options: ["Developmental disorder", "Heart disorder", "Lung disorder", "Brain disorder"], correct: 0 },
         { question: "What is ADHD?", options: ["Attention disorder", "Heart disorder", "Lung disorder", "Brain disorder"], correct: 0 },
         { question: "What is a fever?", options: ["High body temperature", "Low body temperature", "Normal temperature", "No temperature"], correct: 0 },
         { question: "What is croup?", options: ["Child airway infection", "Adult infection", "Heart infection", "Lung infection"], correct: 0 },
         { question: "What is chickenpox?", options: ["Viral skin infection", "Bacterial infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is measles?", options: ["Viral infection", "Bacterial infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is mumps?", options: ["Viral infection", "Bacterial infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is rubella?", options: ["German measles", "Regular measles", "Chickenpox", "Mumps"], correct: 0 },
         { question: "What is whooping cough?", options: ["Bacterial infection", "Viral infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is rotavirus?", options: ["Stomach virus", "Heart virus", "Lung virus", "Brain virus"], correct: 0 },
         { question: "What is RSV?", options: ["Respiratory virus", "Heart virus", "Stomach virus", "Brain virus"], correct: 0 },
         { question: "What is hand-foot-mouth disease?", options: ["Viral infection", "Bacterial infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is impetigo?", options: ["Bacterial skin infection", "Viral infection", "Fungal infection", "Parasitic infection"], correct: 0 },
         { question: "What is ringworm?", options: ["Fungal skin infection", "Bacterial infection", "Viral infection", "Parasitic infection"], correct: 0 },
         { question: "What is scabies?", options: ["Parasitic skin infection", "Bacterial infection", "Viral infection", "Fungal infection"], correct: 0 }
       ]
     },
     {
       name: "Senior Health",
       icon: "👴",
       color: "#6c757d",
       questions: [
         { question: "What is arthritis?", options: ["Joint inflammation", "Heart inflammation", "Lung inflammation", "Brain inflammation"], correct: 0 },
         { question: "What is osteoporosis?", options: ["Bone thinning", "Heart thinning", "Lung thinning", "Brain thinning"], correct: 0 },
         { question: "What is dementia?", options: ["Memory loss disease", "Heart disease", "Lung disease", "Stomach disease"], correct: 0 },
         { question: "What is Alzheimer's disease?", options: ["Memory loss disease", "Heart disease", "Lung disease", "Stomach disease"], correct: 0 },
         { question: "What is Parkinson's disease?", options: ["Movement disorder", "Heart disorder", "Lung disorder", "Stomach disorder"], correct: 0 },
         { question: "What is a stroke?", options: ["Brain blood flow problem", "Heart problem", "Lung problem", "Stomach problem"], correct: 0 },
         { question: "What is high blood pressure?", options: ["Hypertension", "Hypotension", "Normal pressure", "No pressure"], correct: 0 },
         { question: "What is diabetes?", options: ["Blood sugar disease", "Heart disease", "Lung disease", "Stomach disease"], correct: 0 },
         { question: "What is heart disease?", options: ["Heart problem", "Lung problem", "Stomach problem", "Brain problem"], correct: 0 },
         { question: "What is COPD?", options: ["Lung disease", "Heart disease", "Stomach disease", "Brain disease"], correct: 0 },
         { question: "What is cancer?", options: ["Cell growth disease", "Heart disease", "Lung disease", "Stomach disease"], correct: 0 },
         { question: "What is a fall?", options: ["Accidental injury", "Intentional injury", "Disease", "Infection"], correct: 0 },
         { question: "What is incontinence?", options: ["Bladder control problem", "Heart problem", "Lung problem", "Stomach problem"], correct: 0 },
         { question: "What is depression?", options: ["Mental health condition", "Heart condition", "Lung condition", "Stomach condition"], correct: 0 },
         { question: "What is anxiety?", options: ["Mental health condition", "Heart condition", "Lung condition", "Stomach condition"], correct: 0 },
         { question: "What is insomnia?", options: ["Sleep problem", "Heart problem", "Lung problem", "Stomach problem"], correct: 0 },
         { question: "What is hearing loss?", options: ["Ear problem", "Heart problem", "Lung problem", "Stomach problem"], correct: 0 },
         { question: "What is vision loss?", options: ["Eye problem", "Heart problem", "Lung problem", "Stomach problem"], correct: 0 },
         { question: "What is a geriatrician?", options: ["Senior health doctor", "Child doctor", "Adult doctor", "Heart doctor"], correct: 0 },
         { question: "What is palliative care?", options: ["Comfort care", "Cure care", "Prevention care", "Diagnosis care"], correct: 0 }
       ]
     },
     {
       name: "First Aid",
       icon: "🚑",
       color: "#dc3545",
       questions: [
         { question: "What is CPR?", options: ["Emergency heart procedure", "Heart surgery", "Heart medicine", "Heart test"], correct: 0 },
         { question: "What is the Heimlich maneuver?", options: ["Choking rescue", "Heart rescue", "Lung rescue", "Brain rescue"], correct: 0 },
         { question: "What is a tourniquet?", options: ["Bleeding control", "Pain control", "Infection control", "Swelling control"], correct: 0 },
         { question: "What is a bandage?", options: ["Wound covering", "Pain medicine", "Infection medicine", "Swelling medicine"], correct: 0 },
         { question: "What is antiseptic?", options: ["Infection prevention", "Pain relief", "Swelling reduction", "Bleeding control"], correct: 0 },
         { question: "What is a splint?", options: ["Bone immobilization", "Pain relief", "Swelling reduction", "Bleeding control"], correct: 0 },
         { question: "What is a sling?", options: ["Arm support", "Leg support", "Head support", "Back support"], correct: 0 },
         { question: "What is a cold compress?", options: ["Swelling reduction", "Pain relief", "Infection treatment", "Bleeding control"], correct: 0 },
         { question: "What is a hot compress?", options: ["Pain relief", "Swelling reduction", "Infection treatment", "Bleeding control"], correct: 0 },
         { question: "What is an AED?", options: ["Heart shock device", "Lung device", "Brain device", "Stomach device"], correct: 0 },
         { question: "What is shock?", options: ["Blood flow problem", "Heart problem", "Lung problem", "Brain problem"], correct: 0 },
         { question: "What is a concussion?", options: ["Brain injury", "Heart injury", "Lung injury", "Stomach injury"], correct: 0 },
         { question: "What is a burn?", options: ["Tissue damage", "Heart damage", "Lung damage", "Brain damage"], correct: 0 },
         { question: "What is a sprain?", options: ["Ligament injury", "Muscle injury", "Bone injury", "Nerve injury"], correct: 0 },
         { question: "What is a strain?", options: ["Muscle injury", "Ligament injury", "Bone injury", "Nerve injury"], correct: 0 },
         { question: "What is a fracture?", options: ["Broken bone", "Broken muscle", "Broken ligament", "Broken nerve"], correct: 0 },
         { question: "What is a dislocation?", options: ["Joint separation", "Muscle separation", "Ligament separation", "Nerve separation"], correct: 0 },
         { question: "What is a puncture wound?", options: ["Deep wound", "Shallow wound", "Surface wound", "Internal wound"], correct: 0 },
         { question: "What is a laceration?", options: ["Cut wound", "Bruise wound", "Burn wound", "Puncture wound"], correct: 0 },
         { question: "What is an abrasion?", options: ["Scrape wound", "Cut wound", "Puncture wound", "Burn wound"], correct: 0 }
       ]
     },
     {
       name: "Medication Safety",
       icon: "💊",
       color: "#28a745",
       questions: [
         { question: "What is a prescription?", options: ["Doctor's medicine order", "Over-the-counter medicine", "Herbal medicine", "Vitamin"], correct: 0 },
         { question: "What is over-the-counter medicine?", options: ["Non-prescription medicine", "Prescription medicine", "Herbal medicine", "Vitamin"], correct: 0 },
         { question: "What is a side effect?", options: ["Unwanted medicine effect", "Wanted medicine effect", "No effect", "Placebo effect"], correct: 0 },
         { question: "What is an allergic reaction?", options: ["Immune system reaction", "Heart reaction", "Lung reaction", "Brain reaction"], correct: 0 },
         { question: "What is a drug interaction?", options: ["Medicine combination effect", "Single medicine effect", "No effect", "Placebo effect"], correct: 0 },
         { question: "What is an overdose?", options: ["Too much medicine", "Too little medicine", "Right amount", "No medicine"], correct: 0 },
         { question: "What is addiction?", options: ["Medicine dependence", "Medicine independence", "Medicine avoidance", "Medicine tolerance"], correct: 0 },
         { question: "What is tolerance?", options: ["Medicine resistance", "Medicine sensitivity", "Medicine allergy", "Medicine interaction"], correct: 0 },
         { question: "What is withdrawal?", options: ["Medicine stopping symptoms", "Medicine starting symptoms", "Medicine side effects", "Medicine interactions"], correct: 0 },
         { question: "What is a generic medicine?", options: ["Cheaper version", "Expensive version", "Different medicine", "Same medicine"], correct: 0 },
         { question: "What is a brand name medicine?", options: ["Company's medicine name", "Generic name", "Chemical name", "Scientific name"], correct: 0 },
         { question: "What is an expiration date?", options: ["Medicine expiry", "Medicine start date", "Medicine prescription date", "Medicine purchase date"], correct: 0 },
         { question: "What is storage temperature?", options: ["Medicine storage condition", "Medicine dosage", "Medicine frequency", "Medicine duration"], correct: 0 },
         { question: "What is a dosage?", options: ["Medicine amount", "Medicine frequency", "Medicine duration", "Medicine timing"], correct: 0 },
         { question: "What is frequency?", options: ["How often to take", "How much to take", "How long to take", "When to take"], correct: 0 },
         { question: "What is duration?", options: ["How long to take", "How often to take", "How much to take", "When to take"], correct: 0 },
         { question: "What is timing?", options: ["When to take", "How much to take", "How often to take", "How long to take"], correct: 0 },
         { question: "What is a pharmacist?", options: ["Medicine expert", "Heart expert", "Lung expert", "Brain expert"], correct: 0 },
         { question: "What is a medication list?", options: ["Medicine record", "Heart record", "Lung record", "Brain record"], correct: 0 },
         { question: "What is a pill organizer?", options: ["Medicine organizer", "Heart organizer", "Lung organizer", "Brain organizer"], correct: 0 }
       ]
     },
     {
       name: "Environmental Health",
       icon: "🌍",
       color: "#20c997",
       questions: [
         { question: "What is air pollution?", options: ["Dirty air", "Clean air", "Fresh air", "Pure air"], correct: 0 },
         { question: "What is water pollution?", options: ["Dirty water", "Clean water", "Fresh water", "Pure water"], correct: 0 },
         { question: "What is soil pollution?", options: ["Dirty soil", "Clean soil", "Fresh soil", "Pure soil"], correct: 0 },
         { question: "What is noise pollution?", options: ["Loud noise", "Quiet noise", "Soft noise", "No noise"], correct: 0 },
         { question: "What is light pollution?", options: ["Too much light", "Too little light", "Right light", "No light"], correct: 0 },
         { question: "What is climate change?", options: ["Weather pattern change", "Season change", "Day change", "Time change"], correct: 0 },
         { question: "What is global warming?", options: ["Earth temperature rise", "Earth temperature fall", "Earth temperature same", "No temperature"], correct: 0 },
         { question: "What is ozone depletion?", options: ["Ozone layer damage", "Ozone layer growth", "Ozone layer same", "No ozone"], correct: 0 },
         { question: "What is acid rain?", options: ["Acidic rain", "Basic rain", "Neutral rain", "No rain"], correct: 0 },
         { question: "What is deforestation?", options: ["Tree removal", "Tree planting", "Tree growth", "Tree protection"], correct: 0 },
         { question: "What is biodiversity loss?", options: ["Species reduction", "Species increase", "Species same", "No species"], correct: 0 },
         { question: "What is habitat destruction?", options: ["Animal home damage", "Animal home growth", "Animal home same", "No animal home"], correct: 0 },
         { question: "What is toxic waste?", options: ["Harmful waste", "Safe waste", "Useful waste", "No waste"], correct: 0 },
         { question: "What is recycling?", options: ["Waste reuse", "Waste disposal", "Waste creation", "Waste burning"], correct: 0 },
         { question: "What is composting?", options: ["Organic waste breakdown", "Organic waste creation", "Organic waste burning", "Organic waste disposal"], correct: 0 },
         { question: "What is renewable energy?", options: ["Sustainable energy", "Fossil fuel energy", "Nuclear energy", "No energy"], correct: 0 },
         { question: "What is solar energy?", options: ["Sun energy", "Wind energy", "Water energy", "Earth energy"], correct: 0 },
         { question: "What is wind energy?", options: ["Wind power", "Sun power", "Water power", "Earth power"], correct: 0 },
         { question: "What is hydroelectric energy?", options: ["Water power", "Wind power", "Sun power", "Earth power"], correct: 0 },
         { question: "What is geothermal energy?", options: ["Earth heat energy", "Sun heat energy", "Wind heat energy", "Water heat energy"], correct: 0 }
       ]
     },
     {
       name: "Preventive Care",
       icon: "🏥",
       color: "#6f42c1",
       questions: [
         { question: "What is a physical exam?", options: ["Health checkup", "Sick visit", "Emergency visit", "Specialist visit"], correct: 0 },
         { question: "What is a blood test?", options: ["Blood analysis", "Heart analysis", "Lung analysis", "Brain analysis"], correct: 0 },
         { question: "What is a urine test?", options: ["Urine analysis", "Blood analysis", "Stool analysis", "Saliva analysis"], correct: 0 },
         { question: "What is a stool test?", options: ["Stool analysis", "Blood analysis", "Urine analysis", "Saliva analysis"], correct: 0 },
         { question: "What is a mammogram?", options: ["Breast X-ray", "Heart X-ray", "Lung X-ray", "Brain X-ray"], correct: 0 },
         { question: "What is a colonoscopy?", options: ["Colon exam", "Heart exam", "Lung exam", "Brain exam"], correct: 0 },
         { question: "What is a Pap smear?", options: ["Cervical cancer test", "Breast cancer test", "Ovarian cancer test", "Uterine cancer test"], correct: 0 },
         { question: "What is a PSA test?", options: ["Prostate blood test", "Heart blood test", "Lung blood test", "Brain blood test"], correct: 0 },
         { question: "What is a cholesterol test?", options: ["Blood fat test", "Blood sugar test", "Blood protein test", "Blood mineral test"], correct: 0 },
         { question: "What is a blood pressure test?", options: ["Heart pressure test", "Lung pressure test", "Brain pressure test", "Stomach pressure test"], correct: 0 },
         { question: "What is a diabetes test?", options: ["Blood sugar test", "Blood fat test", "Blood protein test", "Blood mineral test"], correct: 0 },
         { question: "What is a thyroid test?", options: ["Thyroid hormone test", "Heart hormone test", "Lung hormone test", "Brain hormone test"], correct: 0 },
         { question: "What is a bone density test?", options: ["Bone strength test", "Muscle strength test", "Heart strength test", "Lung strength test"], correct: 0 },
         { question: "What is a vision test?", options: ["Eye exam", "Ear exam", "Nose exam", "Throat exam"], correct: 0 },
         { question: "What is a hearing test?", options: ["Ear exam", "Eye exam", "Nose exam", "Throat exam"], correct: 0 },
         { question: "What is a dental exam?", options: ["Teeth exam", "Gum exam", "Tongue exam", "Lip exam"], correct: 0 },
         { question: "What is a skin exam?", options: ["Skin cancer check", "Heart check", "Lung check", "Brain check"], correct: 0 },
         { question: "What is a vaccine schedule?", options: ["Immunization plan", "Medication plan", "Exercise plan", "Diet plan"], correct: 0 },
         { question: "What is a health screening?", options: ["Disease detection", "Disease treatment", "Disease cure", "Disease prevention"], correct: 0 },
         { question: "What is a wellness visit?", options: ["Preventive care visit", "Sick care visit", "Emergency care visit", "Specialist care visit"], correct: 0 }
       ]
     }
   ];

  // Ensure 20 questions per topic (for demo, duplicate if needed)
  useEffect(() => {
    const found = topics.find(
      t => t.name.toLowerCase().replace(/\s+/g, "") === decodeURIComponent(topicName).toLowerCase().replace(/\s+/g, "")
    );
    if (found) {
      let questions = found.questions;
      if (questions.length < 20) {
        // Duplicate questions to reach 20 for demo
        questions = [...questions];
        while (questions.length < 20) {
          questions = questions.concat(found.questions.slice(0, 20 - questions.length));
        }
      }
      setTopic({ ...found, questions: questions.slice(0, 20) });
    } else {
      setTopic(null);
    }
    setLoading(false);
  }, [topicName]);

  const saveScore = async (username, topic, score) => {
    await fetch("http://localhost:3001/saveScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, topic, score }),
    });
  };

  const handleAnswerSelection = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isAnswerCorrect = index === topic.questions[currentQuestion].correct;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) setScore(score + 1);
    setShowFeedback(true);
    setTimeout(() => {
      if (currentQuestion < topic.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
      } else {
        setShowResults(true);
        const username = localStorage.getItem("userName") || "Anonymous";
        saveScore(username, topic.name, score + (isAnswerCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const handleBackToGame = () => navigate("/game");
  const handleBackToScore = () => navigate("/score");

  if (loading) return <div className="quiz-container"><h2>Loading...</h2></div>;
  if (!topic) return <div className="quiz-container"><h2>Topic not found.</h2></div>;

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="results-card">
          <div className="results-header">
            <h2>Quiz Results 🎉</h2>
            <div className="topic-info">
              <span className="topic-icon">{topic.icon}</span>
              <span className="topic-name">{topic.name}</span>
            </div>
          </div>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {topic.questions.length}</span>
            </div>
            <div className="score-percentage">
              {Math.round((score / topic.questions.length) * 100)}%
            </div>
          </div>
          <div className="score-message">
            <p>{score >= 18 ? "Excellent! You're a health expert! 🏆" : score >= 15 ? "Great job! You know your stuff! 🌟" : score >= 12 ? "Good work! Keep learning! 👍" : score >= 10 ? "Not bad! Room for improvement! 📚" : "Keep studying! You'll get better! 💪"}</p>
          </div>
          <div className="results-actions">
            <button className="retry-button" onClick={handleBackToGame}>Back to Topics</button>
            <button className="restart-button" onClick={handleBackToScore}>View Score</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = topic.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / topic.questions.length) * 100}%` }}></div>
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {topic.questions.length}
        </div>
      </div>
      <div className="question-card">
        <div className="question-header">
          <div className="topic-badge">
            <span className="topic-icon">{topic.icon}</span>
            <span>{topic.name}</span>
          </div>
          <div className="score-display">
            Score: {score}/{topic.questions.length}
          </div>
        </div>
        <div className="question-content">
          <h2 className="question-text">{currentQ.question}</h2>
          <div className="options-grid">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === index ? (isCorrect ? 'correct' : 'incorrect') : ''} ${selectedAnswer !== null && index === currentQ.correct ? 'correct-answer' : ''}`}
                onClick={() => handleAnswerSelection(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {selectedAnswer === index && (
                  <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
                )}
              </button>
            ))}
          </div>
        </div>
        {showFeedback && (
          <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            <span>{isCorrect ? 'Correct! 🎉' : 'Incorrect! The correct answer was highlighted.'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;