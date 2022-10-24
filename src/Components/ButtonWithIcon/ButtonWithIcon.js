export default function ButtonWithIcon({ children, text }) {
  return (
    <div className="header-icon-wrapper">
        {children}
      <button className="header-button">{text}</button>
    </div>
  );
}
