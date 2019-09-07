import React from 'react'
import Weather from './Weather'

const Country = ({data, onClick = null, closed = false}) => {
  const handleClick = (country) => () => onClick(country);

  if (closed) {
    return (
      <div>{data.name} <button onClick={handleClick(data)}>show</button></div>
    )
  }
  return (
    <div>
      <h1>{data.name}</h1>
      <p>capital {data.capital}<br />
      population {data.population}</p>
      <h2>languages</h2>
      <ul>
        {data.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
      </ul>
      <img width="100" src={data.flag} alt={data.name} />
      <Weather country={data} />
    </div>
  )
}

export default Country