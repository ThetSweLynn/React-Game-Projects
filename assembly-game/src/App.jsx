import { useState, useRef, useEffect } from 'react'
import { languages } from './languages'
import { words } from './words'
import { getFarewellText } from './messages'
import { clsx } from 'clsx'
import Confetti from 'react-confetti'

function App() {
  //Static variables
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const randomWord = words[Math.floor(Math.random() * words.length )].toLowerCase()

  //State variables
  const [currentWord, setCurrentWord] = useState(randomWord)
  const [guessedLetters, setGuessedLetters] = useState([])
  
  //Derived variables
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter)) && wrongGuessCount < languages.length
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuess = guessedLetters[guessedLetters.length - 1]
  const isLastGuessCorrect = lastGuess && currentWord.includes(lastGuess)

  const restartButtonRef = useRef(null)
  useEffect(() => {
    if (isGameOver) {
      restartButtonRef.current?.focus()
    }
  }, [isGameOver])

  const languageElements = languages.map((language, index) => 
    {
      const styles = {
        backgroundColor: language.backgroundColor,
        color: language.color,
      }
      const className = index < wrongGuessCount ? 'lost' : ''
      return <span className={className} key={language.name} style={styles}>{language.name}</span>
    }
  )

  const letterElements = currentWord.split('').map((letter, index) => 
    {
      const isGussedCorrectly = guessedLetters.includes(letter)
      return <span key={index}>
        {isGussedCorrectly && letter.toUpperCase()}
      </span>
    }
  )

  const keyboardElements = alphabet.split('').map(letter => 
    {
      const isGussed = guessedLetters.includes(letter)
      const isRight = isGussed && currentWord.includes(letter)
      const isWrong = isGussed && !currentWord.includes(letter)
      const keyboardClassName = clsx({
        right: isRight,
        wrong: isWrong
      })
      return <button 
        className={keyboardClassName} 
        key={letter} 
        onClick={() => guess(letter)}
        disabled={isGussed || isGameOver}>
        {letter.toUpperCase()}
      </button>
    }
  )

  const messageBoxClassName = clsx('message-box', {
    'won': isGameWon,
    'lost': isGameLost,
    'wrong-guess': !isGameLost && !isLastGuessCorrect && wrongGuessCount > 0
  })

  function guess(letter) {
    const guessedletterSet = new Set (guessedLetters)
    guessedletterSet.add(letter)
    setGuessedLetters(Array.from(guessedletterSet))
  }

  function restart() {
    setCurrentWord(randomWord)
    setGuessedLetters([])
  }

  return (
    <main>
      {isGameWon && <Confetti />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under <b>8</b> attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={messageBoxClassName}>
        {(!isGameLost && !isLastGuessCorrect && wrongGuessCount > 0) && 
          <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        }
        {isGameWon && <>
          <h2>You Win!</h2>
          <p>Well done! 🎉</p>
        </>}
        {isGameLost && <>
          <h2>Game Over!</h2>
          <p>The answer was <b>{currentWord.toUpperCase()}</b> !</p>
          <p>You lose! Better start learning Assembly 😭</p>
        </>}
      </section>
      <section className='languages'>
        {languageElements}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      { isGameOver && <button className='restart' ref={restartButtonRef} onClick={restart}>New Game</button>}
    </main>
  )
}

export default App
