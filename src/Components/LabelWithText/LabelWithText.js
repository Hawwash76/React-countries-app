export default function LabelWithText({ label, text }) {
  if (typeof text === "string") {
    return (
      <p className="cardText">
        {label}:<span>{text}</span>
      </p>
    );
  } else if (typeof text === "object") {
    return (
      <p className="cardText">
        {label}:
        {text.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
    );
  }
}
