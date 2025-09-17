import type { Meta, StoryFn } from '@storybook/react'
import { FaqsBlockView, type FaqItem } from './FaqsBlock'

export default {
	title: 'Page Blocks/FaqsBlock',
	component: FaqsBlockView,
} as Meta<typeof FaqsBlockView>

const Template: StoryFn<typeof FaqsBlockView> = (args) => <FaqsBlockView {...args} />

const intro = '<p>Find answers to common questions about our program.</p>'

const sampleFaqs: FaqItem[] = [
	{
		id: 'a',
		question: 'What is your refund policy?',
		answer: [{ type: 'paragraph', children: [{ type: 'text', text: 'Refunds within 30 days.' }] }],
	},
	{
		id: 'b',
		question: 'Do you offer scholarships?',
		answer: [{ type: 'paragraph', children: [{ type: 'text', text: 'Yes, limited scholarships are available.' }] }],
	},
]

export const WithTagsAndButtons = Template.bind({})
WithTagsAndButtons.args = {
	introText: intro,
	tags: [
		{ name: 'Admissions', documentId: '1' },
		{ name: 'Tuition', documentId: '2' },
	],
	buttons: [
		{ label: 'View FAQs', link: '/faqs' },
		{ label: 'Contact Us', link: '/contact' },
	],
	faqs: sampleFaqs,
}

export const NoTags = Template.bind({})
NoTags.args = {
	introText: intro,
	tags: [],
	buttons: [{ label: 'View FAQs', link: '/faqs' }],
	faqs: sampleFaqs,
}
