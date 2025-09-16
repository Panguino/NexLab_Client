import type { Meta, StoryFn } from '@storybook/react'
import { PageBlocks } from './PageBlocks'

export default {
  title: 'Page Blocks/PageBlocks (Full Section)',
  component: PageBlocks,
} as Meta<typeof PageBlocks>

const Template: StoryFn<typeof PageBlocks> = (args) => <PageBlocks {...args} />

const lorem = `<p>Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Pellentesque habitant morbi tristique.</p>`

export const MixedContent = Template.bind({})
MixedContent.args = {
  blocks: [
    { type: 'PageHeading', heading: 'Sample Page', body: [], buttons: [{ label: 'Action', link: '/' }] },
    { type: 'RichText', body: [] },
    {
      type: 'FeaturePanels',
      title: 'Explore',
      description: 'Choose a path',
      buttons: [{ label: 'See All', link: '/' }],
      featurePanels: [
        { title: 'Analysis', description: 'Current setups', href: '/weather-data/analysis', image: 'https://picsum.photos/300/200', linkText: 'View' },
        { title: 'Radar', description: 'Quick situational awareness', href: '/weather-data/radar', image: 'https://picsum.photos/300/201', linkText: 'View' },
        { title: 'No Link', description: 'Static', href: '', image: 'https://picsum.photos/300/202', linkText: '' },
      ],
    },
    { type: 'SimpleCta', introText: '<h1>Try <strong>NEXLAB</strong> Pro</h1>' },
    { type: 'SimpleCta', introText: lorem, buttons: [{ label: 'Join', link: '/' }], background: { url: 'https://picsum.photos/1200/800' } },
    { type: 'SimpleCta', introText: lorem, buttons: [{ label: 'Join', link: '/' }], background: { url: 'https://picsum.photos/1400/900' }, backgroundFull: true },
  ],
}

