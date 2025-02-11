'use client'

import { DBsubscribeScores } from "@/libs/supabase/tables/scoresClient"
import { useEffect, useState } from "react"
import type { Payload, Score } from "@/types/realtimeScores"

function RealTime () {
  const [scores, setScores] = useState<Score[]>([])

  function handleScore (payload: Payload) {
    console.log('recieved payload', payload)

    const newScore = payload.new as Score

    if (!newScore) return
    setScores((prevScores) => [...prevScores, newScore])
  }
  
  useEffect(() => {
    const scoreListener = DBsubscribeScores('scores', handleScore)

    return () => {
      scoreListener.unsubscribe();
    }
  }, [])

  return (
    <main>
      <h1>RealTime</h1>

      <ul>
        {scores.map((score) => (
          <li key={score. id}>{score.points}</li>
        ))}
      </ul>
    </main>
  )
}

export default RealTime
