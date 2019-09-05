import React from 'react';
import ReactDOM from 'react-dom';

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const getCourses = () =>
    courses.map(course => <Course key={course.id} course={course} />)

  return (
    <div>
      <h1>Web development curriculum</h1>
      {getCourses()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))