import { useState, useEffect, useRef } from 'react'
import Header from './components/HeaderContent.jsx'
import StatusSection from './components/StatusSection.jsx'
import LanguageList from './components/LanguageList.jsx'
import { clsx } from 'clsx'
import './App.css'

function AssemblyEndgame() {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetters, setGuessedLetters] = useState([])

  const letterComponents = currentWord.split('').map((letter, index) => {
    return (
      <span key={index} className='letter-box'>{letter.toUpperCase()}</span>
    )
  })
  
  return (
    <main>
      <Header />
      <StatusSection />
      <LanguageList />
      <section className="current-word-container">
        {letterComponents}
      </section>
      <section className="keyboard-container">
        {alphabets.map((alpha) =>
        {
          const isGuessed = guessedLetters.includes(alpha)
          const isCorrect = isGuessed && currentWord.includes(alpha)
          const isWrong = isGuessed && !currentWord.includes(alpha)
          const className = clsx(
            {
              correct: isCorrect, wrong: isWrong
            })
          console.log(className)

          return (<button key={alpha} className={className} onClick={
            () => setGuessedLetters((prev) =>
              prev.includes(alpha) ? prev : [...prev, alpha])
            }
          >{alpha.toLocaleUpperCase()}</button>)
          }
        )}

        </section>
      <button className="new-game-btn">New Game</button>
    </main>
  )
}

export default AssemblyEndgame
