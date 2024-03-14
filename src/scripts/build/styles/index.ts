const sassExtract = require('sass-extract')

function isOdd(num) {
	return num % 2
}

sassExtract
	.render({
		file: 'src/styles/global.scss'
	})
	.then((rendered) => {
		//console.log(rendered.vars.global.$themes)
		let colors = []
		let stripped = rendered.vars.global.$themes.declarations[0].expression.split('"')
		stripped = stripped.slice(1)
		//console.log(stripped)
		stripped.map((value, index) => {
			if (!isOdd(index)) {
				colors.push({ color: value, value: stripped[index + 1].split(',')[0].split(' ')[1] })
			}
		})
		let colorVars = []
		console.log(colors)
		colors.map((value1, index1) => {
			colors.map((value2, index2) => {
				colorVars.push(`--color-${value1.color}-${value2.color}`)
			})
		})
		console.log(colorVars)
		//merge all built css files in .nextjs into a single file

		//count how many times each color is used

		//remove unused color vars from single css file that contains all the color definitions
	})
