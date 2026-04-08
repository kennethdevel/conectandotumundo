export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}