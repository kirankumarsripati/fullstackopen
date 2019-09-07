import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const handleFilterChange = event => {
    const str = event.target.value;
    setFilter(str)
  }

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Countries data={countries} filter={filter} />
    </div>
  )
}

export default App;
