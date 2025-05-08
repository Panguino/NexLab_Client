export const convertStrapiFAQsData = (data) => {
	return data.map((faq) => {
		return {
			id: faq.documentId,
			question: faq.Question,
			answer: faq.Answer,
		}
	})
}
