import React from 'react'
import Country from './Country'

const Countries = ({data, filter, countryClick}) => {
  const handleCountryClick = (data) => {
    countryClick(data)
  }

  const getCountries = () => {
    let filtered = data
    const term = filter.trim().toLowerCase()
    if (term !== '') {
      filtered = data.filter(p => p.name.toLowerCase().includes(term))
    }
    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filtered.length === 1) {
      return <Country data={filtered[0]} />
    }
    return filtered.map(country =>
      <Country
        key={country.alpha3Code}
        data={country}
        onClick={handleCountryClick}
        closed={true} />
    )
  }
  return (
    <div>
      {getCountries()}
    </div>
  )
}

export default Countries