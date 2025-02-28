import { d3ConfigProps } from '@/components/elements/SectorSelector/SectorSelector'
import { DotColor, DotShape } from '@/data/d3Map/dotStyles'
import { ZustandStateSlice } from './useRootStore'

export interface ISectorSelectorPanelSlice {
	sectorSelectorPanelIsOpen: boolean
	openSectorSelectorPanel: () => void
	closeSectorSelectorPanel: () => void
	sectors: {
		id: string
		name: string
		type: 'Point' | 'Geobox' | 'Line'
		dotShape: DotShape | null
		dotColor: DotColor | null
		coordinates: [number, number] | [[number, number], [number, number]]
	}[]
	sector: string
	onChange: (id: string) => void
	d3config: d3ConfigProps
}

export const createSectorSelectorPanelSlice: ZustandStateSlice<ISectorSelectorPanelSlice> = (set) => ({
	sectorSelectorPanelIsOpen: false,
	sectors: [],
	sector: '',
	onChange: () => {},
	d3config: null,
	openSectorSelectorPanel: () => set(() => ({ sectorSelectorPanelIsOpen: true })),
	closeSectorSelectorPanel: () => {
		set(() => ({ sectorSelectorPanelIsOpen: false }))
	},
})
