export default function LebalWithText({ label, text }) {
  let counter = 0;
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
        {text.map(() => (
          <span key={counter++} >
            {text}
          </span>
        ))}
      </p>
    );
  }
}
