import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { Accordian } from './Accordian'

const meta: Meta<typeof Accordian> = {
	title: 'Components/Accordian',
	component: Accordian,
	argTypes: {
		title: { control: 'text' },
		initiallyClosed: { control: 'boolean' },
		variant: { control: 'radio', options: ['default', 'line'] },
	},
	decorators: [(Story) => <Providers>{Story()}</Providers>],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Accordian> = ({ title, initiallyClosed, variant }) => {
		return (
			<Accordian title={title} initiallyClosed={initiallyClosed} variant={variant}>
				<p style={{ padding: 10, margin: 0 }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
				</p>
			</Accordian>
		)
	}
	return Template
}

export const AccordianSimpleOpenByDefault: StoryFn<typeof Accordian> = TemplateFactory()
AccordianSimpleOpenByDefault.args = {
	title: 'Some title accordian open by default',
	variant: 'default',
}

export const AccordianSimpleClosedByDefault: StoryFn<typeof Accordian> = TemplateFactory()
AccordianSimpleClosedByDefault.args = {
	title: 'Some title accordian close by default',
	variant: 'default',
	initiallyClosed: true,
}

export const AccordianLineVariant: StoryFn<typeof Accordian> = TemplateFactory()
AccordianLineVariant.args = {
	title: 'Some title accordian with line variant',
	variant: 'line',
}
