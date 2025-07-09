import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Lesson database containing video URLs and quiz questions
const lessonData = {
  1: {
    videoUrl: "https://www.youtube.com/embed/wtCDiS-mZQQ",// Password security lesson
    quiz: [
      {
        question: "1. Why should you never use passwords like 'abc123' or 'P@ssw0rd'?",
        options: [
          "Because they look boring",
          "Because they are easy to guess",// Correct answer
          "Because they're too long"
        ],
        answer: 1,
        help: "These passwords are super common and easy for hackers to crack. 🧠"
      },// Educational tip
      
      {
        question: "2. Is using your birthday as a password a smart idea?",
        options: [
          "Totally safe—it's easy to remember!",
          "Not really—anyone can find it on social media",
          "Only if it's your pet's birthday"
        ],
        answer: 1,
        help: "Hackers often check your socials for clues like birthdays. 🎂"
      },
      {
        question: "3. What's a better way to create a strong password?",
        options: [
          "Use your username again",
          "Use symbols, numbers, and random words",
          "Just type really fast"
        ],
        answer: 1,
        help: "A great password mixes characters and avoids personal info. 🔐"
      },
      {
        question: "4. Is it safe to reuse your password across accounts?",
        options: [
          "Sure, it saves time",
          "Nope—one hack and they're all exposed",
          "Yes, if it's a really strong password"
        ],
        answer: 1,
        help: "One password to rule them all = one hack to break them all. 💥"
      },
      {
        question: "5. What's the magic of 2FA?",
        options: [
          "It's annoying",
          "It adds a second layer of security",
          "It lets you skip passwords"
        ],
        answer: 1,
        help: "2FA keeps your account safer—even if someone gets your password. 🔒"
      }
    ]
  },
  2: {
    videoUrl: "https://www.youtube.com/embed/GZc-CpV5Z1k",
    quiz: [
      {
        question: "1. Why should you be suspicious when an email says 'ACT NOW or lose your account'?",
        options: [
          "Because they're probably just excited",
          "Because urgency can be a trick to make you click",
          "Because it's a grammar mistake",
          "Because emails should never use capital letters"
        ],
        answer: 1,
        help: "Urgency = 🚩 for phishing. Slow down and check before clicking."
      },
      {
        question: "2. You get an email from 'insta-support@insta-help.co'. What's the smart move?",
        options: [
          "Celebrate—you won something!",
          "Click the link quickly",
          "Check if the domain looks legit",
          "Forward it to your group chat"
        ],
        answer: 2,
        help: "Fake domains love sneaky tricks—don't let '.co' fool you!"
      },
      {
        question: "3. An unexpected email has an attachment called 'urgent_invoice.exe'. What do you do?",
        options: [
          "Download and run it right away",
          "Screenshot it and post it online",
          "Reply asking 'who are you?'",
          "Don't click it—it could be malware"
        ],
        answer: 3,
        help: "If you didn't ask for it, don't open it."
      },
      {
        question: "4. Which of the following is safe to share in an email?",
        options: [
          "Your full name and school",
          "Your Instagram password",
          "Your bestie's crush",
          "None of the above"
        ],
        answer: 3,
        help: "Online privacy = protect yourself AND your friends."
      },
      {
        question: "5. What's the golden rule before giving away personal info online?",
        options: [
          "Do it only on weekends",
          "Ask your pet first",
          "Be 100% sure who you're giving it to",
          "If it's a funny email, it's fine"
        ],
        answer: 2,
        help: "If you're not sure who's asking, the safest answer is always 'nope.'"
      }
    ]
  },
  3: {
    videoUrl: "https://www.youtube.com/embed/y-sTPVW6PeY",
    quiz: [
      {
        question: "1. What's the first thing to do if your phone gets stolen?",
        options: ["Post it on social media", "Report it immediately", "Buy a new one"],
        answer: 1,
        help: "Reporting quickly can help prevent misuse of your data and device. 📱"
      },
      {
        question: "2. Why use biometric authentication (like Face ID)?",
        options: ["It's cool", "It's harder to fake than passwords", "Because passwords are boring"],
        answer: 1,
        help: "Biometrics are more secure and harder to guess than common passwords. 🧠"
      },
      {
        question: "3. Best place to get apps for your phone?",
        options: ["Official app stores", "Random pop-ups", "From friends via USB"],
        answer: 0,
        help: "Only download apps from trusted sources to avoid malware. 🔐"
      },
      {
        question: "4. Leaving your phone on the table at a café is...",
        options: ["A good way to make friends", "A risk—someone could grab it", "Smart if it's charging"],
        answer: 1,
        help: "Keep devices secure when in public. 🕵️‍♀️"
      },
      {
        question: "5. What's one simple way to lock your phone when not using it?",
        options: ["Turn off Wi-Fi", "Put it under a pillow", "Use a strong passcode or Face ID"],
        answer: 2,
        help: "Secure locking methods protect your data if your phone is lost. 🔒"
      }
    ]
  },
  4: {
    videoUrl: "https://www.youtube.com/embed/i1Ly1nmCEeo",
    quiz: [
      {
        question: "1. Why should you be cautious about accepting friend requests from strangers?",
        options: [
          "They might be lonely",
          "They could be fake accounts trying to steal info",
          "It's a nice way to make friends"
        ],
        answer: 1,
        help: "Not everyone online is who they seem. Be picky with your privacy! 🕵️"
      },
      {
        question: "2. Why avoid sharing company info on social media?",
        options: [
          "To keep things mysterious",
          "To avoid leaking sensitive or non-public information",
          "To look professional"
        ],
        answer: 1,
        help: "Keep work stuff private unless it's meant to be public. 🛡️"
      },
      {
        question: "3. What's a smart move if you have a complaint about your school or job?",
        options: [
          "Post about it online",
          "Start a viral thread",
          "Raise it internally instead of going public"
        ],
        answer: 2,
        help: "Handle complaints responsibly—you'll be taken more seriously. 📬"
      },
      {
        question: "4. What can privacy settings on social media help you do?",
        options: [
          "Make your profile look cooler",
          "Hide your photos from everyone",
          "Control who sees your info and posts"
        ],
        answer: 2,
        help: "Strong privacy settings = stronger online safety. 🔐"
      },
      {
        question: "5. Who should you accept friend requests from?",
        options: [
          "Anyone with a cool profile pic",
          "Only people you actually know",
          "Everyone to get more followers"
        ],
        answer: 1,
        help: "It's not about numbers—it's about trust. 👀"
      }
    ]
  },
  5: {
    videoUrl: "https://www.youtube.com/embed/tBG_vYJabQs",
    quiz: [
      {
        question: "1. What does the little lock icon in your browser's address bar mean?",
        options: [
          "That the website sells jewelry 💎",
          "That your connection is encrypted and safer",
          "That you're locked out"
        ],
        answer: 1,
        help: "The 🔒 means the site is using HTTPS - a good sign of a secure connection!"
      },
      {
        question: "2. Why should you inspect a website's domain name carefully?",
        options: [
          "To find secret Easter eggs",
          "To make sure it's the real deal, not a fake version",
          "Because URLs are fun to read"
        ],
        answer: 1,
        help: "Phishing sites often mimic real ones—watch out for weird spellings or extra characters!"
      },
      {
        question: "3. You want to download a game. What should you watch out for?",
        options: [
          "That you're clicking the real download button—not an ad 😅",
          "That the font is pretty",
          "That it's trending on TikTok"
        ],
        answer: 0,
        help: "Some ads pretend to be download buttons—sneaky! 🕵️"
      },
      {
        question: "4. When is it safe to enter your login details?",
        options: [
          "If the site has fireworks on it 🎆",
          "Only when you're sure it's a legit site",
          "If the page loads really fast"
        ],
        answer: 1,
        help: "Speed isn't security. Know the site. Trust the site. THEN login. 🔐"
      },
      {
        question: "5. What's a smart move before downloading from a site you've never used?",
        options: [
          "Search for reviews or info about the site first 🔍",
          "Just go for it",
          "Ask your dog"
        ],
        answer: 0,
        help: "Search first! Others may have warned about scams or fake downloads. 🛑"
      }
    ]
  }
};

export default function VideoPage() {
  // Router hooks for navigation
  const { id } = useParams(); // Gets current lesson ID from URL
  const navigate = useNavigate(); // For programmatic navigation
  
  // Calculate lesson navigation IDs (circular navigation)
  const currentId = parseInt(id || "1");
  const maxLessonId = Object.keys(lessonData).length;
  const nextId = currentId + 1 > maxLessonId ? 1 : currentId + 1; // Loop to first lesson
  const prevId = currentId - 1 < 1 ? maxLessonId : currentId - 1; // Loop to last lesson

  // Navigation handlers with smooth scroll
  const navigateToNextLesson = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });// Scroll to top before nav
    navigate(`/video/${nextId}`);
  };

  const navigateToPrevLesson = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/video/${prevId}`);
  };

  // Reset quiz state
  const restartQuiz = () => {
    setAnswers(Array(quiz.length).fill(null));
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, [id]);

  // Get current lesson data
  const { videoUrl, quiz } = lessonData[currentId] || lessonData[1];
  const [answers, setAnswers] = useState(Array(quiz.length).fill(null));// User answers
  const [submitted, setSubmitted] = useState(false); // Quiz submission state

  // Handle answer selection
  const handleOptionChange = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  // Submit quiz and calculate score
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Calculate score (2 points per correct answer)
  const score = answers.reduce((acc, cur, idx) => {
    return cur === quiz[idx].answer ? acc + 2 : acc;
  }, 0);

  return (
    <div className="content-card">
      <div style={styles.container}>
        {/* Lesson header */}
        <h2 style={styles.title}>📹 Lesson {currentId} - Watch & Quiz</h2>

        {/* Embedded video player */}
        <div style={styles.videoWrapper}>
          <iframe
            width="100%"
            height="315"
            src={videoUrl}
            title={`Lesson ${currentId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={styles.iframe}
          ></iframe>
        </div>

        {/* Quiz section */}
        <div style={styles.quizSection}>
          {quiz.map((q, index) => (
            <div key={index} style={styles.questionBlock}>
              <p><strong>{q.question}</strong></p>
              {q.options.map((opt, optIdx) => (
                <label key={optIdx} style={styles.option}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optIdx}
                    disabled={submitted} // Disable after submission
                    checked={answers[index] === optIdx}
                    onChange={() => handleOptionChange(index, optIdx)}
                    style={styles.radioInput}
                    aria-label={`Option ${optIdx + 1}: ${opt}`} // Accessibility
                  />
                  {opt}
                </label>
              ))}
              {/* Show feedback for incorrect answers */}
              {submitted && answers[index] !== q.answer && (
                <div style={styles.tipBox}>
                  <p style={styles.tipTitle}>💡 Tip:</p>
                  <p style={styles.tipContent}>{q.help}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conditional rendering based on submission state */}
        {!submitted ? (
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
        ) : (
          <div style={styles.scoreContainer}>
            <p style={styles.score}>Your score: {score} / {quiz.length * 2}</p>
            <button 
              onClick={restartQuiz} 
              style={styles.restartButton}
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}

        {/* Lesson navigation */}
        <div style={styles.navigationButtons}>
          <button
            onClick={navigateToPrevLesson}  
            style={styles.prevButton}
          >
            ◀️ Last Video
          </button>
          <button
            onClick={navigateToNextLesson}  
            style={styles.nextButton}
          >
            ▶️ Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
}

//Style
const styles = {
  container: {
    padding: '1.5em',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '1.5em',
    fontSize: '1.5em',
    fontWeight: '600'
  },
  videoWrapper: {
    marginBottom: '2em',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#f5fdff',
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  quizSection: {
    marginBottom: '1.5em'
  },
  questionBlock: {
    marginBottom: '1.5em',
    background: '#f0f8ff',
    padding: '1.2em',
    borderRadius: '10px',
    border: '1px solid #b0c4de',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  option: {
    display: 'block',
    margin: '0.8em 0',
    padding: '0.8em 1em',
    background: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e0e0e0',
    ':hover': {
      background: '#e1f5fe',
      borderColor: '#b0c4de'
    }
  },
  radioInput: {
    marginRight: '0.8em',
    accentColor: '#4fb3bf'
  },
  tipBox: {
    marginTop: '1em',
    padding: '1em',
    backgroundColor: '#e1f5fe',
    borderRadius: '8px',
    borderLeft: '4px solid #0288d1'
  },
  tipTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5em',
    color: '#0288d1'
  },
  tipContent: {
    margin: 0,
    lineHeight: 1.6
  },
  submitButton: {
    width: '100%',
    padding: '1em',
    backgroundColor: '#4fb3bf',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    cursor: 'pointer',
    margin: '1.5em 0',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    letterSpacing: '0.5px',
    ':hover': {
      backgroundColor: '#0288d1',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    margin: '1.5em 0'
  },
  score: {
    fontWeight: 'bold',
    fontSize: '1.3em',
    textAlign: 'center',
    color: '#00796b',
    padding: '0.8em',
    background: '#f0f8ff',
    borderRadius: '8px',
    width: '100%'
  },
  restartButton: {
    width: '100%',
    padding: '1em',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    letterSpacing: '0.5px',
    ':hover': {
      backgroundColor: '#f57c00',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2em',
    gap: '1em'
  },
  prevButton: {
    padding: '0.9em 1.8em',
    backgroundColor: '#607d8b',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    ':hover': {
      backgroundColor: '#455a64',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  },
  nextButton: {
    padding: '0.9em 1.8em',
    backgroundColor: '#4fb3bf',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    ':hover': {
      backgroundColor: '#0288d1',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  }
};