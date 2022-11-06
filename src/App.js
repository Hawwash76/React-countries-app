import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/React-countries-app">
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="country" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
