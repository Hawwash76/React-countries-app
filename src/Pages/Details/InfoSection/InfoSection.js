import LabelWithText from "../../../Components/LabelWithText/LabelWithText";
import Borders from "../Borders/Borders";
export default function InfoSection({ details }) {
  return (
    <div className="country-details">
      <span className="country-details-header">{details.name}</span>
      <div className="details-items">
        <div>
          <LabelWithText label={"Native Name"} text={details.nativeName} />
          <LabelWithText label={"Population"} text={details.population + ""} />
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
  );
}
