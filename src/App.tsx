import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CardPage from './pages/CardPage'
import { useEffect, useRef } from 'react';
import backgroundMusic from '/valentines-day-page/audio.mp3';

function App() {
  const location = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic)
    audioRef.current.volume = 0.5
    audioRef.current.loop = true

    const playAfterInteraction = async () => {
      if (!audioRef.current || startedRef.current) return
      startedRef.current = true
      try {
        await audioRef.current.play()
      } catch {
        startedRef.current = false
      }
    }

    const eventOptions = { once: true, passive: true }
    window.addEventListener('click', playAfterInteraction, eventOptions)
    window.addEventListener('keydown', playAfterInteraction, eventOptions)
    window.addEventListener('touchstart', playAfterInteraction, eventOptions)

    return () => {
      window.removeEventListener('click', playAfterInteraction)
      window.removeEventListener('keydown', playAfterInteraction)
      window.removeEventListener('touchstart', playAfterInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/valentines-day-page" element={<CardPage />} />
        <Route path="/" element={<CardPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App

