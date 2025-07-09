// Reusable button component with customizable props
export function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}      // Handles click events
      disabled={disabled}   // Disables button if true
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 ${className}`} 
      // Base styles + custom classes (blue bg, white text, hover effect, disabled state)
    >
      {children}  {/* Content inside the button (text/icon) */}
    </button>
  );
}