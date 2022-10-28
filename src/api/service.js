export async function fetchAll() {
  const result = await fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));
  return result;
}

export async function fetchByName(name) {
  const result = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,population,region,capital,flags,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  return result;
}

export async function fetchByNameDetails(name) {
  const result = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  return result;
}
