import { useState, useEffect } from 'react'
import { GeoProjection } from 'd3'

const useMouseD3 = (projection: GeoProjection) => {
	const [coords, setCoords] = useState<[number, number] | null>(null)

	useEffect(() => {
		if (!projection) {
			return
		}
		const handleMouseMove = (event: MouseEvent) => {
			const [lon, lat] = projection.invert([event.clientX, event.clientY])
			setCoords([lon, lat])
		}

		document.addEventListener('mousemove', handleMouseMove)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [projection])

	return coords
}
export default useMouseD3
