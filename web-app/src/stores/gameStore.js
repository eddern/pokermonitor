import { writable, derived } from 'svelte/store';
import data from 'mockdata';

const initiateRound = () => {
	const { subscribe, set, update } = writable(0);
	return {
		subscribe,
		increment: () => update((n) => n + 1),
	};
};

export const round = initiateRound();

const getBigBlindForRound = (roundNumber) => {
	return roundNumber >= data.blinds.length - 1
		? data.blinds[data.blinds.length - 1]
		: data.blinds[roundNumber];
};

export const bigBlind = derived(round, ($round) => getBigBlindForRound($round));
export const nextBigBlind = derived(round, ($round) => getBigBlindForRound($round + 1));

export const smallBlind = derived(bigBlind, ($bigBlind) => Math.round($bigBlind / 2));
export const nextSmallBlind = derived(nextBigBlind, ($nextBigBlind) =>
	Math.round($nextBigBlind / 2),
);
