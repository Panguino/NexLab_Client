const sassExtract = require('sass-extract')
const fs = require('fs')
const path = require('path')

function isOdd(num: number): boolean {
	return num % 2 === 1
}

interface ColorVarProps {
	color: string
	value: string
}
interface ColorPairVarProps {
	name: string
	value1: string
	value2: string
}

sassExtract
	.render({
		file: 'src/styles/global.scss',
	})
	.then((rendered: any) => {
		const colors: ColorVarProps[] = []
		let stripped = rendered.vars.global.$themes.declarations[0].expression.split('"')
		stripped = stripped.slice(1)
		stripped.map((value: string, index: number) => {
			if (!isOdd(index)) {
				colors.push({ color: value, value: stripped[index + 1].split(',')[0].split(' ')[1] })
			}
		})
		const colorVars: ColorPairVarProps[] = []
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
			.filter((file: any) => path.extname(file) === '.css')
			.forEach((file: any) => {
				const css = fs.readFileSync(path.join(cssDirectoryPath, file), 'utf8')
				outputCss += css
			})

		// console.log(outputCss)
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
				//console.log(`The file ${file} contains the --color-vars-ref variable.`)
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

function minifyHexColor(color: string): string {
	if (/^#([a-fA-F0-9])\1([a-fA-F0-9])\2([a-fA-F0-9])\3$/i.test(color)) {
		return '#' + color[1] + color[3] + color[5]
	}
	return color
}
