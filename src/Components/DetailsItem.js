export default function DetailsItem({ decleration, data }) {
  if (typeof data === "string") {
    return (
      <p className="details-item-decleration">
        {decleration}:<span className="details-item-data">{data}</span>
      </p>
    );
  } else if (typeof data === "object") {
    return (
        <p  className="details-item-decleration">
        {decleration}:
        {data.map((item) => (
          <span className="details-item-data">{item}</span>
        ))}
      </p>
    );
  }
}
