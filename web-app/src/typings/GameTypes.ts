export type Chip = {
  color: string;
  value: number;
  displayName: string;
}

export type GameConfig = {
  timePerRound: number;
  roundsPerBreak: number;
	timePerBreak: number;
  blinds: number[];
  beepSoundUrl?: string;
  chips: Chip[];
}