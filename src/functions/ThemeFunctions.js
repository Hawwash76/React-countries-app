export function changeTheme(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty("--White", "#2b3945");
    document.documentElement.style.setProperty("--Very-Light-Gray", "#202c37");
    document.documentElement.style.setProperty("--Font-primary", "#ffffff");
    document.documentElement.style.setProperty("--Font-secondary", "#ffffff");
    document.documentElement.style.setProperty("--Dark-blue", "white");
    document.documentElement.style.setProperty("--Button-clr", "rgb(90, 89, 89)");
  } else {
    document.documentElement.style.setProperty("--White", "#ffffff");
    document.documentElement.style.setProperty("--Very-Light-Gray", "#fafafa");
    document.documentElement.style.setProperty("--Font-primary", "black");
    document.documentElement.style.setProperty("--Font-secondary", "grey");
    document.documentElement.style.setProperty("--Dark-blue", "#2b3945");
    document.documentElement.style.setProperty("--Button-clr", "#f1efef");

  }
}
