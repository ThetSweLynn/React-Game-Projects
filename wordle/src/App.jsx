import { useState } from 'react'
import Word from './Word'
import Messagebox  from './Messagebox'
import Confetti from 'react-confetti'
import './App.css'

function App() {
    // Static variables
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const words = ['apple', 'beach', 'cloud', 'dance', 'eagle', 'floor', 'grant', 'house'];

  // State variables
  const [answer, setAnswer] = useState(getRandomWord())
  const [guesses, setGuesses] = useState(Array(6).fill().map(() => Array(5).fill('')))
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [submittedRows, setSubmittedRows] = useState([])

  // Derived variables
  const currentGuess = submittedRows.length > 0 ? guesses[submittedRows[submittedRows.length - 1]] : [];
  const isLettersMatched = currentGuess.every((letter, index) => letter === answer[index]);
  const isGameWon = currentGuess.length > 0 && isLettersMatched  && currentRow <= 5;
  const isGameLost = currentRow > 5;
  const isGameOver = isGameWon || isGameLost;

// Helper functions
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
  }

  function handleGuess(guess) {
    if (currentCol >= 5) return;

    setGuesses(prevGuesses => prevGuesses.map((row, index) => {
      if (index === currentRow) {
        const newRow = [...row]
        newRow[currentCol] = guess
        return newRow
      }
      return row
    }))
    setCurrentCol(prevCol => prevCol + 1)
  }
  console.log('Guesses: ',guesses)

  function handleSubmitWord() {
    if (currentCol !== 5) return;

    setSubmittedRows(prev => [...prev, currentRow]);
    setCurrentRow(prevRow => prevRow + 1);
    setCurrentCol(0);
  }
  console.log('Submitted Rows: ', submittedRows)

  function startNewGame() {
    setAnswer(getRandomWord()); // Reset to a new word or fetch a new word from an API
    setGuesses(Array(6).fill().map(() => Array(5).fill('')));
    setCurrentRow(0);
    setCurrentCol(0);
    setSubmittedRows([]);
  }

  const keyboardElements = alphabet.split('').map((letter) => {
    return (
      <button 
        key={letter} 
        onClick={() => handleGuess(letter)} 
        disabled={currentCol >= 5}>
          {letter.toUpperCase()}
      </button>
    )
  })

  return (
    <main>
      {isGameWon && <Confetti />}
      {isGameOver && <Messagebox 
        status={isGameWon ? 'won' : 'lost'}
        restart={startNewGame}/>}
      <h2>WORDLE</h2>
      <p>You have <b>6</b> chances to guess the word of the day!</p>
      {/* <p>{answer.toUpperCase()}</p> */}

      <br />

      <div className='words-container'>
        {guesses.map((row, index) => (
          <Word 
            key={index} 
            guesses={row} 
            word={answer.split('')}
            submitted={submittedRows.includes(index)}/>
        ))}
      </div>
        
      <br />            

      <div className="keyboard">
        {keyboardElements}
        <button className='enter' onClick={() => handleSubmitWord()}>Enter</button>
      </div>
    </main>
  )
}

export default App
