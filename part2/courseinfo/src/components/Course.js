import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  const getParts = () =>
    parts.map(part => <Part key={part.id} part={part} />)

  return (
    <div>
      {getParts()}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce( (p, c) => p + c.exercises, 0);
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

export default Course
