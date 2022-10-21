import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/Icons/arrow-left-solid.svg";
import LabelWithText from "../../Components/LabelWithText/LabelWithText";

export default function Detail({ details, setParams }) {
  const [searchParams] = useSearchParams();
  setParams(searchParams.get("name"));

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
          <img src={details.flag} className="details-img" alt="flag" />
        </div>
        <div className="country-details">
          <span className="country-details-header">{details.name}</span>
          <div className="details-items">
            <div>
              <LabelWithText label={"Native Name"} text={details.nativeName} />
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
        </div>
      </section>
    </div>
  );
}
