'use client'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import styles from './Meilisearch.module.scss'
import Link from 'next/link'

const { searchClient } = instantMeiliSearch(process.env.NEXT_PUBLIC_MEILISEARCH_HOST, process.env.NEXT_PUBLIC_MEILISEARCH_KEY, { primaryKey: 'id' })

const Hit = ({ hit }) => {
	const { id, SEO, path, Title } = hit
	const { metaTitle, metaDescription } = SEO
	return (
		<div key={id} id={id} className={styles.resultItem}>
			<Link href={path ? path : '/'}>
				<div className={styles.image}>
					<img src="https://www.weather.gov/images/gsp/tdwr/TCLT1842Refl.gif" alt={Title} />
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
			<h4>Site Search</h4>
			<InstantSearch indexName="page" searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
				<SearchBox className={styles.searchbox} />
				<Hits hitComponent={Hit} />
			</InstantSearch>
		</div>
	)
}
