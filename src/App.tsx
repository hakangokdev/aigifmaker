import React, { useState } from 'react'
import GifMaker from './components/GifMaker'
import HowToUse from './components/HowToUse'
import './App.css'

function App() {
  const [showHowToUse, setShowHowToUse] = useState(false)

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="fas fa-magic"></i>
              GIF Maker AI
            </h1>
            <p>Yapay zeka ile animasyonlu GIF'ler oluşturun</p>
          </div>
          <button 
            className="how-to-use-button"
            onClick={() => setShowHowToUse(true)}
          >
            <i className="fas fa-question-circle"></i>
            Nasıl Kullanılır?
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <GifMaker />
      </main>
      
      <HowToUse 
        isOpen={showHowToUse} 
        onClose={() => setShowHowToUse(false)} 
      />
    </div>
  )
}

export default App 