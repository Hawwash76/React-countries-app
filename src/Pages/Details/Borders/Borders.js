export default function Borders({ borders }) {
  let counter = 0;
  return (
    <div className="border-countries">
      <span>Border Countries:</span>
      <div className="border-countries-items">
        {borders.length ? (
          borders.map((item) => (
            <div
              key={counter++}
              className="border-countries-item rounded-border box-shadow"
            >
              {item}
            </div>
          ))
        ) : (
          <p>No Borders</p>
        )}
      </div>
    </div>
  );
}
