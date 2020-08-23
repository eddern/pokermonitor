import { writable, derived } from 'svelte/store';
import data from '../data';

const initiateRound = () => {
	const { subscribe, set, update } = writable(0);
	return {
		subscribe,
		increment: () => update((n) => n + 1),
	};
};

export const round = initiateRound();

export const bigBlind = derived(round, ($round) =>
	$round >= data.blinds.length - 1 ? data.blinds[data.blinds.length - 1] : data.blinds[$round],
);
export const smallBlind = derived(bigBlind, ($bigBlind) => Math.round($bigBlind / 2));
