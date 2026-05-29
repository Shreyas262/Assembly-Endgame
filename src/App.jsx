import { useState, useEffect, useRef } from 'react'
import Header from './components/HeaderContent.jsx'
import StatusSection from './components/StatusSection.jsx'
import LanguageList from './components/LanguageList.jsx'
import Keyboard from './components/Keyboard.jsx'
import './App.css'

function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('react')
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
      <Keyboard />
      <button className="new-game-btn">New Game</button>
    </main>
  )
}

export default AssemblyEndgame
