import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    const str = event.target.value
    setFilter(str)
  }

  const handleDeletePerson = ({id, name}) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showMessage(`Deleted ${name}`, 'success')
      })
  }

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = {
          ...existingPerson,
          number: newNumber
        }
        personService
          .update(person.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            showMessage(`Updated ${returnedPerson.name}`, 'success')
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showMessage(`Added ${returnedPerson.name}`, 'success')
        setNewName('')
        setNewNumber('')
      })
  }

  const showMessage = (message, type) => {
    setMessage({value: message, type})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App