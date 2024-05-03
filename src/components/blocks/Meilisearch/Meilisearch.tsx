'use client'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import styles from './Meilisearch.module.scss'

const { searchClient } = instantMeiliSearch(process.env.NEXT_PUBLIC_MEILISEARCH_HOST, process.env.NEXT_PUBLIC_MEILISEARCH_KEY)

const Hit = (props) => {
	console.log(props)
	return <Highlight attribute="Title" hit={props.hit} />
}

export const Meilisearch = () => {
	return (
		<div className={styles.Meilisearch}>
			<InstantSearch indexName="page" searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
				<SearchBox />
				<Hits hitComponent={Hit} />
			</InstantSearch>
		</div>
	)
}
