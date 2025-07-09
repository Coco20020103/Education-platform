import { useNavigate } from 'react-router-dom';

const modules = [
  {
    title: "Password Practice",
    image: "/images/simulation/1.png",
    path: "/simulation/password",
    description: "Learn to create hack-resistant passwords"
  },
  {
    title: "Social Media Practice",
    image: "/images/simulation/2.png",
    path: "/simulation/social",
    description: "Identify risks in social media posts"
  },
  {
    title: "Scam Email Practice",
    image: "/images/simulation/3.png",
    path: "/simulation/scam",
    description: "Spot phishing emails"
  },
  {
    title: "Text Trap Practice",
    image: "/images/simulation/4.png",
    path: "/simulation/text",
    description: "Recognize fraudulent messages"
  }
];

export default function SimulationPage() {
  const navigate = useNavigate();

  return (
    <div className="content-card"> {/* 使用全局卡片样式 */}
      <div style={styles.container}>
        <h2 style={styles.header}>
          <span style={styles.icon}>🧩</span> Choose a Security Simulation
        </h2>
        <p style={styles.subtitle}>Practice your cyber defense skills through interactive scenarios</p>
        
        <div style={styles.grid}>
          {modules.map((mod, idx) => (
            <div 
              key={idx}
              style={styles.moduleCard}
              onClick={() => navigate(mod.path)}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={mod.image} 
                  alt={mod.title} 
                  style={styles.image}
                  loading="lazy"
                />
              </div>
              <div style={styles.textContainer}>
                <h3 style={styles.moduleTitle}>{mod.title}</h3>
                <p style={styles.moduleDesc}>{mod.description}</p>
                <div style={styles.learnMore}>
                  Start Practice <span style={styles.arrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5em',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    fontSize: '1.8em',
    marginBottom: '0.5em',
    color: '#00796b',
    fontWeight: '600'
  },
  icon: {
    marginRight: '0.3em',
    verticalAlign: 'middle'
  },
  subtitle: {
    textAlign: 'center',
    color: '#616161',
    marginBottom: '2em',
    fontSize: '1.1em'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5em'
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
      '& $learnMore': {
        color: '#00796b'
      }
    }
  },
  imageContainer: {
    height: '160px',
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
  textContainer: {
    padding: '1.2em'
  },
  moduleTitle: {
    fontSize: '1.3em',
    marginBottom: '0.5em',
    color: '#333'
  },
  moduleDesc: {
    color: '#616161',
    marginBottom: '1em',
    fontSize: '0.95em'
  },
  learnMore: {
    color: '#26a69a',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  },
  arrow: {
    marginLeft: '0.3em',
    transition: 'transform 0.3s ease',
    display: 'inline-block'
  }
};