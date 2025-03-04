import { d3ConfigProps } from '@/components/elements/SectorSelector/SectorSelector'
import { DotColor, DotShape } from '@/data/d3Map/dotStyles'
import { ZustandStateSlice } from './useRootStore'

export interface ISector {
	id: string
	name: string
	type: 'Point' | 'Geobox' | 'Line'
	coordinates: [number, number] | [[number, number], [number, number]]
	dotShape?: DotShape | null
	dotColor?: DotColor | null
}

export interface ISectorSelectorPanelSlice {
	sectorSelectorPanelIsOpen: boolean
	openSectorSelectorPanel: () => void
	closeSectorSelectorPanel: () => void
	sectorSelectorSectors: ISector[]
	setSectorSelectorSectors: (sectors: ISector[]) => void
	sectorSelectorCurrentSector: string | null
	onSectorSelectorChange: (id: string) => void
	sectorSelectorD3config: d3ConfigProps
	setSectorSelectorD3config: (d3config: d3ConfigProps) => void
}

export const createSectorSelectorPanelSlice: ZustandStateSlice<ISectorSelectorPanelSlice> = (set) => ({
	sectorSelectorPanelIsOpen: false,
	openSectorSelectorPanel: () => set(() => ({ sectorSelectorPanelIsOpen: true })),
	closeSectorSelectorPanel: () => {
		set(() => ({ sectorSelectorPanelIsOpen: false }))
	},
	sectorSelectorSectors: [],
	setSectorSelectorSectors: (sectors) => set(() => ({ sectorSelectorSectors: sectors })),
	sectorSelectorCurrentSector: null,
	onSectorSelectorChange: (id) => set(() => ({ sectorSelectorCurrentSector: id })),
	sectorSelectorD3config: { width: 1000, height: 600, rotate: [0, 0], scale: 1 },
	setSectorSelectorD3config: (d3config) => set(() => ({ sectorSelectorD3config: d3config })),
})
