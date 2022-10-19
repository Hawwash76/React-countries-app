export default function FavoriteItem({ name, flag, items, setFavorites }) {
  // const handleDelete = (event) => {
  //   const name = event.target.parentNode.childNodes[0].childNodes[1].innerText;
  //   setFavorites(items.filter((item) => item.name !== name));
  // };

  return (
    <div className="favorite-item">
      <div>
        <img src={flag} className="rounded-border" alt="flag" />
        <span>{name}</span>
      </div>
      <button>x</button>
    </div>
  );
}

