import { useState } from 'react';
import { Progress } from 'antd';
import 'antd/dist/reset.css';

// Calculates password strength score (0-100)
const getStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 20; // Length check
  if (/[A-Z]/.test(password)) strength += 20; // Uppercase check
  if (/[a-z]/.test(password)) strength += 20; // Lowercase check
  if (/[0-9]/.test(password)) strength += 20; // Number check
  if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special char check
  return strength;
};

// Returns feedback based on score (message, image, color)
const getFeedback = (score) => {
  if (score <= 30) return {
    msg: "⚠️ Weak! Try mixing uppercase, numbers and symbols.",
    imgPath: "/images/password/0.png",
    color: "#ff4d4f" // Red
  };
  if (score <= 50) return {
    msg: "🆗 Fair. Add more characters and avoid personal info.",
    imgPath: "/images/password/1.png",
    color: "#ffa940" // Orange
  };
  if (score <= 70) return {
    msg: "👍 Good! Use longer phrases for better security.",
    imgPath: "/images/password/2.png",
    color: "#1890ff"
  };
  if (score < 100) return {
    msg: "💪 Strong! Just a bit more randomness makes it perfect.",
    imgPath: "/images/password/3.png",
    color: "#52c41a" 
  };
  return {
    msg: "🔒 Excellent! You've created a hacker-resistant password!",
    imgPath: "/images/password/4.png",
    color: "#13c2c2" // Teal
  };
};

export default function PasswordPractice() {
  const [password, setPassword] = useState('');// Password input state
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility
  
  const score = getStrength(password); // Current strength score
  const feedback = getFeedback(score); // Feedback object

  return (
    <div className="content-card">
      <div style={styles.container}>
        {/* Header */}
        <h2 style={styles.header}>🔐 Password Strength Trainer</h2>

        {/* Instruction bubble */}
        <div style={styles.bubble}>
          <span style={styles.bot}>🤖</span> Let's create a monster-proof password!<br />
          Type below and watch your security score rise.
        </div>

        {/* Password input with visibility toggle */}
        <div style={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        {/* Strength meter with Ant Design Progress bar */}
        <div style={styles.bubble}>
          <span style={styles.bot}>🤖</span> Your password strength:
        </div>
        <Progress 
          percent={score} 
          strokeColor={feedback.color}
          status="active"
          format={() => `${score}%`}
        />

        {/* Visual feedback image */}
        <img 
          src={feedback.imgPath} 
          alt="password strength" 
          style={{ ...styles.image, borderColor: feedback.color }} 
        />

        {/* Text feedback with color-coded background */}
        <div style={{ ...styles.bubble, backgroundColor: `${feedback.color}10` }}>
          <span style={styles.bot}>🤖</span> {feedback.msg}
        </div>
      </div>
    </div>
  );
}

//Style
const styles = {
  container: {
    padding: '1.5em',
    maxWidth: '500px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '1.5em',
    fontSize: '1.5em'
  },
  bubble: {
    backgroundColor: '#f0f8ff',
    padding: '1em',
    margin: '1em 0',
    borderRadius: '12px',
    border: '1px solid #b0c4de',
    fontSize: '0.95em'
  },
  bot: {
    fontWeight: 'bold',
    marginRight: '0.5em'
  },
  inputContainer: {
    display: 'flex',
    gap: '0.5em',
    margin: '1.5em 0'
  },
  input: {
    flex: 1,
    padding: '0.8em',
    fontSize: '1em',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    transition: 'all 0.3s',
    ':focus': {
      borderColor: '#1890ff',
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)'
    }
  },
  toggleButton: {
    padding: '0 1em',
    backgroundColor: '#f0f8ff',
    border: '1px solid #b0c4de',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#d0e8ff'
    }
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    display: 'block',
    margin: '1.5em auto',
    borderRadius: '8px',
    border: '2px solid',
    padding: '5px'
  }
};