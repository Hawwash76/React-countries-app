import { fetchByNameDetails } from "../api/service";

export async function getDetails(name) {
  try {
    const details = await fetchByNameDetails(name);
    const result = await extractDetails(details[0]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function extractDetails(object) {
  let nativeName = object.name.nativeName;
  let currencies = object.currencies;
  let borders = [];
  for (let i = 0; i < object.borders.length; i++) {
    borders[i] = await getBorderName(object.borders[i]);
  }

  let languages = [];
  for (const langauge in object.languages) {
    languages.push(object.languages[langauge]);
  }


  const result = {
    name: object.name.common,
    nativeName: nativeName[Object.keys(nativeName)[0]].common,
    population: object.population.toLocaleString(),
    region: object.region,
    subRegion: object.subregion,
    capital: object.capital[0],
    tld: object.tld,
    currencies: currencies[Object.keys(currencies)].name,
    languages: languages,
    flag: object.flags.svg,
    borders: borders,
  };

  return result;
}

export async function getBorderName(name) {
  const res = await fetch(
    "https://restcountries.com/v3.1/alpha/" + name + "?fields=name,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  return res.name.common;
}
