import { fetchAll, fetchByName } from "../api/service";

export async function Search(input) {
  try {
    const array = await fetchByName(input);
    let result = [];
    array.forEach(function (arrayItem) {
      const item = extractContent(arrayItem);
      result.push(item);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getFavorites() {
  let favoritesArray = JSON.parse(localStorage.getItem("favorites"));
  if (!favoritesArray) {
    favoritesArray = [];
  }
  return favoritesArray;
}

export function Filter(dropdownValue, countries, favorites) {
  let result = [];
  if (dropdownValue === "All") {
    return countries;
  } else if (dropdownValue === "Favorite") {
    for (let i = 0; i < favorites.length; i++) {
      for (let j = 0; j < countries.length; j++) {
        if (favorites[i].name === countries[j].name) {
          result.push(countries[j]);
        }
      }
    }
    return result;
  } else {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].region === dropdownValue) {
        result.push(countries[i]);
      }
    }
    return result;
  }
}

export async function updateFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export async function getHomeContent() {
  try {
    const array = await fetchAll();
    let result = [];
    array.forEach(function (arrayItem) {
      const item = extractContent(arrayItem);
      result.push(item);
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

function extractContent(object) {
  const result = {
    name: object.name.common,
    population: object.population,
    region: object.region,
    capital: object.capital,
    flag: object.flags.svg,
    id: object.cca3,
    isFav: false,
  };
  return result;
}

export function getCardInfo(event, name, flag) {
  const data = {
    name: name,
    flag: flag,
  };
  event.dataTransfer.setData("text", JSON.stringify(data));
}

export function checkStar(event) {
  if (event.target.parentNode.classList.contains("selected")) {
    event.target.parentNode.classList.remove("selected");
    return true;
  } else {
    event.target.parentNode.classList.add("selected");
    return false;
  }
}
