import { useState } from 'react';

const TextTrapSimulation = () => {
  // Simulation data
  const scenario = {
    title: "Your Classmate Is Asking for Money",
    description: "You just received a message from your classmate 'Leo'. His profile picture and name look familiar. He says it's urgent and wants to borrow money.",
    messageImage: "/images/simulation/6.png", 
    options: [
      "Call Leo to confirm it's really him", // Correct option
      "Ask for his PayPal and send the money right away",
      "Ask a question only Leo would know, like 'What did we dress up as for Halloween last year?'", // Correct option
      "Just send it — he's your friend and sounds really stressed",
      "Say you're busy and delay the conversation" 
    ],
    correctResponses: [0, 2], // Indices of correct options
    feedback: {
      positive: "Nice job! 🌟 You didn't fall for it. Scammers often steal names and photos to impersonate friends. Always verify before sending money — even if the message feels personal.",
      negative: "Careful! That's how a lot of people get scammed. Even if the name and picture look familiar, it could be a fake account. A real friend would understand if you double-check first."
    }
  };

  // Component state
  const [selectedOptions, setSelectedOptions] = useState([]); // User selections
  const [showFeedback, setShowFeedback] = useState(false); // Toggle feedback 
  const [isCorrect, setIsCorrect] = useState(false); // Answer correctness

  // Toggles option selection (multiple choice)
  const handleOptionSelect = (index) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter(i => i !== index)); // Deselect
    } else {
      setSelectedOptions([...selectedOptions, index]);// Select
    }
  };

  // Validates user selections against correct answers
  const checkAnswers = () => {
    const allCorrect = scenario.correctResponses.every(opt => 
      selectedOptions.includes(opt)
    ) && selectedOptions.length === scenario.correctResponses.length;
    
    setIsCorrect(allCorrect);
    setShowFeedback(true);
  };

  // Resets simulation to initial state
  const resetSimulation = () => {
    setSelectedOptions([]);
    setShowFeedback(false);
  };

  return (
    <div style={styles.container}>
      {/* Simulation header */}
      <h1 style={styles.header}>📱 Text Trap Simulator</h1>
      
      <div style={styles.scenarioCard}>
        <h2 style={styles.scenarioTitle}>{scenario.title}</h2>
        <p style={styles.description}>{scenario.description}</p>
        
        {/* Fake message image */}
        <div style={styles.messageBox}>
          <img 
            src={scenario.messageImage} 
            alt="Simulated message from Leo asking for money"
            style={styles.messageImage}
          />
        </div>
      </div>

      {/* Conditional rendering渲染 based on submission state */}
      {!showFeedback ? (
        <>
          {/* Multiple choice question */}
          <h3 style={styles.question}>What would you do? (Multiple choice)</h3>
          <div style={styles.optionsContainer}>
            {scenario.options.map((option, index) => (
              <label key={index} style={styles.option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(index)}
                  onChange={() => handleOptionSelect(index)}
                  style={styles.checkbox}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {/* Submission button */}
          <button
            onClick={checkAnswers}
            disabled={selectedOptions.length === 0}
            style={styles.submitButton}
          >
            Submit
          </button>
        </>
      ) : (
        /* Feedback display */
        <div style={{
          ...styles.feedbackBox,
          backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee'
        }}>
          <h3 style={styles.feedbackTitle}>
            {isCorrect ? '🎉 Good Choices!' : '⚠️ Potential Scam!'}
          </h3>
          <p>{isCorrect ? scenario.feedback.positive : scenario.feedback.negative}</p>
          
          <button
            onClick={resetSimulation}
            style={styles.tryAgainButton}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

// styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  scenarioCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  scenarioTitle: {
    color: '#d32f2f',
    marginTop: '0'
  },
  description: {
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '15px'
  },
  messageBox: {
    margin: '20px 0',
    textAlign: 'center'
  },
  messageImage: {
    maxWidth: '100%',
    height: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  question: {
    color: '#333',
    marginBottom: '15px'
  },
  optionsContainer: {
    marginBottom: '20px'
  },
  option: {
    display: 'block',
    padding: '12px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    transition: 'all 0.2s'
  },
  checkbox: {
    marginRight: '10px'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  feedbackBox: {
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  feedbackTitle: {
    marginTop: '0',
    textAlign: 'center'
  },
  tryAgainButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#34a853',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px'
  }
};

export default TextTrapSimulation;