import React from 'react'
import './FrameDisplay.css'

interface Frame {
  id: number
  src: string
}

interface FrameDisplayProps {
  frames: Frame[]
}

const FrameDisplay: React.FC<FrameDisplayProps> = ({ frames }) => {
  return (
    <div className="frames-container">
      {frames.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <i className="fas fa-magic"></i>
            <h3>AI Sihri Başlıyor!</h3>
            <p>Prompt'unuzu girin ve yapay zeka ile muhteşem animasyonlu frame'ler oluşturun</p>
          </div>
        </div>
      ) : (
        <div className="frames-grid">
          {frames.map((frame, index) => (
            <div key={frame.id} className="frame appear">
              <div className="frame-number">{index + 1}</div>
              <img 
                src={frame.src} 
                alt={`Frame ${index + 1}`}
                width={1024}
                height={1024}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FrameDisplay 