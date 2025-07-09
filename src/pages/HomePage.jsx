import { useNavigate } from 'react-router-dom';

const caseList = [
  {
    id: 1,
    title: "Too Good to Be True? It Was.",
    image: "/images/homepage/case1.jpg",
    category: "Phishing Scam",
    difficulty: "★★★☆☆" // Visual difficulty rating
  },
  {
    id: 2,
    title: "Oops… That Wasn't What I Thought!",
    image: "/images/homepage/case2.jpg",
    category: "Social Engineering",
    difficulty: "★★☆☆☆"
  },
  {
    id: 3,
    title: "Not Your Average Snapchat Friend!",
    image: "/images/homepage/case3.jpg",
    category: "Impersonation",
    difficulty: "★★★★☆"
  },
  {
    id: 4,
    title: "Wait… Was That Even a Real Investment?",
    image: "/images/homepage/case4.jpg",
    category: "Financial Fraud",
    difficulty: "★★★★★"
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="content-card">
      <div style={styles.container}>
         {/* Page header with title and subtitle */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.icon}>🛡️</span> Cybersecurity Case Studies
          </h1>
          <p style={styles.subtitle}>
            Learn from real-world incidents and boost your digital defense skills
          </p>
        </header>

        {/* Grid layout for case study cards */}
        <div style={styles.grid}>
          {caseList.map(item => (
            <article 
              key={item.id} // Unique key for React rendering
              style={styles.card}
              onClick={() => navigate(`/home/case/${item.id}`)}// Navigate to case detail
            >
              <div style={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title} // Descriptive alt text
                  style={styles.image}
                  loading="lazy" // Optimize page loading
                />
                <div style={styles.difficulty}>
                  {item.difficulty}
                </div>
              </div>

               {/* Card content area */}
              <div style={styles.content}>
                <span style={styles.category}>{item.category}</span>
                <h3 style={styles.caseTitle}>{item.title}</h3>
                {/* Hover indicator for better UX */}
                <div style={styles.hoverIndicator}>
                  View Case Study <span style={styles.arrow}>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles for responsive design
const styles = {
  container: {
    padding: '2em 1em',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  // Header styles
  header: {
    textAlign: 'center',
    marginBottom: '3em'
  },
  title: {
    fontSize: '2.2em',
    color: '#00796b',
    marginBottom: '0.4em',
    fontWeight: '700'
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: '0.3em'
  },
  subtitle: {
    fontSize: '1.1em',
    color: '#616161',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
 // Responsive grid layout
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2em'
  },
  // Card styles with hover effects
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
      '& $hoverIndicator': {
        color: '#00796b',
        '& $arrow': {
          transform: 'translateX(3px)'
        }
      }
    }
  },
  // Image styling
  imageWrapper: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  // Difficulty badge styling
  difficulty: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '0.3em 0.8em',
    borderRadius: '20px',
    fontSize: '0.85em'
  },
  content: {
    padding: '1.5em'
  },
  category: {
    display: 'inline-block',
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    padding: '0.3em 0.8em',
    borderRadius: '4px',
    fontSize: '0.8em',
    fontWeight: '600',
    marginBottom: '0.8em'
  },
  caseTitle: {
    fontSize: '1.2em',
    marginBottom: '1em',
    color: '#333',
    lineHeight: '1.4'
  },
  hoverIndicator: {
    color: '#26a69a',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  arrow: {
    marginLeft: '0.3em',
    transition: 'transform 0.3s ease',
    display: 'inline-block'
  }
};