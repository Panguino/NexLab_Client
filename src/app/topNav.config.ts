export type TopNavItem = {
  id: string
  title: string
  href: string // no trailing slash
}

export const topNav: TopNavItem[] = [
  { id: 'weather-data', title: 'Weather Data', href: '/weather-data' },
  { id: 'academics', title: 'Academics', href: '/academics' },
  { id: 'storm-chasing', title: 'Storm Chasing', href: '/storm-chasing' },
  { id: 'donate', title: 'Donate', href: '/donate' },
]

