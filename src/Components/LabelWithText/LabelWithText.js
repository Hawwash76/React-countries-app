export default function LabelWithText({ label, text }) {
  let items = [];

  if (typeof text === "object") {
    items = [...text];
  } else {
    items.push(text);
  }

  return (
    <div className="label-with-items-wrapper">
      <p>{label+":"}</p>
      <span>{items.map((item) => item)}</span>
    </div>
  );
}
