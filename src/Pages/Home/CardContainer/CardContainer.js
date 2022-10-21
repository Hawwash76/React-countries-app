import Grid2 from "@mui/material/Unstable_Grid2";
import HomeCard from "../../../Components/HomeCard/HomeCard";

export default function CardContainer({ countries }) {
  let counter = 0;
  return (
    <Grid2 container className="grid-container" spacing={10}>
      {countries.map((item) => (
        <Grid2 key={counter++} xs={12} sm={12} md={6} lg={4} xl={4}>
          <HomeCard country={item} countries key={counter++} />
        </Grid2>
      ))}
    </Grid2>
  );
}
