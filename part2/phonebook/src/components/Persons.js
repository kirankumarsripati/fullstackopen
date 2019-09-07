import React from 'react'

const Persons = ({persons, filter, deletePerson}) => {
  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}`)) {
      deletePerson(person)
    }
  }

  const getPersons = () => {
    let filtered = persons
    const term = filter.trim().toLowerCase()
    if (term !== '') {
      filtered = persons.filter(p => p.name.toLowerCase().includes(term))
    }
    return filtered.map(person =>
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    )
  }
  return (
    <div>
      {getPersons()}
    </div>
  )
}

export default Persons