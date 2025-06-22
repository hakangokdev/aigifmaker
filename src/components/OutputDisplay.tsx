import React from 'react'
import './OutputDisplay.css'

interface OutputDisplayProps {
  gifUrl: string
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ gifUrl }) => {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = gifUrl
    a.download = 'ai-generated-gif.gif'
    a.click()
  }

  return (
    <div className="output-container">
      <div className="result-wrapper appear">
        <img 
          src={gifUrl} 
          alt="Generated GIF" 
          className="result-image"
        />
        <button 
          onClick={handleDownload}
          className="download-button"
        >
          <i className="fas fa-download"></i>
          GIF'i İndir
        </button>
      </div>
    </div>
  )
}

export default OutputDisplay 