import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import { useState, useEffect } from "react";
import { changeTheme } from "./functions/ThemeFunctions";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(JSON.parse(localStorage.getItem("darkStatus")));
  }, []);

  useEffect(() => {
    changeTheme(isDark);
    localStorage.setItem("darkStatus", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <>
      <BrowserRouter basename="/React-countries-app">
        <Header isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="country" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
