import { writable } from 'svelte/store';

export const isFullscreen = writable(false);
export const isInactive = writable(false);
export const isBreak = writable(false);
