import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import alias from "@rollup/plugin-alias";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true,
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			preprocess: autoPreprocess(),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: (css) => {
				css.write('public/build/bundle.css');
			},
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ sourceMap: !production }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// Add import alias for components
		// Avoids relative paths and replaces with absolute paths
		alias({
			entries: [
				{
					find: "metaStore",
					replacement: path.resolve("./src/stores/metaStore.js")
				},
				{
					find: "gameStore",
					replacement: path.resolve("./src/stores/gameStore.js")
				},
				{
					find: "BlindViewer",
					replacement: path.resolve("./src/Views/GameMode/BlindsViewer/BlindViewer.svelte")
				},
				{
					find: "@",
					replacement: path.resolve("./src")
				},
				{
					find: "mockData",
					replacement: path.resolve("./src/mockData.ts")
				},
				{
					find: "Timer",
					replacement: path.resolve("./src/Views/GameMode/Timer")
				},
				{
					find: "GameMode",
					replacement: path.resolve("./src/Views/GameMode")
				},
				{
					find: "Landing",
					replacement: path.resolve("./src/Views/Landing")
				},
				{
					find: "Views",
					replacement: path.resolve("./src/Views/")
				},
				{
					find: "Chips",
					replacement: path.resolve("./src/Views/GameMode/Chips")
				},
			]
		})
	],
	watch: {
		clearScreen: false,
	},
};
