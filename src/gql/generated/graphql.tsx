import * as Apollo from '@apollo/client'
import { gql } from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
	Date: { input: any; output: any }
	JSON: { input: any; output: any }
	UUID: { input: any; output: any }
	Upload: { input: any; output: any }
}

export type Alert = {
	__typename?: 'Alert'
	geometry?: Maybe<Scalars['JSON']['output']>
	id?: Maybe<Scalars['String']['output']>
	properties?: Maybe<AlertProperties>
	type?: Maybe<Scalars['String']['output']>
}

export type AlertProperties = {
	__typename?: 'AlertProperties'
	affectedZones?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	areaDesc?: Maybe<Scalars['String']['output']>
	atId?: Maybe<Scalars['String']['output']>
	atType?: Maybe<Scalars['String']['output']>
	category?: Maybe<Scalars['String']['output']>
	certainty?: Maybe<Scalars['String']['output']>
	description?: Maybe<Scalars['String']['output']>
	effective?: Maybe<Scalars['Date']['output']>
	ends?: Maybe<Scalars['Date']['output']>
	event?: Maybe<Scalars['String']['output']>
	expires?: Maybe<Scalars['Date']['output']>
	geocode?: Maybe<GeoCode>
	hazardInfo?: Maybe<HazardInfo>
	headline?: Maybe<Scalars['String']['output']>
	id?: Maybe<Scalars['String']['output']>
	instruction?: Maybe<Scalars['String']['output']>
	messageType?: Maybe<Scalars['String']['output']>
	onset?: Maybe<Scalars['Date']['output']>
	parameters?: Maybe<ParameterObject>
	references?: Maybe<Array<Maybe<Reference>>>
	response?: Maybe<Scalars['String']['output']>
	sender?: Maybe<Scalars['String']['output']>
	senderName?: Maybe<Scalars['String']['output']>
	sent?: Maybe<Scalars['Date']['output']>
	severity?: Maybe<Scalars['String']['output']>
	status?: Maybe<Scalars['String']['output']>
	urgency?: Maybe<Scalars['String']['output']>
}

export type Bound = {
	__typename?: 'Bound'
	E?: Maybe<Scalars['Float']['output']>
	N?: Maybe<Scalars['Float']['output']>
	S?: Maybe<Scalars['Float']['output']>
	W?: Maybe<Scalars['Float']['output']>
}

export enum CacheControlScope {
	Private = 'PRIVATE',
	Public = 'PUBLIC',
}

export type Coast = {
	__typename?: 'Coast'
	alerts?: Maybe<Array<Maybe<Alert>>>
	geometry?: Maybe<Scalars['JSON']['output']>
	properties?: Maybe<CoastProperties>
	type?: Maybe<Scalars['String']['output']>
}

export type CoastProperties = {
	__typename?: 'CoastProperties'
	GL_WFO?: Maybe<Scalars['String']['output']>
	ID?: Maybe<Scalars['String']['output']>
	LAT?: Maybe<Scalars['Float']['output']>
	LON?: Maybe<Scalars['Float']['output']>
	NAME?: Maybe<Scalars['String']['output']>
	WFO?: Maybe<Scalars['String']['output']>
}

export type County = {
	__typename?: 'County'
	alerts?: Maybe<Array<Maybe<Alert>>>
	geometry?: Maybe<Scalars['JSON']['output']>
	properties?: Maybe<CountyProperties>
	type?: Maybe<Scalars['String']['output']>
}

export type CountyProperties = {
	__typename?: 'CountyProperties'
	COUNTYNAME?: Maybe<Scalars['String']['output']>
	CWA?: Maybe<Scalars['String']['output']>
	FE_AREA?: Maybe<Scalars['String']['output']>
	FIPS?: Maybe<Scalars['String']['output']>
	ID?: Maybe<Scalars['String']['output']>
	LAT?: Maybe<Scalars['Float']['output']>
	LON?: Maybe<Scalars['Float']['output']>
	STATE?: Maybe<Scalars['String']['output']>
	TIME_ZONE?: Maybe<Scalars['String']['output']>
}

export enum EHazardLevel {
	Advisory = 'ADVISORY',
	Statement = 'STATEMENT',
	Warning = 'WARNING',
	Watch = 'WATCH',
}

export enum EHazardType {
	Fire = 'FIRE',
	Hydrological = 'HYDROLOGICAL',
	Marine = 'MARINE',
	Nonmet = 'NONMET',
	Nonprecip = 'NONPRECIP',
	Severe = 'SEVERE',
	Specialwx = 'SPECIALWX',
	Tornado = 'TORNADO',
	Tropical = 'TROPICAL',
	Unknown = 'UNKNOWN',
	Winter = 'WINTER',
}

export enum ERegion {
	Alaska = 'ALASKA',
	AmericanSamoa = 'AMERICAN_SAMOA',
	Bahamas = 'BAHAMAS',
	Belize = 'BELIZE',
	Canada = 'CANADA',
	Conus = 'CONUS',
	CostaRica = 'COSTA_RICA',
	Cuba = 'CUBA',
	DominicanRepublic = 'DOMINICAN_REPUBLIC',
	ElSalvador = 'EL_SALVADOR',
	Guam = 'GUAM',
	Guatemala = 'GUATEMALA',
	Haiti = 'HAITI',
	Hawaii = 'HAWAII',
	Honduras = 'HONDURAS',
	Jamaica = 'JAMAICA',
	Mexico = 'MEXICO',
	Nicaragua = 'NICARAGUA',
	Panama = 'PANAMA',
	PuertoRico = 'PUERTO_RICO',
}

export type GeoCode = {
	__typename?: 'GeoCode'
	SAME?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	UGC?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type HazardColor = {
	__typename?: 'HazardColor'
	HEX?: Maybe<Scalars['String']['output']>
	RGB?: Maybe<Rgb>
}

export type HazardInfo = {
	__typename?: 'HazardInfo'
	color?: Maybe<HazardColor>
	level?: Maybe<HazardLevelInfo>
	type?: Maybe<HazardTypeInfo>
}

export type HazardLevelInfo = {
	__typename?: 'HazardLevelInfo'
	level?: Maybe<EHazardLevel>
	name?: Maybe<Scalars['String']['output']>
}

export type HazardTypeInfo = {
	__typename?: 'HazardTypeInfo'
	name?: Maybe<Scalars['String']['output']>
	type?: Maybe<EHazardType>
}

export type Offshore = {
	__typename?: 'Offshore'
	alerts?: Maybe<Array<Maybe<Alert>>>
	geometry?: Maybe<Scalars['JSON']['output']>
	properties?: Maybe<OffshoreProperties>
	type?: Maybe<Scalars['String']['output']>
}

export type OffshoreProperties = {
	__typename?: 'OffshoreProperties'
	ID?: Maybe<Scalars['String']['output']>
	LAT?: Maybe<Scalars['Float']['output']>
	LON?: Maybe<Scalars['Float']['output']>
	Location?: Maybe<Scalars['String']['output']>
	NAME?: Maybe<Scalars['String']['output']>
	WFO?: Maybe<Scalars['String']['output']>
}

export type ParameterObject = {
	__typename?: 'ParameterObject'
	AWIPSidentifier?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	BLOCKCHANNEL?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	NWSheadline?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	VTEC?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	WMOidentifier?: Maybe<Array<Maybe<Scalars['String']['output']>>>
	eventEndingTime?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type Query = {
	__typename?: 'Query'
	getCoastByUGC?: Maybe<Coast>
	getCountyByFIPS?: Maybe<County>
	getOffshoreByUGC?: Maybe<Offshore>
	getRegion?: Maybe<Region>
	getRegions?: Maybe<Array<Maybe<Region>>>
	getStateByFIPS?: Maybe<State>
}

export type QueryGetCoastByUgcArgs = {
	UGC: Scalars['String']['input']
}

export type QueryGetCountyByFipsArgs = {
	FIPS: Scalars['String']['input']
}

export type QueryGetOffshoreByUgcArgs = {
	UGC: Scalars['String']['input']
}

export type QueryGetRegionArgs = {
	region: ERegion
}

export type QueryGetRegionsArgs = {
	regions: Array<InputMaybe<ERegion>>
}

export type QueryGetStateByFipsArgs = {
	FIPS: Scalars['String']['input']
}

export type Rgb = {
	__typename?: 'RGB'
	B?: Maybe<Scalars['Int']['output']>
	G?: Maybe<Scalars['Int']['output']>
	R?: Maybe<Scalars['Int']['output']>
}

export type Reference = {
	__typename?: 'Reference'
	atId?: Maybe<Scalars['String']['output']>
	identifier?: Maybe<Scalars['String']['output']>
	sender?: Maybe<Scalars['String']['output']>
	sent?: Maybe<Scalars['Date']['output']>
}

export type Region = {
	__typename?: 'Region'
	bounds?: Maybe<Array<Maybe<Bound>>>
	coasts?: Maybe<Array<Maybe<Coast>>>
	name?: Maybe<Scalars['String']['output']>
	offshores?: Maybe<Array<Maybe<Offshore>>>
	states?: Maybe<Array<Maybe<State>>>
}

export type State = {
	__typename?: 'State'
	counties?: Maybe<Array<Maybe<County>>>
	geometry?: Maybe<Scalars['JSON']['output']>
	properties?: Maybe<StateProperties>
	type?: Maybe<Scalars['String']['output']>
}

export type StateProperties = {
	__typename?: 'StateProperties'
	FIPS?: Maybe<Scalars['String']['output']>
	LAT?: Maybe<Scalars['Float']['output']>
	LON?: Maybe<Scalars['Float']['output']>
	NAME?: Maybe<Scalars['String']['output']>
	STATE?: Maybe<Scalars['String']['output']>
}

export type GetHazardsQueryVariables = Exact<{ [key: string]: never }>

export type GetHazardsQuery = {
	__typename?: 'Query'
	getRegions?: Array<{
		__typename?: 'Region'
		name?: string | null
		states?: Array<{
			__typename?: 'State'
			type?: string | null
			geometry?: any | null
			counties?: Array<{
				__typename?: 'County'
				type?: string | null
				geometry?: any | null
				properties?: {
					__typename?: 'CountyProperties'
					ID?: string | null
					STATE?: string | null
					COUNTYNAME?: string | null
					LAT?: number | null
					LON?: number | null
				} | null
				alerts?: Array<{
					__typename?: 'Alert'
					properties?: {
						__typename?: 'AlertProperties'
						headline?: string | null
						ends?: any | null
						description?: string | null
						event?: string | null
						hazardInfo?: {
							__typename?: 'HazardInfo'
							type?: { __typename?: 'HazardTypeInfo'; type?: EHazardType | null; name?: string | null } | null
							level?: { __typename?: 'HazardLevelInfo'; name?: string | null; level?: EHazardLevel | null } | null
							color?: { __typename?: 'HazardColor'; HEX?: string | null } | null
						} | null
					} | null
				} | null> | null
			} | null> | null
		} | null> | null
		coasts?: Array<{
			__typename?: 'Coast'
			type?: string | null
			geometry?: any | null
			properties?: { __typename?: 'CoastProperties'; ID?: string | null; NAME?: string | null; LAT?: number | null; LON?: number | null } | null
			alerts?: Array<{
				__typename?: 'Alert'
				properties?: {
					__typename?: 'AlertProperties'
					headline?: string | null
					ends?: any | null
					description?: string | null
					event?: string | null
					hazardInfo?: {
						__typename?: 'HazardInfo'
						type?: { __typename?: 'HazardTypeInfo'; type?: EHazardType | null; name?: string | null } | null
						level?: { __typename?: 'HazardLevelInfo'; name?: string | null; level?: EHazardLevel | null } | null
						color?: { __typename?: 'HazardColor'; HEX?: string | null } | null
					} | null
				} | null
			} | null> | null
		} | null> | null
		offshores?: Array<{
			__typename?: 'Offshore'
			type?: string | null
			geometry?: any | null
			properties?: {
				__typename?: 'OffshoreProperties'
				ID?: string | null
				NAME?: string | null
				LAT?: number | null
				LON?: number | null
			} | null
			alerts?: Array<{
				__typename?: 'Alert'
				properties?: {
					__typename?: 'AlertProperties'
					headline?: string | null
					ends?: any | null
					description?: string | null
					event?: string | null
					hazardInfo?: {
						__typename?: 'HazardInfo'
						type?: { __typename?: 'HazardTypeInfo'; type?: EHazardType | null; name?: string | null } | null
						level?: { __typename?: 'HazardLevelInfo'; name?: string | null; level?: EHazardLevel | null } | null
						color?: { __typename?: 'HazardColor'; HEX?: string | null } | null
					} | null
				} | null
			} | null> | null
		} | null> | null
	} | null> | null
}

export type GetRegionShapesQueryVariables = Exact<{ [key: string]: never }>

export type GetRegionShapesQuery = {
	__typename?: 'Query'
	getRegions?: Array<{
		__typename?: 'Region'
		name?: string | null
		states?: Array<{ __typename?: 'State'; type?: string | null; geometry?: any | null } | null> | null
	} | null> | null
}

export const GetHazardsDocument = gql`
	query getHazards {
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
						LAT
						LON
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
					LAT
					LON
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
					LAT
					LON
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

/**
 * __useGetHazardsQuery__
 *
 * To run a query within a React component, call `useGetHazardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHazardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHazardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHazardsQuery(baseOptions?: Apollo.QueryHookOptions<GetHazardsQuery, GetHazardsQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetHazardsQuery, GetHazardsQueryVariables>(GetHazardsDocument, options)
}
export function useGetHazardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHazardsQuery, GetHazardsQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetHazardsQuery, GetHazardsQueryVariables>(GetHazardsDocument, options)
}
export function useGetHazardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetHazardsQuery, GetHazardsQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetHazardsQuery, GetHazardsQueryVariables>(GetHazardsDocument, options)
}
export type GetHazardsQueryHookResult = ReturnType<typeof useGetHazardsQuery>
export type GetHazardsLazyQueryHookResult = ReturnType<typeof useGetHazardsLazyQuery>
export type GetHazardsSuspenseQueryHookResult = ReturnType<typeof useGetHazardsSuspenseQuery>
export type GetHazardsQueryResult = Apollo.QueryResult<GetHazardsQuery, GetHazardsQueryVariables>
export const GetRegionShapesDocument = gql`
	query getRegionShapes {
		getRegions(
			regions: [
				CANADA
				PANAMA
				MEXICO
				CUBA
				GUATEMALA
				BELIZE
				HONDURAS
				EL_SALVADOR
				DOMINICAN_REPUBLIC
				HAITI
				JAMAICA
				BAHAMAS
				NICARAGUA
				COSTA_RICA
			]
		) {
			name
			states {
				type
				geometry
			}
		}
	}
`

/**
 * __useGetRegionShapesQuery__
 *
 * To run a query within a React component, call `useGetRegionShapesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegionShapesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegionShapesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRegionShapesQuery(baseOptions?: Apollo.QueryHookOptions<GetRegionShapesQuery, GetRegionShapesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetRegionShapesQuery, GetRegionShapesQueryVariables>(GetRegionShapesDocument, options)
}
export function useGetRegionShapesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegionShapesQuery, GetRegionShapesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetRegionShapesQuery, GetRegionShapesQueryVariables>(GetRegionShapesDocument, options)
}
export function useGetRegionShapesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRegionShapesQuery, GetRegionShapesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetRegionShapesQuery, GetRegionShapesQueryVariables>(GetRegionShapesDocument, options)
}
export type GetRegionShapesQueryHookResult = ReturnType<typeof useGetRegionShapesQuery>
export type GetRegionShapesLazyQueryHookResult = ReturnType<typeof useGetRegionShapesLazyQuery>
export type GetRegionShapesSuspenseQueryHookResult = ReturnType<typeof useGetRegionShapesSuspenseQuery>
export type GetRegionShapesQueryResult = Apollo.QueryResult<GetRegionShapesQuery, GetRegionShapesQueryVariables>
