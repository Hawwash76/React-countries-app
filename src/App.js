import "./App.css";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const countryDetail = {
  name: "Belguim",
  nativeName: "Belgie",
  population: 11319511,
  region: "Europe",
  subRegion: "Western Europe",
  capital: "Brussels",
  tld: ".be",
  currencies: ["Euro"],
  languages: ["Dutch", "French", "German"],
  borders: ["France", "Germany", "Netherlands"],
};

const dropdownItems = [
  "All",
  "Favorite",
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Ocenia",
];

function App() {
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    init(setIsDark, setFavorites, setCountries);
  }, []);

  useEffect(() => {
    changeTheme(isDark);
    localStorage.setItem("darkStatus", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    test(input, setCountries);
  }, [input]);

  return (
    <>
      <Header setIsDark={setIsDark} isDark={isDark} />
      <BrowserRouter basename="/React-countries-app">
        <Routes>
          <Route
            path="/"
            index
            element={
              <Home
                favorites={favorites}
                setFavorites={setFavorites}
                countries={countries}
                setInput={setInput}
                dropdownItems={dropdownItems}
              />
            }
          />

          <Route path="country" element={<Details details={countryDetail} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

function init(setIsDark, setFavorites, setCountries) {
  getDarkStatus(setIsDark);
  getFavorites(setFavorites);
  getCountries(setCountries);
}

function getDarkStatus(setIsDark) {
  const status = JSON.parse(localStorage.getItem("darkStatus"));
  setIsDark(status);
}

function changeTheme(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty("--White", "#2b3945");
    document.documentElement.style.setProperty("--Very-Light-Gray", "#202c37");
    document.documentElement.style.setProperty("--Font-primary", "#ffffff");
    document.documentElement.style.setProperty("--Font-secondary", "#ffffff");
    document.documentElement.style.setProperty("--Dark-blue", "white");
  } else {
    document.documentElement.style.setProperty("--White", "#ffffff");
    document.documentElement.style.setProperty("--Very-Light-Gray", "#fafafa");
    document.documentElement.style.setProperty("--Font-primary", "black");
    document.documentElement.style.setProperty("--Font-secondary", "grey");
    document.documentElement.style.setProperty("--Dark-blue", "#2b3945");
  }
}

function getFavorites(setFavorites) {
  const favoritesArray = JSON.parse(localStorage.getItem("favorites"));
  if (favoritesArray) {
    setFavorites(favoritesArray);
  }
}

async function getCountries(setCountries) {
  const res = await fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  for (let i = 0; i < res.length; i++) {
    let population = res[i].population;
    let isFavorite = false;

    const object = {
      name: res[i].name.common,
      population: population.toLocaleString(),
      region: res[i].region,
      capital: res[i].capital,
      flag: res[i].flags.svg,
      favorites: isFavorite,
    };
    setCountries((items) => [...items, object]);
  }
}

async function fetchByName(name) {
  let arr = [];
  const res = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,population,region,capital,flags,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  for (let i = 0; i < res.length; i++) {
    let n = res[i].population;

    const object = {
      name: res[i].name.common,
      population: n.toLocaleString(),
      region: res[i].region,
      capital: res[i].capital,
      flag: res[i].flags.svg,
    };
    arr.push(object);
  }

  return arr;
}

async function test(input, setCountries) {
  if (input !== "") {
    const arr = await fetchByName(input);
    setCountries(arr);
  }
}
