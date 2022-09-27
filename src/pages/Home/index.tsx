import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'

import './styles.css'

interface StudentProps {
  name: string
  time: string
}

export function Home() {
  const [studentName, setEstudentName] = useState('')
  const [students, setEstudents] = useState<StudentProps[]>([])
  const [user, setUser] = useState({
    name: '',
    avatar: '',
  })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    setEstudents((oldState) => [...oldState, newStudent])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/hilquiasfmelo')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>Lista de presença</h1>
        <div className="profile">
          <strong>{user.name}</strong>
          <img src={user.avatar} alt={user.name} />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(event) => setEstudentName(event.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => {
        return (
          <Card key={student.name} name={student.name} time={student.time} />
        )
      })}
    </div>
  )
}
