import type { GameConfig } from './typings/GameTypes';

const defaultConfig: GameConfig = {
	timePerRound: 20 * 60,
	blinds: [10, 20, 25, 40],
	roundsPerBreak: 3,
	timePerBreak: 5 * 60,
	beepSoundUrl: 'https://www.soundjay.com/button/beep-01a.mp3',
	chips: [
		{
			color: '#FFFFFF', value: 1, displayName: 'fuk u',
		},
		{
			color: '#FF0000', value: 2, displayName: 'fuk u',
		},
		{
			color: '#008000', value: 5, displayName: 'fuk u',
		},
		{
			color: '#0000FF', value: 10, displayName: 'fuk u',
		},
		{
			color: '#FFC0CB', value: 50, displayName: 'fuk u',
		},
		{
			color: '#000000', value: 100, displayName: 'fuk u',
		}
	],
};

export default defaultConfig;
