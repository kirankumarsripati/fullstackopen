import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=9fbcc88b87d94bc29f5161207190709&q=${country.name}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country.name])

  if (weather) {
    return (
      <div>
        <h2>Weather in {country.name}</h2>
        <strong>temperature: </strong> {weather.current.temp_c} Celsius<br />
        <img src={weather.current.condition.icon}
          alt={weather.current.condition.text} /><br />
        <strong>wind:</strong> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
      </div>
    )
  } else {
    return <div>Loading weather...</div>
  }
}

export default Weather