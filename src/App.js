import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dropdown_Items } from "./static-data.js";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";

let timeout = null;

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [input, setInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [modifiedContent, setModifiedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init(
      setIsDark,
      setFavorites,
      setCountries,
      setIsLoading,
      setModifiedContent
    );
  }, []);

  useEffect(() => {
    changeTheme(isDark);
    localStorage.setItem("darkStatus", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    Search(input, setCountries);
  }, [input]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    Filter(dropdownValue, countries, setModifiedContent, favorites);
  }, [dropdownValue]);

  useEffect(() => {
    setModifiedContent(countries);
  }, [countries]);

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <BrowserRouter basename="/React-countries-app">
        <Routes>
          <Route
            path="/"
            index
            element={
              <Home
                setInput={setInput}
                Dropdown_Items={Dropdown_Items}
                setDropdownValue={setDropdownValue}
                dropdownValue={dropdownValue}
                favorites={favorites}
                setFavorites={setFavorites}
                countries={modifiedContent}
                isLoading={isLoading}
              />
            }
          />
          <Route path="country" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

async function init(
  setIsDark,
  setFavorites,
  setCountries,
  setIsLoading,
  setModifiedContent
) {
  setIsDark(JSON.parse(localStorage.getItem("darkStatus")));
  setFavorites(getFavorites());
  setCountries(await getCountries());
  setModifiedContent(await getCountries());
  setIsLoading(false);
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

function Search(input, setCountries) {
  clearTimeout(timeout);
  timeout = setTimeout(async function () {
    let result = [];
    if (input !== "") {
      result = await fetchByName(input);
    } else {
      result = await getCountries();
    }
    setCountries(result);
  }, 1000);
}

function getFavorites() {
  let favoritesArray = JSON.parse(localStorage.getItem("favorites"));
  if (!favoritesArray) {
    favoritesArray = [];
  }
  return favoritesArray;
}

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  const arr = [];

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
    arr.push(object);
  }

  return arr;
}

function Filter(dropdownValue, countries, setModifiedContent, favorites) {
  let result = [];
  if (dropdownValue === "All") {
    setModifiedContent(countries);
  } else if (dropdownValue === "Favorite") {
    for (let i = 0; i < favorites.length; i++) {
      for (let j = 0; j < countries.length; j++) {
        if (favorites[i].name === countries[j].name) {
          result.push(countries[j]);
        }
      }
    }
    setModifiedContent(result);
  } else {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].region === dropdownValue) {
        result.push(countries[i]);
      }
    }
    setModifiedContent(result);
  }
}

async function fetchByName(name) {
  const res = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,population,region,capital,flags,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  const arr = [];

  for (let i = 0; i < res.length; i++) {
    let population = res[i].population;
    const object = {
      name: res[i].name.common,
      population: population.toLocaleString(),
      region: res[i].region,
      capital: res[i].capital,
      flag: res[i].flags.svg,
    };
    arr.push(object);
  }

  return arr;
}
