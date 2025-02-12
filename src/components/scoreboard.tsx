// import Input from "./ui/input"

import { cn } from "@/libs/tw";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Crown } from "lucide-react";

interface ScoreboardProps {
  players: {
    name: string;
    id: string;
    scores: { points: number; round: number }[];
  }[]
}

function Scoreboard ({ players }: ScoreboardProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jugador</TableHead>
          <TableHead>Total</TableHead>
          {players[0].scores.map((_, index) => (
            <TableHead key={index}>Ronda {index + 1}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.map((player, playerIndex) => (
          <TableRow key={playerIndex}>
            <TableCell className={cn("font-medium", playerIndex === 0 && "font-bold flex gap-1 items-center")}>
              {playerIndex === 0 && <Crown className="size-4 text-brand-blue" />}
              {player.name}
            </TableCell>
            <TableCell>{player.scores.reduce((a, b) => a + b.points, 0)}</TableCell>
            {player.scores.map((score, roundIndex) => (
              // <td key={roundIndex} onClick={() => editScore(playerIndex, roundIndex)}>
              //   {editingScore?.playerIndex === playerIndex && editingScore?.roundIndex === roundIndex ? (
              //     <Input
              //       type="number"
              //       defaultValue={score}
              //       onBlur={(e) => saveEditedScore(playerIndex, roundIndex, Number.parseInt(e.target.value, 10))}
              //       autoFocus
              //     />
              //   ) : (
              //     score
              //   )}
              // </td>
              <TableCell key={roundIndex}>{score.points}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Scoreboard
