import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

export default function Layout({ children }) {
	return (
		<ScrollArea>
			{children}
			<Footer />
		</ScrollArea>
	)
}
