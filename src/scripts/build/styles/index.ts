const fs = require('fs')
const path = require('path')

// Reads the colors out of the $themes map at the top of global.scss (everything before the first @import)
function readThemeColors() {
	const source = fs.readFileSync('src/styles/global.scss', 'utf8')
	const themesBlock = source.split('@import')[0]
	const colors = []
	for (const match of themesBlock.matchAll(/^\s*['"]([^'"]+)['"]\s*:\s*([^,\s]+)\s*,/gm)) {
		colors.push({ color: match[1], value: match[2] })
	}
	return colors
}

Promise.resolve()
	.then(() => {
		const colors = readThemeColors()
		if (colors.length === 0) {
			throw new Error('No theme colors found in src/styles/global.scss')
		}
		const colorVars = []
		colors.map((value1) => {
			colors.map((value2) => {
				colorVars.push({
					name: `--color-${value1.color}-${value2.color}`,
					value1: value1.value,
					value2: value2.value,
				})
			})
		})
		console.log('total colorVars:', colorVars.length)

		//merge all built css files in .nextjs into a single file
		const rootPath = process.cwd()
		const cssDirectoryPath = path.join(rootPath, '.next/static/css/')
		// const outputPath = path.join(__dirname, 'merged.css');

		let outputCss = ''

		fs.readdirSync(cssDirectoryPath)
			.filter((file) => path.extname(file) === '.css')
			.forEach((file) => {
				const css = fs.readFileSync(path.join(cssDirectoryPath, file), 'utf8')
				outputCss += css
			})

		// fs.writeFileSync(outputPath, outputCss);

		//count how many times each color is used
		const inactiveColors = colorVars.filter((colorVar) => {
			const matches = outputCss.match(new RegExp(`${colorVar.name}(:|\\))`, 'g'))
			return matches && matches.length <= 2
		})
		console.log('inactive colorVars:', inactiveColors.length)

		//remove unused color vars from single css file that contains all the color definitions
		// Read the directory
		const cssFiles = fs.readdirSync(cssDirectoryPath)

		let rootCssFile = ''
		// Iterate over each file
		for (const file of cssFiles) {
			// Read the file
			const cssContent = fs.readFileSync(path.join(cssDirectoryPath, file), 'utf8')

			// Check if the file contains the `--color-vars-ref` variable
			if (cssContent.includes('--color-vars-ref')) {
				rootCssFile = file
			}
		}

		// update the root css file
		let fileContents = fs.readFileSync(path.join(cssDirectoryPath, rootCssFile), 'utf8')
		inactiveColors.map((colorVar) => {
			fileContents = fileContents.replace(new RegExp(`\\${colorVar.name}:${minifyHexColor(colorVar.value1)};,?`, 'g'), '')
			fileContents = fileContents.replace(new RegExp(`\\${colorVar.name}:${minifyHexColor(colorVar.value2)};,?`, 'g'), '')
			// this accounts for the last color var in the list which doesn't have the ; at the end
			fileContents = fileContents.replace(new RegExp(`\\${colorVar.name}:${minifyHexColor(colorVar.value1)}},?`, 'g'), '}')
			fileContents = fileContents.replace(new RegExp(`\\${colorVar.name}:${minifyHexColor(colorVar.value2)}},?`, 'g'), '}')
		})
		fs.writeFileSync(path.join(cssDirectoryPath, rootCssFile), fileContents)
	})

function minifyHexColor(color) {
	if (/^#([a-fA-F0-9])\1([a-fA-F0-9])\2([a-fA-F0-9])\3$/i.test(color)) {
		return '#' + color[1] + color[3] + color[5]
	}
	return color
}
