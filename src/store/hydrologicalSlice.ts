import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultHydroZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IHydrologicalSlice {
	// ERO animator settings
	hydroEROFrameRate: number
	setHydroEROFrameRate: (frameRate: number) => void
	hydroEROLastFrameDwell: boolean
	setHydroEROLastFrameDwell: (dwell: boolean) => void
	hydroEROLastFrameDwellTime: number
	setHydroEROLastFrameDwellTime: (dwellTime: number) => void
	hydroEROZoomState: zoomState
	setHydroEROZoomState: (zoomState: zoomState) => void
	resetHydroEROZoomState: () => void
	hydroEROZoomFill: boolean
	setHydroEROZoomFill: (zoomFill: boolean) => void
}

export const createHydrologicalSlice: ZustandStateSlice<IHydrologicalSlice> = (set) => ({
	// ERO animator settings
	hydroEROFrameRate: 2,
	setHydroEROFrameRate: (frameRate: number) => set(() => ({ hydroEROFrameRate: frameRate })),
	hydroEROLastFrameDwell: true,
	setHydroEROLastFrameDwell: (dwell: boolean) => set(() => ({ hydroEROLastFrameDwell: dwell })),
	hydroEROLastFrameDwellTime: 2,
	setHydroEROLastFrameDwellTime: (dwellTime: number) => set(() => ({ hydroEROLastFrameDwellTime: dwellTime })),
	hydroEROZoomState: { ...defaultHydroZoomState },
	setHydroEROZoomState: (hydroEROZoomState) => set(() => ({ hydroEROZoomState })),
	resetHydroEROZoomState: () => set(() => ({ hydroEROZoomState: { ...defaultHydroZoomState } })),
	hydroEROZoomFill: false,
	setHydroEROZoomFill: (zoomFill: boolean) => set(() => ({ hydroEROZoomFill: zoomFill })),
})
