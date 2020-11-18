<script>
	export let color1;
	export let color2;
	export let textColor;
	export let value;
</script>

<style>
	main {
		position: relative;
	}
	#value {
		position: absolute;
		left: 49.9%;
		top: 49.9%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	h1 {
		color: var(--text-color);
		font-weight: 400;
		font-size: 12px;
	}
	svg {
		background-color: transparent;
	}
</style>

<main style="--text-color: {textColor}">
	<span id="value">
		<h1>{value}</h1>
	</span>
	<svg height="80" viewBox="0 0 128 128" width="80" xmlns="http://www.w3.org/2000/svg">
		<g>
			<path
				d="m126.25 64a62.431 62.431 0 0 1 -1.51 13.69 61.617 61.617 0 0 1 -8.12 19.57 62.324
				62.324 0 0 1 -19.36 19.36 61.617 61.617 0 0 1 -19.57 8.12 62.813 62.813 0 0 1 -27.38
				0 61.617 61.617 0 0 1 -19.57-8.12 62.324 62.324 0 0 1 -19.36-19.36 61.617 61.617 0 0
				1 -8.12-19.57 62.859 62.859 0 0 1 0-27.39 62.336 62.336 0 0 1 47.05-47.04 62.813
				62.813 0 0 1 27.38 0 62.362 62.362 0 0 1 47.05 47.04 62.455 62.455 0 0 1 1.51 13.7z"
				fill={color1} />
			<circle cx="64" cy="63.997" fill="white" fill-opacity="1" r="37.25" />
			<g fill={color2}>
				<path d="m77.69 3.26-3.4 12.49h-20.58l-3.4-12.49a62.813 62.813 0 0 1 27.38 0z" />
				<path d="m77.69 124.74a62.813 62.813 0 0 1 -27.38 0l3.4-12.5h20.58z" />
				<path
					d="m116.62 30.74-11.23 6.42-14.55-14.56 6.41-11.23a62.282 62.282 0 0 1 19.37
					19.37z" />
				<path d="m37.16 105.39-6.42 11.23a62.324 62.324 0 0 1 -19.36-19.36l11.23-6.42z" />
				<path
					d="m126.25 64a62.431 62.431 0 0 1 -1.51
					13.69l-12.49-3.4v-20.58l12.49-3.41a62.455 62.455 0 0 1 1.51 13.7z" />
				<path d="m15.75 53.71v20.58l-12.49 3.4a62.859 62.859 0 0 1 0-27.39z" />
				<path d="m116.62 97.26a62.324 62.324 0 0 1 -19.36 19.36l-6.42-11.23 14.55-14.55z" />
				<path d="m37.16 22.6-14.55 14.56-11.23-6.42a62.282 62.282 0 0 1 19.37-19.37z" />
			</g>
		</g>
	</svg>
</main>
