import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  const getNames = () =>
    persons.map(person => <div key={person.name}>{person.name}</div>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getNames()}
    </div>
  )
}

export default App