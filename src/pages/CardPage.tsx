import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import './styles.css'
import ImageLoader from './ImageLoader'

interface ImagePosition {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

const CardPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [imagePositions, setImagePositions] = useState<ImagePosition[]>([])

  // Array de mensajes de San Valentín
  const valentineMessages = [
    {
      title: 'Holiiiiiii, tuuuuuu tuuuuuuuu XD',
      message1: 'Primera vez que hago algo asi XD',
      message2: 'Muy feliz por que el mundo del baile puso a una persona tan especial en mi vida',
      message3: 'Agradecido por haber conicido a una persona tan especial y hermosa como tu',
      closing: '❤️',
    },
    {
      title: 'Gracias por todo lo vivido',
      message1: 'Todo este tiempo fue nuevas experiencias para mi',
      message2: 'Y mucho mejor con tu compañia',
      message3: 'Gracias por ser parte de mi vida y mi corazón',
      closing: '💕',
    },
    {
      title: 'Agradecido eternamente',
      message1: 'Gracias por interesarte en las cosas que más aprecio y valoro',
      message2: 'Cada risa, cada mirada, cada momento contigo es un tesoro.',
      message3: 'Gracias por todo el apoyo que me has dado',
      closing: '🌹',
    },
    {
      title: 'Muy feliz',
      message1: 'Muy feliz de ser testigo de tu progreso en todos los aspectos de tu vida.',
      message2: 'Muy feliz de ser parte de tu vida',
      message3: 'Quiero que sepas que cuantas conmigo para cualquier cosa',
      closing: '💖',
    },
    {
      title: 'Mirando hacia el futuro',
      message1: 'Esperando muchos mas dias y experiencias juntos',
      message2: 'Esperando muchas mas experiencias juntos',
      message3: 'Esperando seguir comparatiendo muchos mas momentos juntos',
      closing: '💗',
    },
    {
      title: 'Feliz San Valentín. Te kelo muchochochochoteeeeeeee',
      image: '/valentines-day-page/images/image.jpg',
    },
  ]

  // Videos locales desde public/videos
  const valentineVideos = [
    '/valentines-day-page/videos/1.mp4',
    '/valentines-day-page/videos/2.mp4',
    '/valentines-day-page/videos/3.mp4',
    '/valentines-day-page/videos/4.mp4',
    '/valentines-day-page/videos/5.mp4',
    '/valentines-day-page/videos/6.mp4',
    '/valentines-day-page/videos/1.mp4',
    '/valentines-day-page/videos/2.mp4',
  ]

  useEffect(() => {
    // Inicializar posiciones aleatorias para los videos por toda la pantalla
    const initialPositions: ImagePosition[] = valentineVideos.map((_, index) => ({
      id: index,
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 200),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }))
    setImagePositions(initialPositions)
  }, [])

  useEffect(() => {
    if (imagePositions.length === 0) return

    const animate = () => {
      setImagePositions((prev) =>
        prev.map((pos) => {
          let newX = pos.x + pos.vx
          let newY = pos.y + pos.vy
          let newVx = pos.vx
          let newVy = pos.vy

          // Rebotar en los bordes de toda la pantalla
          if (newX <= 0 || newX >= window.innerWidth - 200) {
            newX = Math.max(0, Math.min(window.innerWidth - 200, newX))
            newVx = -newVx
          }
          if (newY <= 0 || newY >= window.innerHeight - 200) {
            newY = Math.max(0, Math.min(window.innerHeight - 200, newY))
            newVy = -newVy
          }

          return {
            ...pos,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          }
        })
      )
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [imagePositions.length])

  // Actualizar posiciones cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setImagePositions((prev) =>
        prev.map((pos) => ({
          ...pos,
          x: Math.min(pos.x, window.innerWidth - 200),
          y: Math.min(pos.y, window.innerHeight - 200),
        }))
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cardVariants = {
    closed: {
      rotateY: 0,
      scale: 1,
    },
    open: {
      rotateY: 180,
      scale: 1.1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  }

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      // Cambiar al siguiente mensaje
      setMessageIndex((prev) => (prev + 1) % valentineMessages.length)
    }
  }

  const currentMessage = valentineMessages[messageIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          backgroundImage: 'url(/valentines-day-page/images/fondo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Videos flotantes por toda la pantalla */}
        {imagePositions.map((pos) => (
          <motion.div
            key={pos.id}
            animate={{
              x: pos.x,
              y: pos.y,
            }}
            transition={{
              type: 'tween',
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              position: 'fixed',
              width: '200px',
              height: '200px',
              zIndex: 1,
            }}
            whileHover={{
              scale: 1.3,
              zIndex: 100,
              transition: { duration: 0.3 },
            }}
          >
            <Box
              component="video"
              src={valentineVideos[pos.id]}
              autoPlay
              loop
              muted
              playsInline
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(255, 145, 199, 0.25)',
                border: '3px solid #fff',
                cursor: 'pointer',
              }}
            />
          </motion.div>
        ))}

        {/* Carta centrada */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: '#ff91c7',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
            }}
          >
            💌 Para TUUUUUUUUU 💌
          </Typography>

          <Box
            sx={{
              perspective: '1000px',
              cursor: 'pointer',
              backgroundColor: "#810425",
              borderRadius: 16,
            }}
            onClick={handleCardClick}
          >
            <motion.div
              variants={cardVariants}
              animate={isOpen ? 'open' : 'closed'}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card
                className="main-card"
                sx={{
                  width: { xs: 300, sm: 400 },
                  height: 550,
                  position: 'relative',
                  boxShadow: '0 10px 40px rgba(255, 145, 199, 0.25)',
                  borderRadius: 4,
                }}
              >
                {!isOpen ? (
                  <CardContent
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      //background: 'linear-gradient(135deg, #ffe6f2 0%, #ffd6eb 100%)',
                      color: '#ff91c7',
                      borderRadius: 4,
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 80, mb: 2, animation: 'pulse 2s infinite' }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Haz clic para abrir
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                      💕
                    </Typography>
                  </CardContent>
                ) : (
                  <CardContent
                    className="card"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      p: 4,
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      backgroundColor: "#810425 !important",
                    }}
                  >
                    {
                      currentMessage.image ? (
                        <motion.div
                          key={messageIndex}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          style={{
                            textAlign: 'center',
                            transform: 'rotateY(180deg)',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <FavoriteIcon sx={{ fontSize: 60, color: '#ff91c7', mb: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              color: '#ff91c7',
                              fontWeight: 'bold',
                              mb: 2,
                            }}
                          >
                            {currentMessage.title}
                          </Typography>
                          <ImageLoader
                            src="/valentines-day-page/images/image.jpg"
                            alt="Valentine"
                          />
                        </motion.div>
                      ) : (<motion.div
                        key={messageIndex}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                          textAlign: 'center',
                          transform: 'rotateY(180deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 60, color: '#ff91c7', mb: 2 }} />
                        <Typography
                          variant="h5"
                          sx={{
                            color: '#ff91c7',
                            fontWeight: 'bold',
                            mb: 2,
                          }}
                        >
                          {currentMessage.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#d4a5c4',
                            lineHeight: 1.8,
                            mb: 2,
                          }}
                        >
                          {currentMessage.message1}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#d4a5c4',
                            lineHeight: 1.8,
                            mb: 2,
                          }}
                        >
                          {currentMessage.message2}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#d4a5c4',
                            lineHeight: 1.8,
                            mb: 2,
                          }}
                        >
                          {currentMessage.message3}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#ff91c7',
                            mt: 3,
                            fontWeight: 'bold',
                          }}
                        >
                          {currentMessage.closing}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ff91c7',
                            mt: 2,
                            fontStyle: 'italic',
                            opacity: 0.8,
                          }}
                        >
                          💌 Haz clic para ver más mensajes
                        </Typography>
                      </motion.div>)
                    }

                  </CardContent>
                )}
              </Card>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}

export default CardPage

