export default function ButtonWithIcon({ children, text, isDark, setIsDark }) {
  return (
    <div className="header-icon-wrapper">
      <button
        className="header-button"
        onClick={() => (isDark ? setIsDark(false) : setIsDark(true))}
      >
        {children}
        {text}
      </button>
    </div>
  );
}
