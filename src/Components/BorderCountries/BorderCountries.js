
export default function BorderCountries({countries}) {
  let counter=0;
  return (
    <div className="border-countries">
        <span>Border Countries:</span>
        <div className="border-countries-items">
            {countries.map((item)=>(<div key={counter++} className="border-countries-item rounded-border box-shadow">{item}</div>))}
        </div>
    </div>
  )
}
