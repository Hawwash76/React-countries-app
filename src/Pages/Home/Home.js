import InputWithIcon from "../../Components/InuptWithIcon/InputWithIcon";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Favorites from "./Favorites/Favorites";
import { ReactComponent as SearchIcon } from "../../assets/Icons/magnifying-glass-solid.svg";
import CardContainer from "./CardContainer/CardContainer";
import Loader from "../../Components/Loader/Loader";

export default function Home({
  setInput,
  Dropdown_Items,
  setDropdownValue,
  dropdownValue,
  favorites,
  setFavorites,
  countries,
  isLoading,
}) {
  return (
    <div className="container home-wrapper">
      <section className="home-filter">
        <InputWithIcon
          placeholder="Search for a country..."
          setInput={setInput}
        >
          <SearchIcon className="searchicon" />
        </InputWithIcon>
        <Dropdown
          placeholder="Filter by"
          Dropdown_Items={Dropdown_Items}
          setDropdownValue={setDropdownValue}
          dropdownValue={dropdownValue}
        />
      </section>
      <section className="main-content">
        <Favorites favorites={favorites} setFavorites={setFavorites} />

        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          
          <CardContainer
            countries={countries}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </section>
    </div>
  );
}
