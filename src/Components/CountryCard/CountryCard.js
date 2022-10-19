import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/Icons/star-solid.svg";

export default function CountryCard({ country, favorites, setFavorites }) {
  function getInfo(event) {
    const data = {
      name: event.target.childNodes[0].childNodes[1].childNodes[0].innerText,
      flag: event.target.childNodes[0].childNodes[0].src,
    };
    event.dataTransfer.setData("text", JSON.stringify(data));
  }

  const handleFavorite = (event) => {
    const attribute =
      event.target.parentNode.parentNode.getAttribute("isfavorite");
    if (attribute === "false") {
      event.target.parentNode.parentNode.setAttribute("isfavorite", "true");
      event.target.parentNode.style.fill = "rgb(219, 156, 30)";
    } else {
      event.target.parentNode.parentNode.setAttribute("isfavorite", "false");
      event.target.parentNode.style.fill = "rgb(153, 151, 151)";
    }
  };

  return (
    <Card
      className="card"
      sx={{
        boxShadow: "var(--box-shadow)",
        borderRadius: "var(--border-radius)",
        backgroundColor: "var(--White)",
      }}
      draggable={false}
    >
      <Link
        to={`/country?${country.name}`}
        className="link"
        draggable
        onDragStart={getInfo}
      >
        <CardMedia
          component="img"
          height="170"
          src={country.flag}
          alt="country flag"
          draggable={false}
        />
        <CardContent sx={{ padding: "1.5rem 1rem" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cardHeader"
          >
            {country.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="card-content"
          >
            <div className="cardText">
              <p>Population:</p>
              <span>{country.population}</span>
            </div>
            <div className="cardText">
              <p>Region:</p>
              <span>{country.region}</span>
            </div>
            <div className="cardText">
              <p>Capital:</p>
              <span>{country.capital}</span>
            </div>
          </Typography>
        </CardContent>
      </Link>
      <div className="card-icon" isFavorite="false">
        <StarIcon className="star-icon" onClick={handleFavorite} />
      </div>
    </Card>
  );
}
