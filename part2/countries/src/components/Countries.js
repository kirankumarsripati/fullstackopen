import React from 'react'

const Countries = ({data, filter}) => {
  const getCountries = () => {
    let filtered = data
    const term = filter.trim().toLowerCase()
    if (term !== '') {
      filtered = data.filter(p => p.name.toLowerCase().includes(term))
    }
    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filtered.length === 1) {
      const country = filtered[0];
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}<br />
          population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(l => <li>{l.name}</li>)}
          </ul>
          <img width="100" src={country.flag} alt={country.name} />
        </div>
      )
    }
    return filtered.map(country => <div key={country.name}>{country.name}</div>)
  }
  return (
    <div>
      {getCountries()}
    </div>
  )
}

export default Countries