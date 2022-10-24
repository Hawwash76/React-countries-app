import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/Icons/arrow-left-solid.svg";
import LabelWithText from "../../Components/LabelWithText/LabelWithText";
import Loader from "../../Components/Loader/Loader";
import Borders from "./Borders/Borders";

export default function Detail() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDetails(searchParams.get("name"), setDetails, setIsLoading);
  }, []);

  return (
    <div className="container details-container">
      <div className="back-button-container">
        <Link className="back-button rounded-border box-shadow link" to="/">
          <BackIcon className="back-icon" />
          Back
        </Link>
      </div>

      {isLoading ? (
        <div style={{ marginTop: "10rem" }}>
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      ) : (
        <section className="details-content">
          <div className="details-img-wrapper">
            <img src={details.flag} className="details-img" alt="flag" />
          </div>
          <div className="country-details">
            <span className="country-details-header">{details.name}</span>
            <div className="details-items">
              <div>
                <LabelWithText
                  label={"Native Name"}
                  text={details.nativeName}
                />
                <LabelWithText
                  label={"Population"}
                  text={details.population + ""}
                />
                <LabelWithText label={"Region"} text={details.region} />
                <LabelWithText label={"Sub Region"} text={details.subRegion} />
              </div>
              <div>
                <LabelWithText label={"Top Level Domain"} text={details.tld} />
                <LabelWithText label={"Currencies"} text={details.currencies} />
                <LabelWithText label={"Languages"} text={details.languages} />
              </div>
            </div>
            <Borders borders={details.borders} />
          </div>
        </section>
      )}
    </div>
  );
}

async function loadDetails(params, setDetails, setIsLoading) {
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
  setIsLoading(false);
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
