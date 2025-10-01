import type { Meta, StoryFn } from '@storybook/react'
import { TwoPanelIconInfo } from './TwoPanelIconInfo'

export default {
  title: 'Page Blocks/TwoPanelIconInfo',
  component: TwoPanelIconInfo,
} as Meta<typeof TwoPanelIconInfo>

const Template: StoryFn<typeof TwoPanelIconInfo> = (args) => <TwoPanelIconInfo {...args} />

export const Default = Template.bind({})
Default.args = {
  panels: [
    {
      icon: 'https://picsum.photos/48/48',
      heading: 'Panel A',
      body: 'Description A',
      buttonLabel: 'Learn',
      buttonUrl: '/',
      buttonTarget: '_self',
      backgroundImage: 'https://picsum.photos/600/300',
    },
    {
      icon: 'https://picsum.photos/48/48',
      heading: 'Panel B',
      body: 'Description B',
      buttonLabel: 'More',
      buttonUrl: '/',
      buttonTarget: '_self',
      backgroundImage: 'https://picsum.photos/601/301',
    },
  ],
}

