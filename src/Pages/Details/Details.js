import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/Icons/arrow-left-solid.svg";
import { useState, useEffect } from "react";
import { getDetails } from "../../functions/DetailsFnctions";
import Loader from "../../Components/Loader/Loader";
import ImageContainer from "./ImageContainer/ImageContainer";
import InfoSection from "./InfoSection/InfoSection";

export default function Detail() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDetails(searchParams.get("name"))
      .then(function (result) {
        setDetails(result);
        setIsLoading(false);
      })
      .finally();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="details-container">
      <div className="back-button-container">
        <Link className="back-button rounded-border box-shadow link" to="/">
          <BackIcon />
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
          <ImageContainer flag={details.flag} />
          <InfoSection details={details} />
        </section>
      )}
    </div>
  );
}
