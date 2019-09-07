import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    const str = event.target.value;
    const searchTerm = str.toLowerCase()
    setFilter(str)
    if (searchTerm === '') {
      setFilteredPersons([])
    } else {
      setFilteredPersons(persons.filter(p => p.name.toLowerCase().includes(searchTerm)))
    }
  }

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const getPersons = () => {
    let personsArr = persons
    if (filter !== '') {
      personsArr = filteredPersons;
    }
    return personsArr.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter show with <input value={filter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getPersons()}
    </div>
  )
}

export default App