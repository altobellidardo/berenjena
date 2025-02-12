import { DbGetPlayers } from "@/libs/supabase/tables/players"
import { DBGetScores } from "@/libs/supabase/tables/scores"

export async function getMatchData(roomId: string) {
  const { data: players, error: playersError } = await DbGetPlayers(roomId);
  if (playersError) console.error(playersError)

  const { data: scores, error: scoresError } = await DBGetScores(roomId);
  if (scoresError) console.error(scoresError)

  const matchData = players?.map(player => {
    const playerScores = scores
      ?.filter(score => score.player_id === player.id)
      .map(({ points, round }) => ({ points, round })) || []

    return { ...player, scores: playerScores };
  }) || []

  return matchData;
}
