export default function FavoriteItem({ name, flag, favorites, setFavorites }) {
  return (
    <div className="favorite-item">
      <div>
        <div className="favorite-item-img-wrapper">
          <img src={flag} className="rounded-border" alt="flag" />
        </div>
        <span>{name}</span>
      </div>
      <button
        onClick={() =>
          setFavorites(favorites.filter((item) => item.name !== name))
        }
      >
        <span>x</span>
      </button>
    </div>
  );
}
