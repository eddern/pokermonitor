<script>
	export let color;
	export let textColor;
	export let value;
</script>

<style>
	main {
		position: relative;
	}
	#value {
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	h1 {
		color: var(--text-color);
		font-weight: 300;
		font-size: 76px;
	}
</style>

<main style="--text-color: {textColor}">
	<span id="value">
		<h1>{value}</h1>
	</span>
	<svg
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:cc="http://creativecommons.org/ns#"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		xmlns:svg="http://www.w3.org/2000/svg"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		id="Capa_1"
		x="0px"
		y="0px"
		viewBox="0 0 92.03506 92.03423"
		xml:space="preserve"
		width="92.03505"
		height="92.03423">
		<metadata id="metadata132">
			<rdf:RDF>
				<cc:Work rdf:about="">
					<dc:format>image/svg+xml</dc:format>
					<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
					<dc:title />
				</cc:Work>
			</rdf:RDF>
		</metadata>
		<defs id="defs130" />
		<g id="g95" transform="matrix(0.71518199,0,0,0.71518199,1.0682816e-4,-4.8375434e-4)">
			<path
				d="M 244.63,35.621 C 222.859,16.986 197.248,5.766 170.863,1.719 121.871,-5.797
				70.223,11.421 35.622,51.847 c -53.236,62.198 -45.972,155.773 16.226,209.01
				21.771,18.634 47.381,29.853 73.766,33.901 48.991,7.517 100.641,-9.703 135.241,-50.13
				C 314.091,182.431 306.826,88.856 244.63,35.621 Z m 28.731,155.62 -45.305,-15.618 c
				6.102,-17.803 6.028,-37.107 0.014,-54.724 l 45.257,-15.575 c 3.577,10.453
				5.862,21.429 6.74,32.741 1.422,18.309 -0.915,36.323 -6.706,53.176 z m 2.544,-87.183
				c 0,-0.003 0,-0.005 0,-0.008 0,0.003 0,0.005 0,0.008 z m -27.97,-42.586
				-36.069,31.332 c -2.669,-3.055 -5.579,-5.961 -8.752,-8.677 -11.467,-9.814
				-24.81,-15.995 -38.637,-18.692 l 9.095,-46.741 c 22.33,4.33 43.21,14.294
				60.635,29.209 4.94,4.228 9.521,8.766 13.728,13.569 z M 103.251,23.983 c 6.428,-2.315
				13.021,-4.109 19.71,-5.388 l 9.087,46.843 C 114.259,68.905 97.464,78.089
				84.655,92.779 L 48.55,61.38 C 63.334,44.416 82.206,31.568 103.251,23.983 Z m
				-80.127,81.253 45.297,15.617 c -6.102,17.803 -6.028,37.105 -0.015,54.723 l
				-45.295,15.588 c -3.562,-10.441 -5.837,-21.4 -6.713,-32.688 -1.422,-18.325
				0.922,-36.366 6.726,-53.24 z m 25.343,129.83 36.145,-31.395 c 2.669,3.056 5.58,5.964
				8.754,8.68 11.466,9.814 24.808,15.993 38.634,18.691 l -9.143,46.997 c -22.325,-4.348
				-43.185,-14.422 -60.604,-29.333 -4.965,-4.248 -9.564,-8.808 -13.786,-13.64 z m
				144.736,37.569 c -6.409,2.309 -12.986,4.11 -19.658,5.403 l -9.117,-47 c
				17.789,-3.467 34.585,-12.651 47.394,-27.342 l 36.121,31.409 c -14.789,16.982
				-33.686,29.942 -54.74,37.53 z"
				id="path81"
				stroke={color}
				fill={color} />
			<circle cx="93.372002" cy="53.498001" r="8" id="circle83" fill={color} />
			<circle cx="38.757999" cy="148.382" r="8" id="circle85" fill={color} />
			<circle cx="93.623001" cy="243.123" r="8" id="circle87" fill={color} />
			<circle cx="203.105" cy="242.97701" r="8.0010004" id="circle89" fill={color} />
			<circle cx="257.71701" cy="148.091" r="8" id="circle91" fill={color} />
			<circle cx="202.853" cy="53.351002" r="8" id="circle93" fill={color} />
		</g>
	</svg>
</main>
