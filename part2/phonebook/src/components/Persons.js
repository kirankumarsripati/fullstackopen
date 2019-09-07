import React from 'react'

const Persons = ({persons, filter}) => {
  const getPersons = () => {
    let filtered = persons
    const term = filter.trim().toLowerCase()
    if (term !== '') {
      filtered = persons.filter(p => p.name.toLowerCase().includes(term))
    }
    return filtered.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  }
  return (
    <div>
      {getPersons()}
    </div>
  )
}

export default Persons