import buttonStyles from '@/styles/buttonStyles.module.scss'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from './Button'
import styles from './ButtonStory.module.scss'

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		style: { control: false },
		onClick: { control: false },
	},
} as Meta

const allButtonStyles = Object.keys(buttonStyles).map((key) => buttonStyles[key])

const Template: StoryFn = (args) => <Button {...args} />
const TemplateStyles: StoryFn = (args) => {
	return (
		<div className={styles.examples}>
			<div className={styles.lightDark}>
				<Button {...args} />
				{allButtonStyles.map((style) => (
					<Button {...args} label={style.split('_')[1]} variantClassName={style} />
				))}
			</div>
			<div className={styles.blue}>
				<Button {...args} />
				{allButtonStyles.map((style) => (
					<Button {...args} label={style.split('_')[1]} variantClassName={style} />
				))}
			</div>
			<div className={styles.darkDark}>
				<Button {...args} />
				{allButtonStyles.map((style) => (
					<Button {...args} label={style.split('_')[1]} variantClassName={style} />
				))}
			</div>
		</div>
	)
}

export const StyleExamples = TemplateStyles.bind({})
StyleExamples.args = {
	label: 'Base Style',
	link: 'https://www.google.com',
	target: '_blank',
	disabled: false,
}

export const AsLink = Template.bind({})
AsLink.args = {
	label: 'Go to Google',
	link: 'https://www.google.com',
	target: '_blank',
	style: '',
	disabled: false,
}

export const AsCustomTrigger = Template.bind({})
AsCustomTrigger.args = {
	label: 'Click Me',
	onClick: () => alert('Button clicked!'),
	style: '',
	disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
	label: 'Disabled Button',
	onClick: () => alert('This should not be clickable'),
	style: '',
	disabled: true,
}
