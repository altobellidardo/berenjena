"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Player = {
  name: string
  scores: number[]
}

export default function BerenjenaScorer() {
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [editingScore, setEditingScore] = useState<{ playerIndex: number; roundIndex: number } | null>(null)
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null)
  const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false)

  useEffect(() => {
    const savedPlayers = localStorage.getItem("berenjenaPlayers")
    const savedGameStarted = localStorage.getItem("berenjenaGameStarted")
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    }
    if (savedGameStarted) {
      setGameStarted(JSON.parse(savedGameStarted))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("berenjenaPlayers", JSON.stringify(players))
    localStorage.setItem("berenjenaGameStarted", JSON.stringify(gameStarted))
  }, [players, gameStarted])

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        name: newPlayerName.trim(),
        scores: gameStarted ? Array(players[0]?.scores.length || 0).fill(0) : [],
      }
      setPlayers([...players, newPlayer])
      setNewPlayerName("")
      setIsAddPlayerDialogOpen(false)
    }
  }

  const editPlayer = (index: number) => {
    setEditingPlayer(index)
  }

  const savePlayerEdit = (index: number, newName: string) => {
    const updatedPlayers = [...players]
    updatedPlayers[index].name = newName.trim()
    setPlayers(updatedPlayers)
    setEditingPlayer(null)
  }

  const removePlayer = (index: number) => {
    if (gameStarted) {
      if (
        confirm(`¿Estás seguro de que quieres eliminar a ${players[index].name}? Esta acción no se puede deshacer.`)
      ) {
        const updatedPlayers = players.filter((_, i) => i !== index)
        setPlayers(updatedPlayers)
      }
    } else {
      const updatedPlayers = players.filter((_, i) => i !== index)
      setPlayers(updatedPlayers)
    }
  }

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true)
    } else {
      alert("Se necesitan al menos 2 jugadores para comenzar.")
    }
  }

  const addRound = () => {
    const newPlayers = [...players]
    for (let i = 0; i < newPlayers.length; i++) {
      const score = prompt(`Puntuación para ${newPlayers[i].name}:`)
      const parsedScore = Number.parseInt(score || "0", 10)
      newPlayers[i].scores.push(isNaN(parsedScore) ? 0 : parsedScore)
    }
    setPlayers(newPlayers)
  }

  const editScore = (playerIndex: number, roundIndex: number) => {
    setEditingScore({ playerIndex, roundIndex })
  }

  const saveEditedScore = (playerIndex: number, roundIndex: number, newScore: number) => {
    const newPlayers = [...players]
    newPlayers[playerIndex].scores[roundIndex] = newScore
    setPlayers(newPlayers)
    setEditingScore(null)
  }

  const resetGame = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego? Se perderán todos los datos.")) {
      localStorage.removeItem("berenjenaPlayers")
      localStorage.removeItem("berenjenaGameStarted")
      setPlayers([])
      setGameStarted(false)
    }
  }

  if (!gameStarted) {
    return (
      <Card className="w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle>Nuevo Juego de Berenjena</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Nombre del jugador"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <Button onClick={addPlayer}>Añadir</Button>
          </div>
          {players.map((player, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              {editingPlayer === index ? (
                <Input
                  type="text"
                  defaultValue={player.name}
                  onBlur={(e) => savePlayerEdit(index, e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{player.name}</span>
              )}
              <div>
                <Button variant="ghost" size="icon" onClick={() => editPlayer(index)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removePlayer(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" onClick={startGame}>
            Comenzar Juego
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Puntuaciones de Berenjena</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jugador</TableHead>
            {players[0].scores.map((_, index) => (
              <TableHead key={index}>Ronda {index + 1}</TableHead>
            ))}
            <TableHead>Total</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, playerIndex) => (
            <TableRow key={playerIndex}>
              <TableCell>
                {editingPlayer === playerIndex ? (
                  <Input
                    type="text"
                    defaultValue={player.name}
                    onBlur={(e) => savePlayerEdit(playerIndex, e.target.value)}
                    autoFocus
                  />
                ) : (
                  player.name
                )}
              </TableCell>
              {player.scores.map((score, roundIndex) => (
                <TableCell key={roundIndex} onClick={() => editScore(playerIndex, roundIndex)}>
                  {editingScore?.playerIndex === playerIndex && editingScore?.roundIndex === roundIndex ? (
                    <Input
                      type="number"
                      defaultValue={score}
                      onBlur={(e) => saveEditedScore(playerIndex, roundIndex, Number.parseInt(e.target.value, 10))}
                      autoFocus
                    />
                  ) : (
                    score
                  )}
                </TableCell>
              ))}
              <TableCell>{player.scores.reduce((a, b) => a + b, 0)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => editPlayer(playerIndex)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removePlayer(playerIndex)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex space-x-2">
        <Button onClick={addRound}>Nueva Ronda</Button>
        <Button onClick={resetGame} variant="destructive">
          Reiniciar Juego
        </Button>
        <Dialog open={isAddPlayerDialogOpen} onOpenChange={setIsAddPlayerDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Añadir Jugador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Jugador</DialogTitle>
              <DialogDescription>
                Ingresa el nombre del nuevo jugador. Se le asignarán ceros en las rondas anteriores.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addPlayer}>Añadir Jugador</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
