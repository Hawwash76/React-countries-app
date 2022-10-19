import { ReactComponent as MoonIcon } from "../../assets/Icons/moon-regular.svg";

export default function Header({ setIsDark, isDark }) {
  function handleTheme() {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }

  return (
    <header>
      <div className="container header">
        <div className="header-text-wrapper">
          <span className="header-text">Where in the world</span>
        </div>
        <div className="header-icon-wrapper">
          <MoonIcon className="header-icon" />
          <button
            onClick={() => {
              handleTheme();
            }}
            className="header-button"
          >
            Dark Mode
          </button>
        </div>
      </div>
    </header>
  );
}
