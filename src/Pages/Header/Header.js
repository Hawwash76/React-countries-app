import { ReactComponent as MoonIcon } from "../../assets/Icons/moon-regular.svg";
import ButtonWithIcon from "../../Components/ButtonWithIcon/ButtonWithIcon";
import { useState, useEffect } from "react";
import { changeTheme } from "../../utils/Theme";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(JSON.parse(localStorage.getItem("darkStatus")));
  }, []);

  useEffect(() => {
    changeTheme(isDark);
    localStorage.setItem("darkStatus", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <header children className="container header">
      <div className="header-text-wrapper">
        <span className="header-text">Where in the world</span>
      </div>
      <div>
        <ButtonWithIcon
          text={"Dark Mode"}
          isDark={isDark}
          setIsDark={setIsDark}
        >
          <MoonIcon className="header-icon" />
        </ButtonWithIcon>
      </div>
    </header>
  );
}
