export type players = {
  name: string;
  id: string;
  scores: { points: number; round: number }[];
}[]

export type userToken = { id: string, name: string }
