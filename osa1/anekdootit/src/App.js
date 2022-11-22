import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const pickAnecdoteIndex = () => {
    return Math.floor(Math.random()*7)
  }
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))
  const [mostIndex, setMostIndex] = useState(0)
  const [mostNumber, setMostNumber] = useState(0)

  const handleClickAnecdote = () => setSelected(pickAnecdoteIndex())

  const voting = function() {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    let placeholder = 0
    let winner = 0
    for(let i=0; i<7; i++){
      if(placeholder < copy[i]){
        placeholder = copy[i]
        winner = i
      }
    }
    setMostIndex(winner) 
    setMostNumber(placeholder)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes.</p>
      <button onClick={voting}>Vote</button>
      <button onClick={handleClickAnecdote}>next anecdote</button>
      <h2>Anectode with the most votes</h2>
      <p>{anecdotes[mostIndex]}</p>
      <p>Has {mostNumber} votes.</p>
    </div>
  )
}
export default App
