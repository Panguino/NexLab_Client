import { Meta, StoryFn } from '@storybook/react'
import SaveGIF from './SaveGIF'

export default {
	title: 'Components/SaveGIF',
	component: SaveGIF,
} as Meta

const Template: StoryFn<typeof SaveGIF> = (args) => <SaveGIF {...args} />

export const Default = Template.bind({})
Default.args = {
	gifSaveName: 'animation.gif',
	onGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: true,
}

export const ModifiedFilename = Template.bind({})
ModifiedFilename.args = {
	gifSaveName: 'custom_animation.gif',
	onGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: true,
}

export const NoFramesAvailable = Template.bind({})
NoFramesAvailable.args = {
	gifSaveName: 'animation.gif',
	onGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: false,
}
