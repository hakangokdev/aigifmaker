import React from 'react'
import './HowToUse.css'

interface HowToUseProps {
  isOpen: boolean
  onClose: () => void
}

const HowToUse: React.FC<HowToUseProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-question-circle"></i>
            Nasıl Kullanılır?
          </h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="step-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>
                  <i className="fas fa-key"></i>
                  API Anahtarı Alın
                </h3>
                <p>
                  <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                    Google AI Studio
                  </a> adresinden ücretsiz Gemini API anahtarınızı alın.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>
                  <i className="fas fa-lock"></i>
                  API Anahtarını Girin
                </h3>
                <p>
                  Aldığınız API anahtarını "Gemini API Anahtarı" alanına yapıştırın. 
                  Anahtarınız güvenli şekilde saklanır.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>
                  <i className="fas fa-pen-fancy"></i>
                  Prompt Yazın
                </h3>
                <p>
                  İstediğiniz animasyonu detaylı şekilde tanımlayın. 
                  Örnek: "Dans eden sarı kedi", "Gülümseyen güneş"
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>
                  <i className="fas fa-magic"></i>
                  GIF Oluşturun
                </h3>
                <p>
                  "GIF Oluştur" butonuna tıklayın ve AI'ın sihirli çalışmasını izleyin!
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>
                  <i className="fas fa-download"></i>
                  İndirin & Paylaşın
                </h3>
                <p>
                  Oluşturulan GIF'inizi bilgisayarınıza indirin ve sosyal medyada paylaşın!
                </p>
              </div>
            </div>
          </div>

          <div className="tips-section">
            <h3>
              <i className="fas fa-lightbulb"></i>
              İpuçları
            </h3>
            <div className="tips-grid">
              <div className="tip">
                <i className="fas fa-palette"></i>
                <span>Renkleri belirtin: "mavi kedi", "kırmızı araba"</span>
              </div>
              <div className="tip">
                <i className="fas fa-running"></i>
                <span>Hareket ekleyin: "zıplayan", "dönen", "dans eden"</span>
              </div>
              <div className="tip">
                <i className="fas fa-smile"></i>
                <span>Duygu katın: "mutlu", "şaşkın", "heyecanlı"</span>
              </div>
              <div className="tip">
                <i className="fas fa-eye"></i>
                <span>Detay verin: "büyük gözlü", "tüylü", "parlak"</span>
              </div>
            </div>
          </div>

          <div className="examples-section">
            <h3>
              <i className="fas fa-star"></i>
              Örnek Prompt'lar
            </h3>
            <div className="examples-grid">
              <div className="example">
                <span className="quote">"Dans eden sarı kedi"</span>
              </div>
              <div className="example">
                <span className="quote">"Gülümseyen güneş"</span>
              </div>
              <div className="example">
                <span className="quote">"Uçan renkli kelebekler"</span>
              </div>
              <div className="example">
                <span className="quote">"Zıplayan mavi top"</span>
              </div>
              <div className="example">
                <span className="quote">"Dönen gökkuşağı"</span>
              </div>
              <div className="example">
                <span className="quote">"Yüzen balık sürüsü"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToUse 