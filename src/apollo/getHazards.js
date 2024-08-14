'use server'
import { gql } from '@apollo/client'
import { getDataClient } from '@/apollo/apollo-client'

export const getHazards = async () => {
	const conusCountiesData = await getDataClient().query({
		query: gql`
			query {
				getRegions(regions: [CONUS, ALASKA, HAWAII, PUERTO_RICO, GUAM, AMERICAN_SAMOA]) {
					name
					states {
						type
						geometry
						counties {
							type
							geometry
							properties {
								ID
								STATE
								COUNTYNAME
							}
							alerts {
								properties {
									headline
									ends
									description
									event
									hazardInfo {
										type {
											type
											name
										}
										level {
											name
											level
										}
										color {
											HEX
										}
									}
								}
							}
						}
					}
					coasts {
						type
						geometry
						properties {
							ID
							NAME
						}
						alerts {
							properties {
								headline
								ends
								description
								event
								hazardInfo {
									type {
										type
										name
									}
									level {
										name
										level
									}
									color {
										HEX
									}
								}
							}
						}
					}
					offshores {
						type
						geometry
						properties {
							ID
							NAME
						}
						alerts {
							properties {
								headline
								ends
								description
								event
								hazardInfo {
									type {
										type
										name
									}
									level {
										name
										level
									}
									color {
										HEX
									}
								}
							}
						}
					}
				}
			}
		`
	})

	return conusCountiesData
}
