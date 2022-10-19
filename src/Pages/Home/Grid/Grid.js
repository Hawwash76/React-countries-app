import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import CountryCard from "../../../Components/CountryCard/CountryCard";

export default function Grid({ items, favorites, setFavorites }) {
  return (
    <Grid2 container className="grid-container" spacing={10}>
      {items.map((item) => (
        <Grid2 xs={12} sm={12} md={6} lg={4} xl={4}>
          <CountryCard
            country={item}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
