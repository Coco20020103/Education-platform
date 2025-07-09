import { Link } from "react-router-dom";

// Navigation bar component with logo and menu links
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo with styled span for accent color */}
      <div style={styles.logo}>
        Mr.<span style={{ color: "#4fd1c5" }}>Cyber</span>
      </div>
      
      {/* Navigation links using react-router */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/video" style={styles.link}>Video</Link>
        <Link to="/simulation" style={styles.link}>Simulation</Link>
        <Link to="/ai" style={styles.link}>AI Robot</Link>
      </div>
    </nav>
  );
};

// CSS-in-JS styles object
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",  // Space between logo and links
    alignItems: "center",             // Vertical alignment
    padding: "1em 2em",               // Top/bottom and left/right padding
    backgroundColor: "#ffffff",       // White background
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",  // Subtle shadow
    position: "sticky",               // Sticks to top on scroll
    top: 0,
    zIndex: 100,                      // Ensures navbar stays above other content
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",               // Bold text for logo
  },
  links: {
    display: "flex",
    gap: "1.5em",                     // Space between links
  },
  link: {
    textDecoration: "none",           // Removes underline
    color: "#333",                    // Dark gray text
    fontWeight: "500",                // Medium font weight
  },
};

export default Navbar;