import { useEffect, useState } from 'react'

type CountdownTimerProps = {
  initialTime: number // time in seconds
  onComplete?: () => void
}

const Timer = ({ initialTime, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  if (initialTime===0){
     return 
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onComplete?.()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <p className="text-2xl text-green-600">{formatTime(timeLeft)}</p>
  )
}

export default Timer
