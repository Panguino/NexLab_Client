import React from 'react'
import '@welldone-software/why-did-you-render'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	import('@welldone-software/why-did-you-render').then((whyDidYouRender) => {
		console.log('wydr activated')
		whyDidYouRender.default(React, {
			trackAllPureComponents: true
		})
	})
}

// Your application component
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />
}
