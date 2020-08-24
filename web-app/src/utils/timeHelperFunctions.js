export const formatTime = (timeInSeconds) => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	const zeroPaddedSeconds = seconds.toString().padStart(2, '0');
	return `${minutes}:${zeroPaddedSeconds}`;
};
