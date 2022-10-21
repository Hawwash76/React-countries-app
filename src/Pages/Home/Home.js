import Input from "../../Components/Input/Input";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Favorite from "./Favorite/Favorite";
import Grid from "./Grid/Grid";
import { ReactComponent as SearchIcon } from "../../assets/Icons/magnifying-glass-solid.svg";


export default function Home({ favorites, setFavorites, countries, setInput,dropdownItems }) {
  return (
    <div className="container home-wrapper">
      <section className="home-filter">
        <Input placeholder="Search for a country..." setInput={setInput}>
          <SearchIcon className="searchicon" />
        </Input>
        <Dropdown placeholder="Filter by" items={dropdownItems} />
      </section>
      <section className="main-content">
        <Favorite items={favorites} setFavorites={setFavorites} />
        <Grid
          items={countries}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </section>
    </div>
  );
}
