import React, { useState, useRef } from 'react'
import { GoogleGenAI, Modality } from '@google/genai'
import { applyPalette, GIFEncoder, quantize } from 'gifenc'
import FrameDisplay from './FrameDisplay'
import OutputDisplay from './OutputDisplay'
import './GifMaker.css'

const fps = 4

interface Frame {
  id: number
  src: string
}

const GifMaker: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [frames, setFrames] = useState<Frame[]>([])
  const [gifResult, setGifResult] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState('')
  const [activeTab, setActiveTab] = useState<'frames' | 'output'>('frames')
  const [apiKey, setApiKey] = useState('')
  
  const framesContainerRef = useRef<HTMLDivElement>(null)

  const parseError = (error: string) => {
    const regex = /{"error":(.*)}/gm
    const m = regex.exec(error)
    try {
      const e = m![1]
      const err = JSON.parse(e)
      return err.message
    } catch (e) {
      return error
    }
  }

  const createGifFromPngs = async (
    imageUrls: string[],
    targetWidth = 1024,
    targetHeight = 1024,
  ): Promise<string> => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to create canvas context')
    }
    const gif = GIFEncoder()
    const fpsInterval = 1 / fps
    const delay = fpsInterval * 1000

    for (const url of imageUrls) {
      const img = new Image()
      img.src = url
      await new Promise((resolve) => {
        img.onload = resolve
      })
      canvas.width = targetWidth
      canvas.height = targetHeight
      ctx.fillStyle = '#ffffff'
      ctx.clearRect(0, 0, targetWidth, targetHeight)
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      const data = ctx.getImageData(0, 0, targetWidth, targetHeight).data
      const format = 'rgb444'
      const palette = quantize(data, 256, { format })
      const index = applyPalette(data, palette, format)
      gif.writeFrame(index, targetWidth, targetHeight, { palette, delay })
    }

    gif.finish()
    const buffer = gif.bytesView()
    const blob = new Blob([buffer], { type: 'image/gif' })
    return URL.createObjectURL(blob)
  }

  const generateGif = async () => {
    if (!prompt.trim() || !apiKey.trim()) {
      setStatus('Lütfen API anahtarı ve prompt girin!')
      return
    }

    setFrames([])
    setGifResult(null)
    setIsGenerating(true)
    setActiveTab('frames')
    setStatus('Frame\'ler oluşturuluyor...')

    try {
      const ai = new GoogleGenAI({ apiKey })

      // Prompt'u genişlet
      const expandPromptResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          temperature: 1,
          systemInstruction: `**Generate simple, animated doodle GIFs on white from user input, prioritizing key visual identifiers in an animated doodle style with ethical considerations.**
**Core GIF:** Doodle/cartoonish (simple lines, stylized forms, no photorealism), subtle looping motion (primary subject(s) only: wiggle, shimmer, etc.), white background, lighthearted/positive tone (playful, avoids trivializing serious subjects), uses specified colors (unless monochrome/outline requested).
**Input Analysis:** Identify subject (type, specificity), prioritize visual attributes (hair C/T, skin tone neutrally if discernible/needed, clothes C/P, accessories C, facial hair type, other distinct features neutrally for people; breed, fur C/P for animals; key parts, colors for objects), extract text (content, style hints described, display as requested: speech bubble [format: 'Speech bubble says "[Text]" is persistent.'], caption/title [format: 'with the [title/caption] "[Text]" [position]'], or text-as-subject [format: 'the word "[Text]" in [style/color description]']), note style modifiers (e.g., "pencil sketch," "monochrome"), and action (usually "subtle motion"). If the subject or description is too vague, add specific characteristics to make it more unique and detailed.
**Prompt Template:** "[Style Descriptor(s)] [Subject Description with Specificity, Attributes, Colors, Skin Tone if applicable] [Text Component if applicable and NOT speech bubble]. [Speech Bubble Component if applicable]"
**Template Notes:** '[Style Descriptor(s)]' includes "cartoonish" or "doodle style" (especially for people) plus any user-requested modifiers. '[Subject Description...]' combines all relevant subject and attribute details. '[Text Component...]' is for captions, titles, or text-as-subject only. '[Speech Bubble Component...]' is for speech bubbles only (mutually exclusive with Text Component).
**Key Constraints:** No racial labels. Neutral skin tone descriptors when included. Cartoonish/doodle style always implied, especially for people. One text display method only.`,
        },
      })

      const expandedPrompt = `A doodle animation on a white background of ${expandPromptResponse.text}. Subtle motion but nothing else moves.`
      const style = `Simple, vibrant, varied-colored doodle/hand-drawn sketch`

      const response = await ai.models.generateContentStream({
        model: 'gemini-2.0-flash-preview-image-generation',
        contents: `Generate at least 10 square, white-background doodle animation frames with smooth, fluid, vibrantly colored motion depicting ${expandedPrompt}.

*Mandatory Requirements (Compacted):**

**Style:** ${style}.
**Background:** Plain solid white (no background colors/elements). Absolutely no black background.
**Content & Motion:** Clearly depict **{{prompt}}** action with colored, moving subject (no static images). If there's an action specified, it should be the main difference between frames.
**Frame Count:** At least 5 frames showing continuous progression and at most 10 frames.
**Format:** Square image (1:1 aspect ratio).
**Cropping:** Absolutely no black bars/letterboxing; colorful doodle fully visible against white.
**Output:** Actual image files for a smooth, colorful doodle-style GIF on a white background. Make sure every frame is different enough from the previous one.`,
        config: {
          temperature: 1,
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      })

      const images: string[] = []
      const newFrames: Frame[] = []
      let frameCount = 0

      for await (const chunk of response) {
        if (chunk.candidates && chunk.candidates[0].content?.parts) {
          for (const part of chunk.candidates[0].content.parts) {
            if (part.inlineData) {
              frameCount++
              setStatus(`Frame ${frameCount} oluşturuldu`)

              const src = `data:image/png;base64,${part.inlineData.data}`
              const frame: Frame = {
                id: frameCount,
                src
              }
              
              newFrames.push(frame)
              setFrames([...newFrames])
              images.push(src)
            }
          }
        }
      }

      if (frameCount < 2) {
        setStatus('Frame oluşturulamadı. Farklı bir prompt deneyin.')
        return
      }

      setStatus('GIF oluşturuluyor...')
      const gifUrl = await createGifFromPngs(images)
      setGifResult(gifUrl)
      setActiveTab('output')
      setStatus('Tamamlandı!')

    } catch (error) {
      const msg = parseError(String(error))
      console.error('GIF oluşturma hatası:', error)
      setStatus(`Hata: ${msg}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGenerating) {
      generateGif()
    }
  }

  return (
    <div className="gif-maker">
      <div className="input-section">
        <div className="api-key-input">
          <label htmlFor="api-key">Gemini API Anahtarı:</label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Gemini API anahtarınızı girin..."
            className="api-key-field"
          />
        </div>
        
        <div className="prompt-input">
          <label htmlFor="prompt">Prompt:</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="GIF için istediğiniz animasyonu tanımlayın..."
            className="prompt-field"
            disabled={isGenerating}
          />
          <button 
            onClick={generateGif}
            disabled={isGenerating || !prompt.trim() || !apiKey.trim()}
            className={`generate-button ${isGenerating ? 'loading' : ''}`}
          >
            {isGenerating ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Oluşturuluyor...
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                GIF Oluştur
              </>
            )}
          </button>
        </div>
      </div>

      {status && (
        <div className="status-display">
          {status}
        </div>
      )}

      <div className="generation-container">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'frames' ? 'active' : ''}`}
            onClick={() => setActiveTab('frames')}
          >
            <i className="fas fa-images"></i>
            Frame'ler ({frames.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
            disabled={!gifResult}
          >
            <i className="fas fa-file-image"></i>
            Sonuç
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'frames' && (
            <FrameDisplay frames={frames} />
          )}
          {activeTab === 'output' && gifResult && (
            <OutputDisplay gifUrl={gifResult} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GifMaker 