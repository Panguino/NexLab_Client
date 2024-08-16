'use client'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch'
import styles from './Meilisearch.module.scss'

const { searchClient } = instantMeiliSearch(process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? '', process.env.NEXT_PUBLIC_MEILISEARCH_KEY ?? '', {
	primaryKey: 'id',
})

const Hit = ({ hit }: { hit: any }) => {
	const { id, SEO, path, Title, Image } = hit
	const { metaTitle, metaDescription } = SEO
	return (
		<div key={id} id={id} className={styles.resultItem}>
			<Link href={path ? path : '/'}>
				<div className={styles.image}>
					<img src={Image && Image.url ? Image.url : 'https://www.weather.gov/images/gsp/tdwr/TCLT1842Refl.gif'} alt={Title} />
				</div>
				<div className={styles.info}>
					<h2>{metaTitle}</h2>
					<p>{metaDescription}</p>
				</div>
			</Link>
		</div>
	)
}

export const Meilisearch = () => {
	return (
		<div className={styles.Meilisearch}>
			<ScrollArea>
				<div className={styles.resultsContainer}>
					<InstantSearch indexName="page" searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
						<SearchBox className={styles.searchbox} />
						<Hits hitComponent={Hit} />
					</InstantSearch>
				</div>
			</ScrollArea>
		</div>
	)
}
