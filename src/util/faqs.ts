export const convertStrapiFAQsData = (data) => {
	return data.map((faq) => {
		return {
			id: faq.id,
			question: faq.attributes.Question,
			answer: faq.attributes.Answer,
		}
	})
}
