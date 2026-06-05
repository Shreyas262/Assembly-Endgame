import { useState, useEffect, useRef } from 'react'
import { languages } from './assets/languages.js'
import getFarewellText from './assets/utils.js'
import { words } from './assets/words.js'
import { clsx } from 'clsx'
import confetti from "canvas-confetti";
import './App.css'

function AssemblyEndgame() {
  //state values
  const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);

  //derived values
  const wrongGuessCount = guessedLetters.filter(l=>!currentWord.includes(l)).length;
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //static values
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    );
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const className = clsx('chip', isLanguageLost && 'lost');
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };
    return (
      <span
        className={className}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    );
  })
  
  const letterElements = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      className={`letter-box ${isGameLost ? 'revealed' : ''}`}
    >
      {isGameOver ? letter.toUpperCase() : guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ));
  
  const keyboardElements = alphabets.map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    });
        
    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
    })
    
  const gameStatusClass = clsx("status-section", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  });
  
  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      )
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } 
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
      
    return null
  }
  
  function startNewGame() {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
  }

  useEffect(() => {
    if (isGameWon) {
      confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.75 },
      });
    }
  }, [isGameWon]);

  return (
    <main>
      {/* Header */}
      <header className="title">
            <h1>Assembly Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>

      {/* Game Status */}
      <section className={gameStatusClass}>
        { renderGameStatus() }
      </section>

      <p className={`attempts-remaining ${isGameWon ? 'won' : isGameLost ? 'lost' : ''}`}>
        {!isGameWon &&`Attempts Remaining: ${8 - wrongGuessCount}`}
      </p>

      {/* Language List */}
      <section className="languages-container">
        {/* Display the list of languages */}
        {languageElements}
      </section>

      {/* Word to Guess */}
      <section className="current-word-container">
        {/* display the letters of the word to be guessed */}
        { letterElements }
      </section>

      {/* Keyboard */}
      <section className="keyboard-container">
        {keyboardElements}
      </section>
      
      {/* New Game Button */}
      {isGameOver && <button className="new-game-btn" onClick={startNewGame}>New Game</button>}

    </main>
  )
}

export default AssemblyEndgame
