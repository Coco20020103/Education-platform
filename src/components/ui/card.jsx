// A white card with shadow and rounded corners (reusable container)
export function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 ${className}`}>
      {children} 
    </div>
  );
}

// Wrapper for card content (optional, improves readability)
export function CardContent({ children }) {
  return <div>{children}</div>;  {/* Plain container for inner content */}
}