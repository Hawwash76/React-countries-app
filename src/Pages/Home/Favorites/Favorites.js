import FavoriteItem from "../../../Components/FavoriteItem/FavoriteItem";

export default function Favorite({ favorites, setFavorites }) {
  const drop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    const favoritesArray = favorites;
    const found = favoritesArray.some((element) => element.name === data.name);
    if (!found) {
      setFavorites((favorites) => [...favorites, data]);
    }
  };

  return (
    <div className="favorite-wrapper rounded-border box-shadow">
      <span className="favorites-header">Favorites</span>
      <div
        className="favorites-item-container"
        onDragOver={(event) => event.preventDefault()}
        onDrop={drop}
      >
        {!favorites.length && (
          <p>Drag and Drop a country to add it to your favorites!</p>
        )}
        {favorites.map((item) => (
          <FavoriteItem
            key={item.name}
            name={item.name}
            flag={item.flag}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}
