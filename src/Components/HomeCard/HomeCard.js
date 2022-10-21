import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LabelWithText from "../LabelWithText/LabelWithText";
import { Link } from "react-router-dom";

export default function HomeCard({ country }) {
  function getInfo(event) {
    const data = {
      name: country.name,
      flag: country.flag,
    };
    event.dataTransfer.setData("text", JSON.stringify(data));
    console.log(data);
  }

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
        to={`/country?name=${country.name}`}
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
          <LabelWithText label={"Population"} text={country.population} />
          <LabelWithText label={"Region"} text={country.region} />
          <LabelWithText label={"Capital"} text={country.capital} />
        </CardContent>
      </Link>
    </Card>
  );
}
