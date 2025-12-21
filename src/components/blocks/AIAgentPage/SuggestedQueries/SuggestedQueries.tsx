'use client'

import React from 'react'
import styles from './SuggestedQueries.module.scss'
import { SUGGESTED_QUERIES } from '@/util/ai-agent/aiService'

interface SuggestedQueriesProps {
	onSelect: (query: string) => void
	disabled?: boolean
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({
	onSelect,
	disabled = false
}) => {
	return (
		<div className={styles.suggestedQueries}>
			<h3 className={styles.title}>Try asking:</h3>
			<div className={styles.queriesGrid}>
				{SUGGESTED_QUERIES.map((query, index) => (
					<button
						key={index}
						className={styles.queryButton}
						onClick={() => onSelect(query)}
						disabled={disabled}
					>
						<span className={styles.icon}>💬</span>
						<span className={styles.text}>{query}</span>
					</button>
				))}
			</div>
		</div>
	)
}

export default SuggestedQueries

