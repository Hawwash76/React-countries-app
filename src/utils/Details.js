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
  const nativeName = object.name.nativeName;
  const currencies = object.currencies;
  const borders = await refactorBorders(object.borders);
  const languages = refactorLanguages(object.languages);

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

async function refactorBorders(borders) {
  let result = [];
  for (let i = 0; i < borders.length; i++) {
    result[i] = await getBorderName(borders[i]);
  }

  return result;
}

function refactorLanguages(languages) {
  let result = [];
  for (const langauge in languages) {
    result.push(languages[langauge]);
  }
  return result;
}
