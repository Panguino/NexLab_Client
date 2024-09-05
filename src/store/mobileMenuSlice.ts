import { ZustandStateSlice } from './useRootStore'

export interface IMobileMenuSlice {
	mobileMenuIsOpen: boolean
	openMobileMenu: () => void
	closeMobileMenu: () => void
}

export const createMobileMenuSlice: ZustandStateSlice<IMobileMenuSlice> = (set) => ({
	mobileMenuIsOpen: false,
	openMobileMenu: () => set(() => ({ mobileMenuIsOpen: true })),
	closeMobileMenu: () => {
		set(() => ({ mobileMenuIsOpen: false }))
	},
})
