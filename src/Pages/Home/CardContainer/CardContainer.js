import Grid2 from "@mui/material/Unstable_Grid2";
import HomeCard from "../../../Components/HomeCard/HomeCard";

export default function CardContainer({ countries, favorites, setFavorites }) {
  return (
    <Grid2 container className="grid-container" spacing={10}>
      {!countries.length && (
        <div className="empty-countries rounded-border box-shadow">
          <span>No countries found :(</span>
        </div>
      )}
      {countries.map((item) => (
        <Grid2 key={item.name} xs={12} sm={12} md={6} lg={4} xl={4}>
          <HomeCard
            country={item}
            countries
            key={item.name}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
