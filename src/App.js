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
  const [details, setDetails] = useState({});
  const [params, setParams] = useState("");

  useEffect(() => {
    init(setIsDark, setFavorites, setCountries);
  }, []);

  useEffect(() => {
    changeTheme(isDark);
    localStorage.setItem("darkStatus", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    Search(input);
  }, [input]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    loadDetails(params, setDetails);
  }, [params]);

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
                countries={countries}
              />
            }
          />
          <Route
            path="country"
            element={
              <Details
                details={details}
                setDetails={setDetails}
                params={params}
                setParams={setParams}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function init(setIsDark, setFavorites, setCountries) {
  setIsDark(JSON.parse(localStorage.getItem("darkStatus")));
  getFavorites(setFavorites);
  getCountries(setCountries);
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

function Search(input) {
  clearTimeout(timeout);
  timeout = setTimeout(async function () {
    // if (input !== "") {
    //   const arr = await fetchByName(input);
    //   setCountries(arr);
    // } else {
    //   getCountries(setCountries);
    // }
  }, 1000);
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

async function loadDetails(params, setDetails) {
  const res = await fetch(
    "https://restcountries.com/v3.1/name/" +
      params +
      "?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  let nativeName = res[0].name.nativeName;
  let currencies = res[0].currencies;

  let tld = "";
  for (const tlds in res[0].tld) {
    tld = tld + res[0].tld[tlds] + ", ";
  }

  let languages = "";
  for (const langauge in res[0].languages) {
    languages = languages + res[0].languages[langauge] + ", ";
  }

  let borders = [];
  for (let i = 0; i < res[0].borders.length; i++) {
    borders[i] = await getBorderName(res[0].borders[i]);
  }
  let n = res[0].population;

  const object = {
    name: res[0].name.common,
    nativeName: nativeName[Object.keys(nativeName)[0]].common,
    population: n.toLocaleString(),
    region: res[0].region,
    subRegion: res[0].subregion,
    capital: res[0].capital,
    tld: tld.substring(0, tld.length - 2),
    currencies: currencies[Object.keys(currencies)].name,
    languages: languages.substring(0, languages.length - 2),
    flag: res[0].flags.svg,
    borders: borders,
  };

  setDetails(object);
}

async function getBorderName(border) {
  const res = await fetch(
    "https://restcountries.com/v3.1/alpha/" + border + "?fields=name,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  return res.name.common;
}
