import { useState } from 'react'

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text,value}) => {
  return(
    <td>{text} {value}</td>
  )
}

const Statistics = ({good,neutral,bad}) => {
  
  const average = () => ((good*1)+(bad*-1))/(good+bad+neutral)
  const positive = () => {
    const number = () => (good)/(good+bad+neutral)
    return(
      <>{number()}%</>
    )
  }
  
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
  <table>
    <tr><StatisticLine text="good" value={good}/></tr>
    <tr><StatisticLine text="neutral" value={neutral}/></tr>
    <tr><StatisticLine text="bad" value={bad}/></tr>
    <tr><StatisticLine text="all" value={good+neutral+bad}/></tr>
    <tr><StatisticLine text="average" value={average()}/></tr>
    <tr><StatisticLine text="positive" value={positive()}/></tr>
  </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Bad"/>
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App