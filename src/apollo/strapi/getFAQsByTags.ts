'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getFAQsByTagIds = async (tagIds: string[]) => {
	if (!tagIds || tagIds.length === 0) return []

	// Primary: server-side filter by tag IDs (now exposed)
	try {
		const { data } = await getClient().query({
			query: gql`
				query GetFAQsByTags($tagIds: [ID!]) {
					faqs(filters: { faq_tags: { documentId: { in: $tagIds } } }, pagination: { limit: 1000 }) {
						documentId
						Question
						Answer
					}
				}
			`,
			variables: { tagIds },
		})
		return (data?.faqs || []).map((f) => ({ id: f.documentId, question: f.Question, answer: f.Answer }))
	} catch (e) {
		// Fallback: fetch with tags relation and filter client-side
		try {
			const { data } = await getClient().query({
				query: gql`
					query GetAllFAQsWithTags($limit: Int) {
						faqs(pagination: { limit: $limit }) {
							documentId
							Question
							Answer
							faq_tags {
								documentId
							}
						}
					}
				`,
				variables: { limit: 1000 },
			})
			const set = new Set(tagIds)
			const filtered = (data?.faqs || []).filter((f) => (f?.faq_tags || []).some((t) => t?.documentId && set.has(t.documentId)))
			return filtered.map((f) => ({ id: f.documentId, question: f.Question, answer: f.Answer }))
		} catch (e2) {
			return []
		}
	}
}
