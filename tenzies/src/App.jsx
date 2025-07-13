import './App.css'
import Die from './die'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(generateAllNewDice(), [])
  const gameWon = dice.every(die => die.isHeld && die.number === dice[0].number)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        number: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()}))
  }

  function rollDice() {
    if (!gameWon) {
      setDice(prevDice => 
      prevDice.map(die => 
        die.isHeld ? die : { ...die, number: Math.ceil(Math.random() * 6)}
      ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    setDice(prevDice => 
      prevDice.map(die => 
        die.id === id ? { ...die, isHeld: !die.isHeld} : die
      )
    )
  }

  const diceElements = dice.map(die => 
    <Die key={die.id} number={die.number} isHeld={die.isHeld} hold={() => hold(die.id)}/>
  )


  return <main>
    {gameWon && <Confetti />}
    <h1 className='title'>Tenzies</h1>
    <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className='dice-container'>
      {diceElements}
    </div>
    <button className='roll-button' onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
  </main>
}

export default App
