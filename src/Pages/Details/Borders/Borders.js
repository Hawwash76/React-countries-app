import BorderItem from "../../../Components/BorderItem/BorderItem";

export default function Borders({ borders }) {
  return (
    <div className="border-countries">
      <span>Border Countries:</span>
      <div className="border-countries-items">
        {borders.length ? (
          borders.map((item) => <BorderItem key={item} name={item} />)
        ) : (
          <p>No Borders</p>
        )}
      </div>
    </div>
  );
}
