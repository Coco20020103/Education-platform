import { useState } from 'react';

const PhishingEmailPractice = () => {
  // Email example data
  const phishingEmail = {
    sender: "services@paypal-accounts.com",
    subject: "Your PayPal account is limited",
    content: `
      Dear PayPal customer,\n\n
      Your PayPal account is limited. You have 24 hours to solve the problem or your account will be permanently disabled.\n\n
      We are sorry to inform you that you no longer have access to PayPal's advantages like purchasing, and sending and receiving money.\n\n
      Why is my PayPal account limited?\n
      We believe that your account is in danger from unauthorized users.\n\n
      What can I do to resolve the problem?\n
      You have to confirm all of your account details on our account server by clicking the link below and following the steps.
    `,
    redFlags: [
      "Sender's email domain is suspicious (not @paypal.com)",
      "Contains urgent threats ('24 hours to solve')",
      "Requests sensitive information via link",
      "Uses generic greeting ('Dear PayPal customer')"
    ],
    deceptiveLink: "https://paypal-accounts.secure-login.com"
  };

  // User state management
  const [userResponse, setUserResponse] = useState(null);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Handle user selection
  const handleFlagSelection = (flag) => {
    if (selectedFlags.includes(flag)) {
      setSelectedFlags(selectedFlags.filter(f => f !== flag));
    } else {
      setSelectedFlags([...selectedFlags, flag]);
    }
  };

  // Check answers
  const checkAnswers = () => {
    const allCorrect = phishingEmail.redFlags.every(flag => 
      selectedFlags.includes(flag)
    );
    
    if (allCorrect && selectedFlags.length === phishingEmail.redFlags.length) {
      return "perfect";
    } else if (selectedFlags.length > 0) {
      return "partial";
    } else {
      return "incorrect";
    }
  };

  // Submit handler
  const handleSubmit = () => {
    setShowAnalysis(true);
  };

  // Reset practice
  const resetPractice = () => {
    setUserResponse(null);
    setSelectedFlags([]);
    setShowAnalysis(false);
  };

  return (
    <div className="content-card">
      <h2 style={styles.header}>📧 Phishing Email Practice</h2>

      <div style={styles.emailContainer}>
        {/* Email header */}
        <div style={styles.emailHeader}>
          <p><strong>Sender:</strong> {phishingEmail.sender}</p>
          <p><strong>Subject:</strong> {phishingEmail.subject}</p>
        </div>

        {/* Email content */}
        <div style={styles.emailBody}>
          {phishingEmail.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <button style={styles.fakeLinkButton}>
            Confirm Your Information
          </button>
        </div>
      </div>

      {!showAnalysis ? (
        <>
          {/* Phase 1: Initial judgment */}
          <div style={styles.questionGroup}>
            <h3 style={styles.question}>Is this a phishing email?</h3>
            <label style={styles.option}>
              <input
                type="radio"
                name="phishing"
                checked={userResponse === 'phishing'}
                onChange={() => setUserResponse('phishing')}
              />
              <span>✅ Yes, it is.</span>
            </label>
            <label style={styles.option}>
              <input
                type="radio"
                name="phishing"
                checked={userResponse === 'legit'}
                onChange={() => setUserResponse('legit')}
              />
              <span>❌ No, it isn't. </span>
            </label>
            <label style={styles.option}>
              <input
                type="radio"
                name="phishing"
                checked={userResponse === 'unsure'}
                onChange={() => setUserResponse('unsure')}
              />
              <span>🤔 Not sure. </span>
            </label>
          </div>

          {/* Phase 2: Detailed analysis (only if user selected "Yes") */}
          {userResponse === 'phishing' && (
            <div style={styles.questionGroup}>
              <h3 style={styles.question}>Select all suspicious signs (multiple choice)</h3>
              {phishingEmail.redFlags.map((flag, index) => (
                <label key={index} style={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedFlags.includes(flag)}
                    onChange={() => handleFlagSelection(flag)}
                  />
                  <span>{flag}</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={userResponse === null || (userResponse === 'phishing' && selectedFlags.length === 0)}
            style={styles.submitButton}
          >
            {userResponse === null ? 'Submit your choice' : 'Verify your choice'}
          </button>
        </>
      ) : (
        /* Results feedback */
        <div style={styles.feedback}>
          {userResponse === 'legit' ? (
            <>
              <h3 style={styles.errorTitle}>❌ Incorrect Judgment</h3>
              <p>This is actually a phishing email! Let's analyze why:</p>
              <ul style={styles.flagList}>
                {phishingEmail.redFlags.map((flag, i) => (
                  <li key={i}>🔍 {flag}</li>
                ))}
              </ul>
            </>
          ) : userResponse === 'unsure' ? (
            <>
              <h3 style={styles.errorTitle}>⚠️ You were unsure</h3>
              <p>This is a phishing email. Here are the warning signs:</p>
              <ul style={styles.flagList}>
                {phishingEmail.redFlags.map((flag, i) => (
                  <li key={i}>🔍 {flag}</li>
                ))}
              </ul>
            </>
          ) : (
            /* User selected "Yes" (phishing) */
            checkAnswers() === "perfect" ? (
              <>
                <h3 style={styles.successTitle}>🎉 Perfect Detection!</h3>
                <p>You successfully identified all phishing indicators:</p>
                <ul style={styles.flagList}>
                  {phishingEmail.redFlags.map((flag, i) => (
                    <li key={i}>✔️ {flag}</li>
                  ))}
                </ul>
              </>
            ) : checkAnswers() === "partial" ? (
              <>
                <h3 style={styles.partialTitle}>⚠️ Partially Correct</h3>
                <p>You found some issues but missed others:</p>
                <ul style={styles.flagList}>
                  {phishingEmail.redFlags.map((flag, i) => (
                    <li key={i} style={{
                      color: selectedFlags.includes(flag) ? 'green' : 'red'
                    }}>
                      {selectedFlags.includes(flag) ? '✔️' : '❌'} {flag}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3 style={styles.errorTitle}>❌ Needs Improvement</h3>
                <p>This is a typical phishing email with these characteristics:</p>
                <ul style={styles.flagList}>
                  {phishingEmail.redFlags.map((flag, i) => (
                    <li key={i}>🔍 {flag}</li>
                  ))}
                </ul>
              </>
            )
          )}

          <div style={styles.tipBox}>
            <h4>💡 Security Tips</h4>
            <p>1. Official emails will address you by name, not generic terms</p>
            <p>2. PayPal's official domain is @paypal.com</p>
            <p>3. Never click suspicious links in emails</p>
          </div>

          <button
            onClick={resetPractice}
            style={styles.tryAgainButton}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

// Styles (保持不变)
const styles = {
  header: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '1.5rem',
  },
  emailContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '2rem',
    backgroundColor: '#f9f9f9',
  },
  emailHeader: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#e3f2fd',
  },
  emailBody: {
    padding: '1.5rem',
    whiteSpace: 'pre-line',
    lineHeight: '1.6',
  },
  fakeLinkButton: {
    display: 'inline-block',
    margin: '1rem 0',
    padding: '0.5rem 1rem',
    backgroundColor: '#0070ba',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  questionGroup: {
    margin: '1.5rem 0',
  },
  question: {
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  option: {
    display: 'block',
    margin: '0.8rem 0',
    padding: '0.8rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  submitButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#4fc3f7',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  feedback: {
    padding: '1.5rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  successTitle: {
    color: '#2e7d32',
    textAlign: 'center',
  },
  partialTitle: {
    color: '#ff8f00',
    textAlign: 'center',
  },
  errorTitle: {
    color: '#c62828',
    textAlign: 'center',
  },
  flagList: {
    margin: '1rem 0',
    paddingLeft: '1.5rem',
  },
  tipBox: {
    margin: '1.5rem 0',
    padding: '1rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
  },
  tryAgainButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default PhishingEmailPractice;