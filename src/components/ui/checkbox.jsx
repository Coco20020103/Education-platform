// Reusable checkbox input with controlled state  
export function Checkbox({ id, checked, onCheckedChange }) {  
  return (  
    <input  
      id={id}                  // Unique ID for label association  
      type="checkbox"          // HTML checkbox input  
      checked={checked}       // Controlled checked state  
      onChange={() => onCheckedChange(id)}  // Notifies parent on toggle  
      className="w-4 h-4"     // Standard size (Tailwind)  
    />  
  );  
}  