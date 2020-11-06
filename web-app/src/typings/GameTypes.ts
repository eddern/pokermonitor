export type Chip = {
  color: string;
  value: number;
  displayName: string;
}

export type GameConfig = {
  timePerRound: number;
  blinds: number[];
  beepSoundUrl?: string;
  chips: Chip[];
}