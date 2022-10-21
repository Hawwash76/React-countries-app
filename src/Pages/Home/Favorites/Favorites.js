import FavoriteItem from "../../../Components/FavoriteItem/FavoriteItem";

export default function Favorite({ favorites, setFavorites }) {
  const drop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    const favoritesArray = favorites;
    const found = favoritesArray.some((el) => el.name === data.name);
    if (!found) {
      setFavorites((favorites) => [...favorites, data]);
    }
  };

  let counter = 0;
  return (
    <div className="favorite-wrapper rounded-border box-shadow">
      <span className="favorites-header">Favorites</span>
      <div
        className="favorites-item-container"
        onDragOver={(event)=>(event.preventDefault())}
        onDrop={drop}
      >
        {favorites.map((favorites) => (
          <FavoriteItem
            key={counter++}
            name={favorites.name}
            flag={favorites.flag}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}
