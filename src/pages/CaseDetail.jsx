import { useParams, useNavigate } from 'react-router-dom';

// Case study database
const caseDetails = {
  1: {
    title: "Too Good to Be True? It Was.",
    image: "/images/homepage/case1.jpg",
    description: "A student received an email claiming they won a free iPhone. After clicking the link and entering personal details, their social media accounts were hacked.",
    lessons: [
      "Never trust unsolicited prize notifications",
      "Check sender email addresses carefully",
      "Look for poor grammar in messages"
    ]
  },
  2: {
    title: "Oops… That Wasn't What I Thought!",
    image: "/images/homepage/case2.jpg",
    description: "A fake game mod installation secretly installed malware that stole saved passwords from the victim's browser.",
    lessons: [
      "Only download software from official stores",
      "Read installation prompts carefully",
      "Use separate passwords for different accounts"
    ]
  },
  3: {
    title: "Not Your Average Snapchat Friend!",
    image: "/images/homepage/case3.jpg",
    description: "A stranger posing as a classmate sent malicious links through Snapchat, compromising the victim's device.",
    lessons: [
      "Verify unknown contacts before accepting requests",
      "Don't click links from untrusted sources",
      "Enable two-factor authentication"
    ]
  },
  4: {
    title: "Wait… Was That Even a Real Investment?",
    image: "/images/homepage/case4.jpg",
    description: "A fake cryptocurrency investment platform stole funds from inexperienced investors.",
    lessons: [
      "Research investment platforms thoroughly",
      "Be wary of 'guaranteed returns' promises",
      "Never invest more than you can afford to lose"
    ]
  }
};

export default function CaseDetail() {
  // Router hooks for navigation and parameter handling
  const { id } = useParams(); // Gets case ID from URL
  const navigate = useNavigate(); // For page navigation
  
  // Validate case ID and get current case data
  const caseId = parseInt(id, 10);
  const isValidCase = !isNaN(caseId) && caseDetails[caseId]; // To ensure the converted caseId is a valid number and Verify/Check if the ID exists in the data
  const currentCase = isValidCase ? caseDetails[caseId] : null; // If  else

  // Handle invalid case IDs
  if (!currentCase) {
    return (
      <div className="content-card">
        <div style={styles.container}>
          <h2 style={styles.errorTitle}>Case Not Found</h2>
          <button 
            onClick={() => navigate('/')} // Return to homepage
            style={styles.homeButton}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-card">
      <div style={styles.container}>
        {/* Back navigation button */}
        <button 
          onClick={() => navigate(-1)} // Browser history back
          style={styles.backButton}
          aria-label="Back to cases"
        >
          ← Back to Cases
        </button>

        {/* Case title */}
        <h1 style={styles.title}>{currentCase.title}</h1>
        
        {/* Case study image with lazy loading */} 
        <div style={styles.imageContainer}>
          <img 
            src={currentCase.image} 
            alt={currentCase.title} 
            style={styles.image}
            loading="lazy" // Optimizes page loading
          />
        </div>

        {/* Case description section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📌 What Happened</h2>
          <p style={styles.description}>{currentCase.description}</p>
        </section>

        {/* Security lessons section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔍 Key Lessons</h2>
          <ul style={styles.lessonsList}>
            {currentCase.lessons.map((lesson, index) => (
              <li key={index} style={styles.lessonItem}>
                <span style={styles.bullet}>•</span> {lesson}
              </li>
            ))}
          </ul>
        </section>
        
        {/* Case navigation controls */}
        <div style={styles.navigation}>
          <button 
            onClick={() => navigate(`/home/case/${caseId - 1}`)} 
            disabled={caseId <= 1} // Disable on first case
            style={styles.navButton}
          >
            Previous Case
          </button>
          <button 
            onClick={() => navigate(`/home/case/${caseId + 1}`)} 
            disabled={caseId >= Object.keys(caseDetails).length} // Disable on last case
            style={styles.navButton}
          >
            Next Case
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: '1.5em',
    maxWidth: '800px',
    margin: '0 auto', 
  },
  errorTitle: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: '1em'
  },
  homeButton: {
    display: 'block',
    margin: '0 auto',
    padding: '0.8em 1.5em',
    backgroundColor: '#4fb3bf',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#0288d1',
    cursor: 'pointer',
    fontSize: '1em',
    marginBottom: '1.5em',
    padding: '0.5em 1em',
    borderRadius: '6px',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#e1f5fe'
    }
  },
  title: {
    color: '#00796b',
    fontSize: '1.8em',
    marginBottom: '1em',
    textAlign: 'center'
  },
  imageContainer: {
    margin: '1.5em 0',
    textAlign: 'center'
  },
  image: {
    maxWidth: '100%', 
    maxHeight: '400px', 
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
    border: '2px solid #b2ebf2',
    objectFit: 'cover' 
  },
  section: {
    margin: '2em 0'
  },
  sectionTitle: {
    color: '#0288d1',
    fontSize: '1.3em',
    marginBottom: '0.8em',
    borderBottom: '2px solid #b2ebf2',
    paddingBottom: '0.3em'
  },
  description: {
    lineHeight: '1.6',
    fontSize: '1.1em',
    color: '#333',
    whiteSpace: 'pre-line'
  },
  lessonsList: {
    paddingLeft: '1.5em',
    margin: 0
  },
  lessonItem: {
    margin: '0.8em 0',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'flex-start'
  },
  bullet: {
    color: '#0288d1',
    marginRight: '0.5em',
    fontSize: '1.2em'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2em',
    gap: '1em'
  },
  navButton: {
    backgroundColor: '#4fb3bf',
    color: 'white',
    border: 'none',
    padding: '0.8em 1.5em',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'all 0.2s',
    flex: 1,
    ':hover': {
      backgroundColor: '#00838f'
    },
    ':disabled': {
      backgroundColor: '#bdbdbd',
      cursor: 'not-allowed'
    }
  }
};