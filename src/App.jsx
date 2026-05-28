import { useState, useEffect, useRef } from 'react'
import Header from './components/HeaderContent.jsx'
import StatusSection from './components/StatusSection.jsx'
import LanguageList from './components/LanguageList.jsx'
import './App.css'

function App() {
  
  return (
    <main>
      <Header />
      <StatusSection />
      <LanguageList />
    </main>
  )
}

export default App
