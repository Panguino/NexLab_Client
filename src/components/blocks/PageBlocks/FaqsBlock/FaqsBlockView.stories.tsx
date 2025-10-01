import type { Meta, StoryFn } from '@storybook/react'
import { FaqsBlockView, type FaqItem } from './FaqsBlock'

export default {
  title: 'Page Blocks/FaqsBlockView',
  component: FaqsBlockView,
} as Meta<typeof FaqsBlockView>

const Template: StoryFn<typeof FaqsBlockView> = (args) => <FaqsBlockView {...(args as any)} />

const mockFaqs: FaqItem[] = [
  {
    id: '1',
    question: 'What is NEXLAB?',
    answer: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'NEXLAB provides weather data tools and educational resources.' }],
      },
    ],
  },
  {
    id: '2',
    question: 'How often is data updated?',
    answer: [
      { type: 'paragraph', children: [{ type: 'text', text: 'Most data updates on an hourly basis.' }] },
    ],
  },
]

export const Basic = Template.bind({})
Basic.args = {
  introText: '<h2>Frequently Asked Questions</h2>',
  buttons: [{ label: 'Contact Us', link: '/' }],
  faqs: mockFaqs,
}

