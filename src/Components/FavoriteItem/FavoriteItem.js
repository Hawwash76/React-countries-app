export default function FavoriteItem({ name, flag, favorites, setFavorites }) {
  return (
    <div className="favorite-item">
      <div>
        <img src={flag} className="rounded-border" alt="flag" />
        <span>{name}</span>
      </div>
      <button
        onClick={() => setFavorites(favorites.filter((item) => item.name !== name))}
      >
        x
      </button>
    </div>
  );
}
