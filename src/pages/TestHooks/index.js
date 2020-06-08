import React, { useState, useEffect, useMemo, useCallback } from 'react'

function TesHoo() {
  // const [tech, setTech] = useState(['ReactJS', 'React native'])
  const [tech, setTech] = useState([])
  const [newTech, setNewTech] = useState('')

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech])
    setNewTech('')
  }, [newTech, tech])

  // Did mount
  useEffect(() => {
    const storageTech = localStorage.getItem('tech')
    if (tech) {
      setTech(JSON.parse(storageTech))
    }
  }, [])

  // Did update
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech))
  }, [tech])

  const techSize = useMemo(() => tech.length, [tech])

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button onClick={handleAdd}>Adicionar</button>
    </>
  )
}

export default TesHoo
