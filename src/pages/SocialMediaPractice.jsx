import { useState } from "react";

const SocialMediaPractice = () => {
  // Component state management
  const [userChoice, setUserChoice] = useState("");// Tracks radio button selection
  const [submitted, setSubmitted] = useState(false);// Form submission state
  const [feedback, setFeedback] = useState("");// User feedback message

  // Evaluates user selection and provides feedback
  const handleSubmit = () => {
    let message = "";
    if (userChoice === "not_safe") {
      message = "✅ Great job! You correctly identified the privacy risks in this post.";
    } else if (userChoice === "safe") {
      message = "❌ Oops! This post reveals location and personal details - not safe to share!";
    } else {
      message = "🤔 Not sure? Let's analyze the risks together.";
    }
    setFeedback(message);
    setSubmitted(true);
  };

  return (
    <div className="content-card">
      <div style={styles.container}>
        {/* Header section */}
        <h2 style={styles.header}>📱 Social Media Practice</h2>

        {/* Instruction bubble with bot avatar */}
        <div style={styles.bubble}>
          <span style={styles.bot}>🤖</span> Hey cyber guardian!<br />
          Check this social media post below.<br />
          Can you spot what makes it unsafe to share?
        </div>

        {/* Example social media post image */}
        <div style={styles.imageContainer}>
          <img
            src="/images/socialmedia/1.jpg"
            alt="Social media post example"
            style={styles.image}
          />
        </div>

        {/* Conditional rendering based on submission state */}
        {!submitted ? (
          <>
            {/* Question prompt */}
            <div style={styles.bubble}>
              <span style={styles.bot}>🤖</span> Is this post safe to share?
            </div>

            {/* Multiple choice options */}
            <div style={styles.optionsContainer}>
              <label style={styles.option}>
                <input
                  type="radio"
                  name="safety"
                  value="safe"
                  onChange={() => setUserChoice("safe")}
                />
                <span>✅ Safe - No private info</span>
              </label>

              <label style={styles.option}>
                <input
                  type="radio"
                  name="safety"
                  value="not_safe"
                  onChange={() => setUserChoice("not_safe")}
                />
                <span>⚠️ Unsafe - Contains private details</span>
              </label>

              <label style={styles.option}>
                <input
                  type="radio"
                  name="safety"
                  value="not_sure"
                  onChange={() => setUserChoice("not_sure")}
                />
                <span>🤔 I'm not sure</span>
              </label>
            </div>

            {/* Submission button */}
            <button
              onClick={handleSubmit}
              disabled={!userChoice}
              style={styles.submitButton}
            >
              Submit
            </button>
          </>
        ) : (
          /* Feedback display after submission */
          <div style={styles.bubble}>
            <span style={styles.bot}>🤖</span> {feedback}
            <p style={styles.tip}>
              💡 Pro Tip: Always check for visible addresses, license plates, 
              or real-time location tags before posting!
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setUserChoice("");
              }}
              style={styles.tryAgainButton}
            >
              Try Another Example
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

//Style
const styles = {
  container: {
    padding: '1.5em',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '1.5em',
    fontSize: '1.5em',
  },
  bubble: {
    backgroundColor: '#f0f8ff',
    padding: '1em',
    margin: '1em 0',
    borderRadius: '12px',
    border: '1px solid #b0c4de',
    position: 'relative',
  },
  bot: {
    fontWeight: 'bold',
    marginRight: '0.5em',
    fontSize: '1.2em',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5em 0',
    border: '2px dashed #81d4fa',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#f5fdff',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  optionsContainer: {
    margin: '1.5em 0',
  },
  option: {
    display: 'block',
    margin: '0.8em 0',
    padding: '0.8em',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#e1f5fe',
    },
  },
  submitButton: {
    width: '100%',
    padding: '0.8em',
    backgroundColor: '#4fb3bf',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#0288d1',
    },
    ':disabled': {
      backgroundColor: '#bdbdbd',
      cursor: 'not-allowed',
    },
  },
  tip: {
    marginTop: '1em',
    fontSize: '0.9em',
    color: '#00796b',
  },
  tryAgainButton: {
    marginTop: '1em',
    padding: '0.5em 1em',
    backgroundColor: 'transparent',
    color: '#0288d1',
    border: '1px solid #0288d1',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#e1f5fe',
    },
  },
};

export default SocialMediaPractice;