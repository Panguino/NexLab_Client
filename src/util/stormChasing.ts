export const convertStrapiChasingMaterialsData = (data) => {
	return {
		title: data.Title,
		body: data.body,
		leftGroupTitle: data.leftGroupTitle,
		rightGroupTitle: data.rightGroupTitle,
		leftGroupMaterials: data.leftGroupMaterials.map((material) => {
			return {
				id: material.id,
				name: material.Name,
				materials: material.Materials.map((material) => {
					return {
						id: material.id,
						name: material.Name,
						file: material.File?.url || '',
						link: material.Link,
					}
				}),
			}
		}),
		rightGroupMaterials: data.rightGroupMaterials.map((material) => {
			return {
				id: material.id,
				name: material.Name,
				materials: material.Materials.map((material) => {
					return {
						id: material.id,
						name: material.Name,
						file: material.File?.url || '',
						link: material.Link,
					}
				}),
			}
		}),
	}
}
