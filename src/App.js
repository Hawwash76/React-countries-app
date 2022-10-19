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

const countriesArray = [
  {
    flag: "https://flagcdn.com/de.svg",
    name: "Germany",
    population: "81,770,900",
    region: "Europe",
    capital: "Berlin",
  },
  {
    flag: "https://flagcdn.com/us.svg",
    name: "United States",
    population: "323,947,000",
    region: "Americas",
    capital: "Washington D.C",
  },
  {
    flag: "https://flagcdn.com/br.svg",
    name: "Brazil",
    population: "206,135,893",
    region: "Americas",
    capital: "Brasilia",
  },
  {
    flag: "https://flagcdn.com/is.svg",
    name: "Iceland",
    population: "334,300",
    region: "Europe",
    capital: "Reykjavik",
  },
  {
    flag: "https://flagcdn.com/af.svg",
    name: "Asghanistan",
    population: "27,657,145",
    region: "Asia",
    capital: "Kabul",
  },
  {
    flag: "https://flagcdn.com/ax.svg",
    name: "Alan Islands",
    population: "28,875",
    region: "Europe",
    capital: "Mariehamn",
  },
  {
    flag: "https://flagcdn.com/al.svg",
    name: "Albania",
    population: "2,886,026",
    region: "Europe",
    capital: "Tirana",
  },
  {
    flag: "https://flagcdn.com/dz.svg",
    name: "Algeria",
    population: "40,400,000",
    region: "Africa",
    capital: "Algiers",
  },
];

var favoritesArray = [];
try {
  favoritesArray = JSON.parse(localStorage.getItem("favorites"));
} catch (error) {
  console.log(error);
}

function App() {
  localStorage.setItem("favorites",JSON.stringify([]))
  const [isDark, setIsDark] = useState();
  const [favorites, setFavorites] = useState(favoritesArray);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Header setIsDark={setIsDark} isDark={isDark} />
      <BrowserRouter basename="/React-countries-app">
        <Routes>
          <Route
            path="/React-countries-app"
            index
            element={
              <Home
                favorites={favorites}
                setFavorites={setFavorites}
                countries={countriesArray}
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
