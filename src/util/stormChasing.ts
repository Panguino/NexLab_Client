export const convertStrapiChasingMaterialsData = (data) => {
	return {
		title: data.attributes.Title,
		body: data.attributes.body,
		leftGroupTitle: data.attributes.leftGroupTitle,
		rightGroupTitle: data.attributes.rightGroupTitle,
		leftGroupMaterials: data.attributes.leftGroupMaterials.map((material) => {
			return {
				id: material.id,
				name: material.Name,
				materials: material.Materials.map((material) => {
					return {
						id: material.id,
						name: material.Name,
						file: material.File?.data?.attributes?.url || '',
						link: material.Link,
					}
				}),
			}
		}),
		rightGroupMaterials: data.attributes.rightGroupMaterials.map((material) => {
			return {
				id: material.id,
				name: material.Name,
				materials: material.Materials.map((material) => {
					return {
						id: material.id,
						name: material.Name,
						file: material.File?.data?.attributes?.url || '',
						link: material.Link,
					}
				}),
			}
		}),
	}
}
