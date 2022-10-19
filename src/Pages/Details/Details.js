import { Link } from "react-router-dom";
import BorderCountries from "../../Components/BorderCountries/BorderCountries";
import { ReactComponent as BackIcon } from "../../assets/Icons/arrow-left-solid.svg";
import DetailsItem from "../../Components/DetailsItem";

export default function Details({ details }) {
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
            src="https://flagcdn.com/de.svg"
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
          <BorderCountries countries={details.borders} />
        </div>
      </section>
    </div>
  );
}

/* <Link to="/">Home</Link> */
