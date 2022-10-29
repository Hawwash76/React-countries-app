import { useState, useEffect } from "react";
import {
  Search,
  getFavorites,
  Filter,
  updateFavorites,
  getHomeContent,
} from "../../functions/HomeFunction";
import InputWithIcon from "../../Components/InuptWithIcon/InputWithIcon";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Favorites from "./Favorites/Favorites";
import Loader from "../../Components/Loader/Loader";
import CardContainer from "./CardContainer/CardContainer";
import { ReactComponent as SearchIcon } from "../../assets/Icons/magnifying-glass-solid.svg";
import { dropdownItems } from "../../static-data.js";

export default function Home() {
  const [input, setInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [modifiedContent, setModifiedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFavorites(getFavorites());

    getHomeContent()
      .then((result) => {
        setCountries(result);
        //
        setModifiedContent(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (input === "") {
      getHomeContent()
        .then((result) => {
          setCountries(result);
          setModifiedContent(result);
        })
        .finally();
    } else {
      Search(input).then((result) => {
        setCountries(result);
        setModifiedContent(result);
      });
    }
  }, [input]);

  useEffect(() => {
    updateFavorites(favorites);
    //
  }, [favorites]);

  useEffect(() => {
    const result = Filter(dropdownValue, countries, favorites);
    setModifiedContent(result);
    // eslint-disable-next-line
  }, [dropdownValue]);

  useEffect(() => {
    for (let country of countries) {
      if (favorites.some((item) => item.name === country.name)) {
        country.isFav = true;
      }
    }
    setModifiedContent(countries);
  }, [countries]);

  return (
    <div className="container home-wrapper">
      <section className="home-filter">
        <InputWithIcon
          placeholder="Search for a country..."
          setInput={setInput}
        >
          <SearchIcon />
        </InputWithIcon>
        <Dropdown
          placeholder="Filter by"
          dropdownItems={dropdownItems}
          setDropdownValue={setDropdownValue}
          dropdownValue={dropdownValue}
        />
      </section>
      <section className="main-content">
        <Favorites favorites={favorites} setFavorites={setFavorites} />
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <CardContainer
            countries={modifiedContent}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </section>
    </div>
  );
}
