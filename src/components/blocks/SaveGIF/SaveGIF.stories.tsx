import { Meta, StoryFn } from '@storybook/react'
import SaveGIF from './SaveGIF'
import { testFrames } from './TestData'

export default {
	title: 'Components/SaveGIF',
	component: SaveGIF,
} as Meta

const Template: StoryFn<typeof SaveGIF> = (args) => <SaveGIF {...args} />

export const Default = Template.bind({})
Default.args = {
	gifSaveName: 'animation.gif',
	doGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: testFrames,
}

export const ModifiedFilename = Template.bind({})
ModifiedFilename.args = {
	gifSaveName: 'custom_animation.gif',
	doGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: testFrames,
}

export const NoFramesAvailable = Template.bind({})
NoFramesAvailable.args = {
	gifSaveName: 'animation.gif',
	doGifSave: (filename: string) => console.log(`GIF saved with filename: ${filename}`),
	framesAvailable: [],
}
