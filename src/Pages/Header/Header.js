import { ReactComponent as MoonIcon } from "../../assets/Icons/moon-regular.svg";
import ButtonWithIcon from "../../Components/ButtonWithIcon/ButtonWithIcon";

export default function Header({isDark,setIsDark}) {
  return (
    <header children className="container header">
      <div className="header-text-wrapper">
        <span className="header-text">Where in the world</span>
      </div>
      <div>
        <ButtonWithIcon text={"Dark Mode"} isDark={isDark} setIsDark={setIsDark}>
          <MoonIcon className="header-icon" />
        </ButtonWithIcon>
      </div>
    </header>
  );
}