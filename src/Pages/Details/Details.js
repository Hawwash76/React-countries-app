import { Link, useSearchParams } from "react-router-dom";
import BorderCountries from "../../Components/BorderCountries/BorderCountries";
import { ReactComponent as BackIcon } from "../../assets/Icons/arrow-left-solid.svg";
import DetailsItem from "../../Components/DetailsItem";
import { useEffect, useState } from "react";

export default function Details() {
  const [searchParams] = useSearchParams();
  const [details,setDetails]=useState({});

  useEffect(() => {
    loadDetails(searchParams.get('name'),setDetails);
  }, []);

  return (
    <div className="container details-container">
      <div className="back-button-container">
        <Link className="back-button rounded-border box-shadow link" to="/">
          <BackIcon className="back-icon" />
          Back
        </Link>
      </div>
      <section className="details-content">
        <div className="details-img-wrapper">
          <img
            src={details.flag}
            className="details-img"
            alt="flag"
          />
        </div>
        <div className="country-details">
          <span className="country-details-header">{details.name}</span>
          <div className="details-items">
            <div>
              <DetailsItem
                decleration={"Native Name"}
                data={details.nativeName}
              />
              <DetailsItem
                decleration={"Population"}
                data={details.population + ""}
              />
              <DetailsItem decleration={"Region"} data={details.region} />
              <DetailsItem
                decleration={"Sub Region"}
                data={details.subRegion}
              />
              <DetailsItem decleration={"Capital"} data={details.capital} />
            </div>
            <div>
              <DetailsItem
                decleration={"Top Level Domain"}
                data={details.tld}
              />
              <DetailsItem
                decleration={"Currencies"}
                data={details.currencies}
              />
              <DetailsItem decleration={"Languages"} data={details.languages} />
            </div>
          </div>
          {/* <BorderCountries countries={details.borders} /> */}
        </div>
      </section>
    </div>
  );
}

async function loadDetails(name,setDetails) {
  const res = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
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

  setDetails(object)
}

async function getBorderName(border) {
  const res = await fetch(
    "https://restcountries.com/v3.1/alpha/" + border + "?fields=name,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error is :" + err));

  return res.name.common;
}

