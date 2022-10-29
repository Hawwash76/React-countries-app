import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LabelWithText from "../LabelWithText/LabelWithText";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/Icons/star-solid.svg";
import { getCardInfo } from "../../functions/HomeFunction";
import { checkStar } from "../../functions/HomeFunction";

export default function HomeCard({ country, favorites, setFavorites }) {
  const handleFavorites = (event) => {
    if (checkStar(event)) {
      setFavorites(favorites.filter((item) => item.name !== country.name));
    } else {
      const found = favorites.some((el) => el.name === country.name);
      if (!found) {
        setFavorites((favorites) => [
          ...favorites,
          { name: country.name, flag: country.flag },
        ]);
      }
    }
  };

  return (
    <Card
      className="card"
      sx={{
        boxShadow: "var(--box-shadow)",
        borderRadius: "var(--border-radius)",
        backgroundColor: "var(--White)",
        maxWidth: "20rem",
        minHeight: "20rem",
      }}
      draggable={false}
    >
      <Link
        to={`/country?name=${country.name}`}
        className="link"
        draggable
        onDragStart={(event) => getCardInfo(event, country.name, country.flag)} 
        onDragEnd={(event) => event.target.classList.remove("lighter-opacity")}
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
          <LabelWithText label={"Population"} text={country.population} />
          <LabelWithText label={"Region"} text={country.region} />
          <LabelWithText label={"Capital"} text={country.capital} />
        </CardContent>
      </Link>
      <div className="card-icon">
        {country.isFav ? (
          <StarIcon className="star-icon selected" onClick={handleFavorites} />
        ) : (
          <StarIcon className="star-icon" onClick={handleFavorites} />
        )}
      </div>
    </Card>
  );
}
