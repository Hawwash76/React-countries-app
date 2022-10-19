
export default function BorderCountries({countries}) {
  return (
    <div className="border-countries">
        <span>Border Countries:</span>
        <div className="border-countries-items">
            {countries.map((item)=>(<div className="border-countries-item rounded-border box-shadow">{item}</div>))}
        </div>
    </div>
  )
}
