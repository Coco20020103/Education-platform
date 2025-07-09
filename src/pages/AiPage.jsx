import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AiPage = () => {
  // Router hooks for navigation and params
  const { id } = useParams(); // Gets current lesson ID from URL
  const navigate = useNavigate(); // For programmatic navigation
  
  // Component state management
  const [messages, setMessages] = useState([]); // Chat message history
  const [input, setInput] = useState(''); // User input field
  const [isLoading, setIsLoading] = useState(false); // API loading state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar toggle
  const messagesEndRef = useRef(null); // For auto-scrolling to latest message
  
  // Course content configuration
  const courseData = {
    1: {
      title: "Password Security",
      prompt: "You are a cybersecurity expert teaching password security best practices. Explain concepts simply with emojis and examples for young learners.",
      welcome: "Hi! I'm your Password Security Assistant. Ask me anything about creating strong passwords, 2FA, or password managers! 🔐",
      icon: "🔐"
    },
    2: {
      title: "Phishing Awareness",
      prompt: "You are a phishing awareness specialist. Help users identify suspicious emails with clear examples and warnings.",
      welcome: "Hello! I'm your Phishing Detection Helper. Show me suspicious emails or ask how to spot scams! 🎣",
      icon: "🎣"
    },
    3: {
      title: "Mobile Security",
      prompt: "You are a mobile security consultant. Teach best practices for securing smartphones against theft and malware.",
      welcome: "Hi there! I'm your Mobile Security Guide. Ask about phone locking, app safety, or theft prevention! 📱",
      icon: "📱"
    },
    4: {
      title: "Social Media Privacy",
      prompt: "You are a social media privacy expert. Guide users on safe sharing practices and privacy settings.",
      welcome: "Welcome! I'm your Social Media Privacy Coach. Ask about safe sharing, friend lists, or work policies! 👥",
      icon: "👥"
    },
    5: {
      title: "Web Security",
      prompt: "You are a web security professional. Explain how to identify secure websites and avoid download scams.",
      welcome: "Hey! I'm your Web Safety Advisor. Ask about secure sites, URL checking, or safe downloads! 🌐",
      icon: "🌐"
    }
  };

  // Get current course or fallback to default
  const currentCourse = courseData[id] || {
    title: "Cybersecurity",
    prompt: "You are a helpful cybersecurity assistant.",
    welcome: "Hello! I'm your Cybersecurity Assistant. How can I help you today?",
    icon: "🛡️"
  };

  // Set welcome message when course changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: currentCourse.welcome }]);
  }, [id]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message submission to AI API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // API request to AI service
      const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_ALIYUN_KEY}`,
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            { role: 'system', content: currentCourse.prompt },
            ...messages.slice(-6),
            userMessage
          ]
        })
      });
      // Process API response
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I couldn't process that request. Please try again.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      // Error handling
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting to the AI service. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Collapsible sidebar navigation */}
      <div style={{ 
        ...styles.sidebar, 
        width: isSidebarCollapsed ? '60px' : '250px' 
      }}>
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={styles.collapseButton}
        >
          {isSidebarCollapsed ? '»' : '«'}
        </button>
        
        <h3 style={styles.sidebarTitle}>
          {!isSidebarCollapsed && 'Cybersecurity Courses'}
        </h3>
        
        <nav style={styles.nav}>
          {[1, 2, 3, 4, 5].map(lessonId => (
            <button
              key={lessonId}
              onClick={() => navigate(`/ai/${lessonId}`)}
              style={{
                ...styles.navButton,
                ...(id == lessonId ? styles.activeNavButton : {}),
                justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
              }}
            >
              <span style={styles.navIcon}>{courseData[lessonId].icon}</span>
              {!isSidebarCollapsed && (
                <>
                  <span style={styles.navText}>Lesson {lessonId}</span>
                  <span style={styles.navCourseTitle}>{courseData[lessonId].title}</span>
                </>
              )}
              {/* Navigation button content */}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ 
        ...styles.content, 
        marginLeft: isSidebarCollapsed ? '60px' : '250px' 
      }}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            {currentCourse.icon} {currentCourse.title} Assistant
          </h1>
          <p style={styles.subtitle}>
            Interactive learning module for {currentCourse.title.toLowerCase()} best practices
          </p>
        </header>

        <div style={styles.chatContainer}>
           {/* Message history display */}
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}
              >
                <div style={styles.messageContent}>
                  {msg.role === 'assistant' && (
                    <div style={styles.assistantAvatar}>🛡️</div>
                  )}
                  <div style={msg.role === 'assistant' ? styles.assistantText : styles.userText}>
                    {msg.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {/* Loading indicator */}
            {isLoading && (
              <div style={styles.assistantMessage}>
                <div style={styles.messageContent}>
                  <div style={styles.assistantAvatar}>🛡️</div>
                  <div style={styles.assistantText}>
                    <div style={styles.typingIndicator}>
                      <span>.</span><span>.</span><span>.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input form */}
          <form onSubmit={handleSubmit} style={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${currentCourse.title.toLowerCase()}...`}
              style={styles.inputField}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
  },
  sidebar: {
    position: 'fixed',
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem 0',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    zIndex: 100
  },
  collapseButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  sidebarTitle: {
    padding: '0 1.5rem',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.8rem 1.5rem',
    background: 'none',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  activeNavButton: {
    backgroundColor: '#3498db'
  },
  navIcon: {
    fontSize: '1.2rem',
    flexShrink: 0
  },
  navText: {
    fontWeight: '500',
    width: '60px',
    flexShrink: 0
  },
  navCourseTitle: {
    opacity: 0.8,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  content: {
    flex: 1,
    padding: '2rem',
    transition: 'margin-left 0.3s ease'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#7f8c8d',
    margin: 0
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 180px)',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  messages: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9'
  },
  messageContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem'
  },
  userMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  assistantMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem'
  },
  userText: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '18px 18px 0 18px',
    maxWidth: '80%',
    wordBreak: 'break-word',
    lineHeight: '1.5'
  },
  assistantText: {
    backgroundColor: 'white',
    color: '#333',
    padding: '0.8rem 1.2rem',
    borderRadius: '18px 18px 18px 0',
    maxWidth: '80%',
    wordBreak: 'break-word',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    lineHeight: '1.5'
  },
  assistantAvatar: {
    backgroundColor: '#e1f5fe',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0,
    color: '#2c3e50'
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    color: '#666',
  },
  inputForm: {
    display: 'flex',
    padding: '1rem',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: 'white'
  },
  inputField: {
    flex: 1,
    padding: '0.8rem 1.2rem',
    border: '1px solid #e0e0e0',
    borderRadius: '24px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.3s',
  },
  submitButton: {
    marginLeft: '0.8rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  }
};

export default AiPage;