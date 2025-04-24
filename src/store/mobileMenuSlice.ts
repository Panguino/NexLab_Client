import { ZustandStateSlice } from './useRootStore'

export interface IMobileMenuSlice {
	mobileMenuIsOpen: boolean
	openMobileMenu: () => void
	closeMobileMenu: () => void
	mobileSidebarMenuIsOpen: boolean
	openMobileSidebarMenu: () => void
	closeMobileSidebarMenu: () => void
	toggleMobileSidebarMenu: () => void
}

export const createMobileMenuSlice: ZustandStateSlice<IMobileMenuSlice> = (set) => ({
	mobileMenuIsOpen: false,
	openMobileMenu: () => set(() => ({ mobileMenuIsOpen: true })),
	closeMobileMenu: () => {
		set(() => ({ mobileMenuIsOpen: false }))
	},
	mobileSidebarMenuIsOpen: false,
	openMobileSidebarMenu: () => set(() => ({ mobileSidebarMenuIsOpen: true })),
	closeMobileSidebarMenu: () => {
		set(() => ({ mobileSidebarMenuIsOpen: false }))
	},
	toggleMobileSidebarMenu: () => set((state) => ({ mobileSidebarMenuIsOpen: !state.mobileSidebarMenuIsOpen })),
})
