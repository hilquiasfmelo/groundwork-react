import { ReactNode } from 'react'

import './styles.css'

export interface CardProps {
  name: string
  time: ReactNode
}

export function Card({ name, time }: CardProps) {
  return (
    <div className="card">
      <strong>{name}</strong>
      <small>{time}</small>
    </div>
  )
}
