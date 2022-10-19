import FavoriteItem from "../../../Components/FavoriteItem/FavoriteItem";

export default function Favorite({ items, setFavorites }) {
  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    const favoritesArray = items;
    const found = favoritesArray.some((el) => el.name === data.name);
    if (!found) {
      setFavorites((items) => [...items, data]);
    }
  };

  return (
    <div className="favorite-wrapper rounded-border box-shadow">
      <span className="favorites-header">Favorites</span>
      <div
        className="favorites-item-container"
        onDragOver={allowDrop}
        onDrop={drop}
      >
        {items.map((item) => (
          <FavoriteItem name={item.name} flag={item.flag} items={items} setFavorites={setFavorites} />
        ))}
      </div>
    </div>
  );
}
