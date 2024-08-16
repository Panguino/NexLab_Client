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
	DateTime: { input: any; output: any }
	JSON: { input: any; output: any }
	Long: { input: any; output: any }
	Upload: { input: any; output: any }
}

export type BooleanFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
	contains?: InputMaybe<Scalars['Boolean']['input']>
	containsi?: InputMaybe<Scalars['Boolean']['input']>
	endsWith?: InputMaybe<Scalars['Boolean']['input']>
	eq?: InputMaybe<Scalars['Boolean']['input']>
	eqi?: InputMaybe<Scalars['Boolean']['input']>
	gt?: InputMaybe<Scalars['Boolean']['input']>
	gte?: InputMaybe<Scalars['Boolean']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
	lt?: InputMaybe<Scalars['Boolean']['input']>
	lte?: InputMaybe<Scalars['Boolean']['input']>
	ne?: InputMaybe<Scalars['Boolean']['input']>
	nei?: InputMaybe<Scalars['Boolean']['input']>
	not?: InputMaybe<BooleanFilterInput>
	notContains?: InputMaybe<Scalars['Boolean']['input']>
	notContainsi?: InputMaybe<Scalars['Boolean']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
	startsWith?: InputMaybe<Scalars['Boolean']['input']>
}

export type Campus = {
	__typename?: 'Campus'
	Color?: Maybe<Scalars['JSON']['output']>
	Latitude?: Maybe<Scalars['Float']['output']>
	Logo?: Maybe<UploadFileEntityResponse>
	Longitude?: Maybe<Scalars['Float']['output']>
	Name?: Maybe<Scalars['String']['output']>
	SEO?: Maybe<ComponentSharedSeo>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	gridX?: Maybe<Scalars['Long']['output']>
	gridY?: Maybe<Scalars['Long']['output']>
	publishedAt?: Maybe<Scalars['DateTime']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type CampusEntity = {
	__typename?: 'CampusEntity'
	attributes?: Maybe<Campus>
	id?: Maybe<Scalars['ID']['output']>
}

export type CampusEntityResponse = {
	__typename?: 'CampusEntityResponse'
	data?: Maybe<CampusEntity>
}

export type CampusEntityResponseCollection = {
	__typename?: 'CampusEntityResponseCollection'
	data: Array<CampusEntity>
	meta: ResponseCollectionMeta
}

export type CampusFiltersInput = {
	Color?: InputMaybe<JsonFilterInput>
	Latitude?: InputMaybe<FloatFilterInput>
	Longitude?: InputMaybe<FloatFilterInput>
	Name?: InputMaybe<StringFilterInput>
	SEO?: InputMaybe<ComponentSharedSeoFiltersInput>
	and?: InputMaybe<Array<InputMaybe<CampusFiltersInput>>>
	createdAt?: InputMaybe<DateTimeFilterInput>
	gridX?: InputMaybe<LongFilterInput>
	gridY?: InputMaybe<LongFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<CampusFiltersInput>
	or?: InputMaybe<Array<InputMaybe<CampusFiltersInput>>>
	publishedAt?: InputMaybe<DateTimeFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type CampusInput = {
	Color?: InputMaybe<Scalars['JSON']['input']>
	Latitude?: InputMaybe<Scalars['Float']['input']>
	Logo?: InputMaybe<Scalars['ID']['input']>
	Longitude?: InputMaybe<Scalars['Float']['input']>
	Name?: InputMaybe<Scalars['String']['input']>
	SEO?: InputMaybe<ComponentSharedSeoInput>
	gridX?: InputMaybe<Scalars['Long']['input']>
	gridY?: InputMaybe<Scalars['Long']['input']>
	publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type ComponentListButtons = {
	__typename?: 'ComponentListButtons'
	Label?: Maybe<Scalars['String']['output']>
	Link?: Maybe<Scalars['String']['output']>
	Style?: Maybe<Enum_Componentlistbuttons_Style>
	id: Scalars['ID']['output']
}

export type ComponentListButtonsFiltersInput = {
	Label?: InputMaybe<StringFilterInput>
	Link?: InputMaybe<StringFilterInput>
	Style?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<ComponentListButtonsFiltersInput>>>
	not?: InputMaybe<ComponentListButtonsFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentListButtonsFiltersInput>>>
}

export type ComponentListButtonsInput = {
	Label?: InputMaybe<Scalars['String']['input']>
	Link?: InputMaybe<Scalars['String']['input']>
	Style?: InputMaybe<Enum_Componentlistbuttons_Style>
	id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentListMaterialGroup = {
	__typename?: 'ComponentListMaterialGroup'
	Materials?: Maybe<Array<Maybe<ComponentListMaterials>>>
	Name?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
}

export type ComponentListMaterialGroupMaterialsArgs = {
	filters?: InputMaybe<ComponentListMaterialsFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentListMaterialGroupFiltersInput = {
	Materials?: InputMaybe<ComponentListMaterialsFiltersInput>
	Name?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<ComponentListMaterialGroupFiltersInput>>>
	not?: InputMaybe<ComponentListMaterialGroupFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentListMaterialGroupFiltersInput>>>
}

export type ComponentListMaterialGroupInput = {
	Materials?: InputMaybe<Array<InputMaybe<ComponentListMaterialsInput>>>
	Name?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentListMaterials = {
	__typename?: 'ComponentListMaterials'
	File?: Maybe<UploadFileEntityResponse>
	Link?: Maybe<Scalars['String']['output']>
	Name?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
}

export type ComponentListMaterialsFiltersInput = {
	Link?: InputMaybe<StringFilterInput>
	Name?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<ComponentListMaterialsFiltersInput>>>
	not?: InputMaybe<ComponentListMaterialsFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentListMaterialsFiltersInput>>>
}

export type ComponentListMaterialsInput = {
	File?: InputMaybe<Scalars['ID']['input']>
	Link?: InputMaybe<Scalars['String']['input']>
	Name?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentListSchoolLinks = {
	__typename?: 'ComponentListSchoolLinks'
	Link?: Maybe<Scalars['String']['output']>
	School?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
}

export type ComponentListSchoolLinksFiltersInput = {
	Link?: InputMaybe<StringFilterInput>
	School?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<ComponentListSchoolLinksFiltersInput>>>
	not?: InputMaybe<ComponentListSchoolLinksFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentListSchoolLinksFiltersInput>>>
}

export type ComponentListSchoolLinksInput = {
	Link?: InputMaybe<Scalars['String']['input']>
	School?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentListSchools = {
	__typename?: 'ComponentListSchools'
	SchoolLinks?: Maybe<Array<Maybe<ComponentListSchoolLinks>>>
	SchoolList?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
}

export type ComponentListSchoolsSchoolLinksArgs = {
	filters?: InputMaybe<ComponentListSchoolLinksFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentListSchoolsFiltersInput = {
	SchoolLinks?: InputMaybe<ComponentListSchoolLinksFiltersInput>
	SchoolList?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<ComponentListSchoolsFiltersInput>>>
	not?: InputMaybe<ComponentListSchoolsFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentListSchoolsFiltersInput>>>
}

export type ComponentListSchoolsInput = {
	SchoolLinks?: InputMaybe<Array<InputMaybe<ComponentListSchoolLinksInput>>>
	SchoolList?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSharedMetaSocial = {
	__typename?: 'ComponentSharedMetaSocial'
	description: Scalars['String']['output']
	id: Scalars['ID']['output']
	image?: Maybe<UploadFileEntityResponse>
	socialNetwork: Enum_Componentsharedmetasocial_Socialnetwork
	title: Scalars['String']['output']
}

export type ComponentSharedMetaSocialFiltersInput = {
	and?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialFiltersInput>>>
	description?: InputMaybe<StringFilterInput>
	not?: InputMaybe<ComponentSharedMetaSocialFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialFiltersInput>>>
	socialNetwork?: InputMaybe<StringFilterInput>
	title?: InputMaybe<StringFilterInput>
}

export type ComponentSharedMetaSocialInput = {
	description?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
	image?: InputMaybe<Scalars['ID']['input']>
	socialNetwork?: InputMaybe<Enum_Componentsharedmetasocial_Socialnetwork>
	title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSharedSeo = {
	__typename?: 'ComponentSharedSeo'
	canonicalURL?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	keywords?: Maybe<Scalars['String']['output']>
	metaDescription: Scalars['String']['output']
	metaImage?: Maybe<UploadFileEntityResponse>
	metaRobots?: Maybe<Scalars['String']['output']>
	metaSocial?: Maybe<Array<Maybe<ComponentSharedMetaSocial>>>
	metaTitle: Scalars['String']['output']
	metaViewport?: Maybe<Scalars['String']['output']>
	structuredData?: Maybe<Scalars['JSON']['output']>
}

export type ComponentSharedSeoMetaSocialArgs = {
	filters?: InputMaybe<ComponentSharedMetaSocialFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSharedSeoFiltersInput = {
	and?: InputMaybe<Array<InputMaybe<ComponentSharedSeoFiltersInput>>>
	canonicalURL?: InputMaybe<StringFilterInput>
	keywords?: InputMaybe<StringFilterInput>
	metaDescription?: InputMaybe<StringFilterInput>
	metaRobots?: InputMaybe<StringFilterInput>
	metaSocial?: InputMaybe<ComponentSharedMetaSocialFiltersInput>
	metaTitle?: InputMaybe<StringFilterInput>
	metaViewport?: InputMaybe<StringFilterInput>
	not?: InputMaybe<ComponentSharedSeoFiltersInput>
	or?: InputMaybe<Array<InputMaybe<ComponentSharedSeoFiltersInput>>>
	structuredData?: InputMaybe<JsonFilterInput>
}

export type ComponentSharedSeoInput = {
	canonicalURL?: InputMaybe<Scalars['String']['input']>
	id?: InputMaybe<Scalars['ID']['input']>
	keywords?: InputMaybe<Scalars['String']['input']>
	metaDescription?: InputMaybe<Scalars['String']['input']>
	metaImage?: InputMaybe<Scalars['ID']['input']>
	metaRobots?: InputMaybe<Scalars['String']['input']>
	metaSocial?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialInput>>>
	metaTitle?: InputMaybe<Scalars['String']['input']>
	metaViewport?: InputMaybe<Scalars['String']['input']>
	structuredData?: InputMaybe<Scalars['JSON']['input']>
}

export type Course = {
	__typename?: 'Course'
	CourseID?: Maybe<Scalars['Int']['output']>
	Description?: Maybe<Scalars['JSON']['output']>
	MaterialGroup?: Maybe<Array<Maybe<ComponentListMaterialGroup>>>
	Title?: Maybe<Scalars['String']['output']>
	course_category?: Maybe<CourseCategoryEntityResponse>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	publishedAt?: Maybe<Scalars['DateTime']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type CourseMaterialGroupArgs = {
	filters?: InputMaybe<ComponentListMaterialGroupFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type CourseCategory = {
	__typename?: 'CourseCategory'
	Name?: Maybe<Scalars['String']['output']>
	courses?: Maybe<CourseRelationResponseCollection>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	publishedAt?: Maybe<Scalars['DateTime']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type CourseCategoryCoursesArgs = {
	filters?: InputMaybe<CourseFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type CourseCategoryEntity = {
	__typename?: 'CourseCategoryEntity'
	attributes?: Maybe<CourseCategory>
	id?: Maybe<Scalars['ID']['output']>
}

export type CourseCategoryEntityResponse = {
	__typename?: 'CourseCategoryEntityResponse'
	data?: Maybe<CourseCategoryEntity>
}

export type CourseCategoryEntityResponseCollection = {
	__typename?: 'CourseCategoryEntityResponseCollection'
	data: Array<CourseCategoryEntity>
	meta: ResponseCollectionMeta
}

export type CourseCategoryFiltersInput = {
	Name?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<CourseCategoryFiltersInput>>>
	courses?: InputMaybe<CourseFiltersInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<CourseCategoryFiltersInput>
	or?: InputMaybe<Array<InputMaybe<CourseCategoryFiltersInput>>>
	publishedAt?: InputMaybe<DateTimeFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type CourseCategoryInput = {
	Name?: InputMaybe<Scalars['String']['input']>
	courses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type CourseEntity = {
	__typename?: 'CourseEntity'
	attributes?: Maybe<Course>
	id?: Maybe<Scalars['ID']['output']>
}

export type CourseEntityResponse = {
	__typename?: 'CourseEntityResponse'
	data?: Maybe<CourseEntity>
}

export type CourseEntityResponseCollection = {
	__typename?: 'CourseEntityResponseCollection'
	data: Array<CourseEntity>
	meta: ResponseCollectionMeta
}

export type CourseFiltersInput = {
	CourseID?: InputMaybe<IntFilterInput>
	Description?: InputMaybe<JsonFilterInput>
	MaterialGroup?: InputMaybe<ComponentListMaterialGroupFiltersInput>
	Title?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>
	course_category?: InputMaybe<CourseCategoryFiltersInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<CourseFiltersInput>
	or?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>
	publishedAt?: InputMaybe<DateTimeFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type CourseInput = {
	CourseID?: InputMaybe<Scalars['Int']['input']>
	Description?: InputMaybe<Scalars['JSON']['input']>
	MaterialGroup?: InputMaybe<Array<InputMaybe<ComponentListMaterialGroupInput>>>
	Title?: InputMaybe<Scalars['String']['input']>
	course_category?: InputMaybe<Scalars['ID']['input']>
	publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type CourseRelationResponseCollection = {
	__typename?: 'CourseRelationResponseCollection'
	data: Array<CourseEntity>
}

export type DateTimeFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
	contains?: InputMaybe<Scalars['DateTime']['input']>
	containsi?: InputMaybe<Scalars['DateTime']['input']>
	endsWith?: InputMaybe<Scalars['DateTime']['input']>
	eq?: InputMaybe<Scalars['DateTime']['input']>
	eqi?: InputMaybe<Scalars['DateTime']['input']>
	gt?: InputMaybe<Scalars['DateTime']['input']>
	gte?: InputMaybe<Scalars['DateTime']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
	lt?: InputMaybe<Scalars['DateTime']['input']>
	lte?: InputMaybe<Scalars['DateTime']['input']>
	ne?: InputMaybe<Scalars['DateTime']['input']>
	nei?: InputMaybe<Scalars['DateTime']['input']>
	not?: InputMaybe<DateTimeFilterInput>
	notContains?: InputMaybe<Scalars['DateTime']['input']>
	notContainsi?: InputMaybe<Scalars['DateTime']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
	startsWith?: InputMaybe<Scalars['DateTime']['input']>
}

export type Degree = {
	__typename?: 'Degree'
	Buttons?: Maybe<Array<Maybe<ComponentListButtons>>>
	Description?: Maybe<Scalars['JSON']['output']>
	Schools?: Maybe<Array<Maybe<ComponentListSchools>>>
	Title?: Maybe<Scalars['String']['output']>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	publishedAt?: Maybe<Scalars['DateTime']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DegreeButtonsArgs = {
	filters?: InputMaybe<ComponentListButtonsFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DegreeSchoolsArgs = {
	filters?: InputMaybe<ComponentListSchoolsFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DegreeEntity = {
	__typename?: 'DegreeEntity'
	attributes?: Maybe<Degree>
	id?: Maybe<Scalars['ID']['output']>
}

export type DegreeEntityResponse = {
	__typename?: 'DegreeEntityResponse'
	data?: Maybe<DegreeEntity>
}

export type DegreeEntityResponseCollection = {
	__typename?: 'DegreeEntityResponseCollection'
	data: Array<DegreeEntity>
	meta: ResponseCollectionMeta
}

export type DegreeFiltersInput = {
	Buttons?: InputMaybe<ComponentListButtonsFiltersInput>
	Description?: InputMaybe<JsonFilterInput>
	Schools?: InputMaybe<ComponentListSchoolsFiltersInput>
	Title?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<DegreeFiltersInput>>>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<DegreeFiltersInput>
	or?: InputMaybe<Array<InputMaybe<DegreeFiltersInput>>>
	publishedAt?: InputMaybe<DateTimeFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DegreeInput = {
	Buttons?: InputMaybe<Array<InputMaybe<ComponentListButtonsInput>>>
	Description?: InputMaybe<Scalars['JSON']['input']>
	Schools?: InputMaybe<Array<InputMaybe<ComponentListSchoolsInput>>>
	Title?: InputMaybe<Scalars['String']['input']>
	publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export enum Enum_Componentlistbuttons_Style {
	Dark = 'dark',
	Light = 'light',
}

export enum Enum_Componentsharedmetasocial_Socialnetwork {
	Facebook = 'Facebook',
	Twitter = 'Twitter',
}

export type FileInfoInput = {
	alternativeText?: InputMaybe<Scalars['String']['input']>
	caption?: InputMaybe<Scalars['String']['input']>
	name?: InputMaybe<Scalars['String']['input']>
}

export type FloatFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
	contains?: InputMaybe<Scalars['Float']['input']>
	containsi?: InputMaybe<Scalars['Float']['input']>
	endsWith?: InputMaybe<Scalars['Float']['input']>
	eq?: InputMaybe<Scalars['Float']['input']>
	eqi?: InputMaybe<Scalars['Float']['input']>
	gt?: InputMaybe<Scalars['Float']['input']>
	gte?: InputMaybe<Scalars['Float']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
	lt?: InputMaybe<Scalars['Float']['input']>
	lte?: InputMaybe<Scalars['Float']['input']>
	ne?: InputMaybe<Scalars['Float']['input']>
	nei?: InputMaybe<Scalars['Float']['input']>
	not?: InputMaybe<FloatFilterInput>
	notContains?: InputMaybe<Scalars['Float']['input']>
	notContainsi?: InputMaybe<Scalars['Float']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
	startsWith?: InputMaybe<Scalars['Float']['input']>
}

export type GenericMorph =
	| Campus
	| ComponentListButtons
	| ComponentListMaterialGroup
	| ComponentListMaterials
	| ComponentListSchoolLinks
	| ComponentListSchools
	| ComponentSharedMetaSocial
	| ComponentSharedSeo
	| Course
	| CourseCategory
	| Degree
	| I18NLocale
	| Page
	| UploadFile
	| UploadFolder
	| UsersPermissionsPermission
	| UsersPermissionsRole
	| UsersPermissionsUser

export type I18NLocale = {
	__typename?: 'I18NLocale'
	code?: Maybe<Scalars['String']['output']>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	name?: Maybe<Scalars['String']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type I18NLocaleEntity = {
	__typename?: 'I18NLocaleEntity'
	attributes?: Maybe<I18NLocale>
	id?: Maybe<Scalars['ID']['output']>
}

export type I18NLocaleEntityResponse = {
	__typename?: 'I18NLocaleEntityResponse'
	data?: Maybe<I18NLocaleEntity>
}

export type I18NLocaleEntityResponseCollection = {
	__typename?: 'I18NLocaleEntityResponseCollection'
	data: Array<I18NLocaleEntity>
	meta: ResponseCollectionMeta
}

export type I18NLocaleFiltersInput = {
	and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
	code?: InputMaybe<StringFilterInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	name?: InputMaybe<StringFilterInput>
	not?: InputMaybe<I18NLocaleFiltersInput>
	or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type IdFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	contains?: InputMaybe<Scalars['ID']['input']>
	containsi?: InputMaybe<Scalars['ID']['input']>
	endsWith?: InputMaybe<Scalars['ID']['input']>
	eq?: InputMaybe<Scalars['ID']['input']>
	eqi?: InputMaybe<Scalars['ID']['input']>
	gt?: InputMaybe<Scalars['ID']['input']>
	gte?: InputMaybe<Scalars['ID']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	lt?: InputMaybe<Scalars['ID']['input']>
	lte?: InputMaybe<Scalars['ID']['input']>
	ne?: InputMaybe<Scalars['ID']['input']>
	nei?: InputMaybe<Scalars['ID']['input']>
	not?: InputMaybe<IdFilterInput>
	notContains?: InputMaybe<Scalars['ID']['input']>
	notContainsi?: InputMaybe<Scalars['ID']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	startsWith?: InputMaybe<Scalars['ID']['input']>
}

export type IntFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
	contains?: InputMaybe<Scalars['Int']['input']>
	containsi?: InputMaybe<Scalars['Int']['input']>
	endsWith?: InputMaybe<Scalars['Int']['input']>
	eq?: InputMaybe<Scalars['Int']['input']>
	eqi?: InputMaybe<Scalars['Int']['input']>
	gt?: InputMaybe<Scalars['Int']['input']>
	gte?: InputMaybe<Scalars['Int']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
	lt?: InputMaybe<Scalars['Int']['input']>
	lte?: InputMaybe<Scalars['Int']['input']>
	ne?: InputMaybe<Scalars['Int']['input']>
	nei?: InputMaybe<Scalars['Int']['input']>
	not?: InputMaybe<IntFilterInput>
	notContains?: InputMaybe<Scalars['Int']['input']>
	notContainsi?: InputMaybe<Scalars['Int']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
	startsWith?: InputMaybe<Scalars['Int']['input']>
}

export type JsonFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
	contains?: InputMaybe<Scalars['JSON']['input']>
	containsi?: InputMaybe<Scalars['JSON']['input']>
	endsWith?: InputMaybe<Scalars['JSON']['input']>
	eq?: InputMaybe<Scalars['JSON']['input']>
	eqi?: InputMaybe<Scalars['JSON']['input']>
	gt?: InputMaybe<Scalars['JSON']['input']>
	gte?: InputMaybe<Scalars['JSON']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
	lt?: InputMaybe<Scalars['JSON']['input']>
	lte?: InputMaybe<Scalars['JSON']['input']>
	ne?: InputMaybe<Scalars['JSON']['input']>
	nei?: InputMaybe<Scalars['JSON']['input']>
	not?: InputMaybe<JsonFilterInput>
	notContains?: InputMaybe<Scalars['JSON']['input']>
	notContainsi?: InputMaybe<Scalars['JSON']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
	startsWith?: InputMaybe<Scalars['JSON']['input']>
}

export type LongFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
	contains?: InputMaybe<Scalars['Long']['input']>
	containsi?: InputMaybe<Scalars['Long']['input']>
	endsWith?: InputMaybe<Scalars['Long']['input']>
	eq?: InputMaybe<Scalars['Long']['input']>
	eqi?: InputMaybe<Scalars['Long']['input']>
	gt?: InputMaybe<Scalars['Long']['input']>
	gte?: InputMaybe<Scalars['Long']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
	lt?: InputMaybe<Scalars['Long']['input']>
	lte?: InputMaybe<Scalars['Long']['input']>
	ne?: InputMaybe<Scalars['Long']['input']>
	nei?: InputMaybe<Scalars['Long']['input']>
	not?: InputMaybe<LongFilterInput>
	notContains?: InputMaybe<Scalars['Long']['input']>
	notContainsi?: InputMaybe<Scalars['Long']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
	startsWith?: InputMaybe<Scalars['Long']['input']>
}

export type Mutation = {
	__typename?: 'Mutation'
	/** Change user password. Confirm with the current password. */
	changePassword?: Maybe<UsersPermissionsLoginPayload>
	createCampus?: Maybe<CampusEntityResponse>
	createCourse?: Maybe<CourseEntityResponse>
	createCourseCategory?: Maybe<CourseCategoryEntityResponse>
	createDegree?: Maybe<DegreeEntityResponse>
	createPage?: Maybe<PageEntityResponse>
	createUploadFile?: Maybe<UploadFileEntityResponse>
	createUploadFolder?: Maybe<UploadFolderEntityResponse>
	/** Create a new role */
	createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
	/** Create a new user */
	createUsersPermissionsUser: UsersPermissionsUserEntityResponse
	deleteCampus?: Maybe<CampusEntityResponse>
	deleteCourse?: Maybe<CourseEntityResponse>
	deleteCourseCategory?: Maybe<CourseCategoryEntityResponse>
	deleteDegree?: Maybe<DegreeEntityResponse>
	deletePage?: Maybe<PageEntityResponse>
	deleteUploadFile?: Maybe<UploadFileEntityResponse>
	deleteUploadFolder?: Maybe<UploadFolderEntityResponse>
	/** Delete an existing role */
	deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
	/** Delete an existing user */
	deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
	/** Confirm an email users email address */
	emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
	/** Request a reset password token */
	forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
	login: UsersPermissionsLoginPayload
	multipleUpload: Array<Maybe<UploadFileEntityResponse>>
	/** Register a user */
	register: UsersPermissionsLoginPayload
	removeFile?: Maybe<UploadFileEntityResponse>
	/** Reset user password. Confirm with a code (resetToken from forgotPassword) */
	resetPassword?: Maybe<UsersPermissionsLoginPayload>
	updateCampus?: Maybe<CampusEntityResponse>
	updateCourse?: Maybe<CourseEntityResponse>
	updateCourseCategory?: Maybe<CourseCategoryEntityResponse>
	updateDegree?: Maybe<DegreeEntityResponse>
	updateFileInfo: UploadFileEntityResponse
	updatePage?: Maybe<PageEntityResponse>
	updateUploadFile?: Maybe<UploadFileEntityResponse>
	updateUploadFolder?: Maybe<UploadFolderEntityResponse>
	/** Update an existing role */
	updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
	/** Update an existing user */
	updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
	upload: UploadFileEntityResponse
}

export type MutationChangePasswordArgs = {
	currentPassword: Scalars['String']['input']
	password: Scalars['String']['input']
	passwordConfirmation: Scalars['String']['input']
}

export type MutationCreateCampusArgs = {
	data: CampusInput
}

export type MutationCreateCourseArgs = {
	data: CourseInput
}

export type MutationCreateCourseCategoryArgs = {
	data: CourseCategoryInput
}

export type MutationCreateDegreeArgs = {
	data: DegreeInput
}

export type MutationCreatePageArgs = {
	data: PageInput
}

export type MutationCreateUploadFileArgs = {
	data: UploadFileInput
}

export type MutationCreateUploadFolderArgs = {
	data: UploadFolderInput
}

export type MutationCreateUsersPermissionsRoleArgs = {
	data: UsersPermissionsRoleInput
}

export type MutationCreateUsersPermissionsUserArgs = {
	data: UsersPermissionsUserInput
}

export type MutationDeleteCampusArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteCourseArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteCourseCategoryArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteDegreeArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeletePageArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteUploadFileArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteUploadFolderArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsRoleArgs = {
	id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsUserArgs = {
	id: Scalars['ID']['input']
}

export type MutationEmailConfirmationArgs = {
	confirmation: Scalars['String']['input']
}

export type MutationForgotPasswordArgs = {
	email: Scalars['String']['input']
}

export type MutationLoginArgs = {
	input: UsersPermissionsLoginInput
}

export type MutationMultipleUploadArgs = {
	field?: InputMaybe<Scalars['String']['input']>
	files: Array<InputMaybe<Scalars['Upload']['input']>>
	ref?: InputMaybe<Scalars['String']['input']>
	refId?: InputMaybe<Scalars['ID']['input']>
}

export type MutationRegisterArgs = {
	input: UsersPermissionsRegisterInput
}

export type MutationRemoveFileArgs = {
	id: Scalars['ID']['input']
}

export type MutationResetPasswordArgs = {
	code: Scalars['String']['input']
	password: Scalars['String']['input']
	passwordConfirmation: Scalars['String']['input']
}

export type MutationUpdateCampusArgs = {
	data: CampusInput
	id: Scalars['ID']['input']
}

export type MutationUpdateCourseArgs = {
	data: CourseInput
	id: Scalars['ID']['input']
}

export type MutationUpdateCourseCategoryArgs = {
	data: CourseCategoryInput
	id: Scalars['ID']['input']
}

export type MutationUpdateDegreeArgs = {
	data: DegreeInput
	id: Scalars['ID']['input']
}

export type MutationUpdateFileInfoArgs = {
	id: Scalars['ID']['input']
	info?: InputMaybe<FileInfoInput>
}

export type MutationUpdatePageArgs = {
	data: PageInput
	id: Scalars['ID']['input']
}

export type MutationUpdateUploadFileArgs = {
	data: UploadFileInput
	id: Scalars['ID']['input']
}

export type MutationUpdateUploadFolderArgs = {
	data: UploadFolderInput
	id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsRoleArgs = {
	data: UsersPermissionsRoleInput
	id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsUserArgs = {
	data: UsersPermissionsUserInput
	id: Scalars['ID']['input']
}

export type MutationUploadArgs = {
	field?: InputMaybe<Scalars['String']['input']>
	file: Scalars['Upload']['input']
	info?: InputMaybe<FileInfoInput>
	ref?: InputMaybe<Scalars['String']['input']>
	refId?: InputMaybe<Scalars['ID']['input']>
}

export type Page = {
	__typename?: 'Page'
	Image?: Maybe<UploadFileEntityResponse>
	SEO?: Maybe<ComponentSharedSeo>
	Title?: Maybe<Scalars['String']['output']>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	path?: Maybe<Scalars['String']['output']>
	publishedAt?: Maybe<Scalars['DateTime']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageEntity = {
	__typename?: 'PageEntity'
	attributes?: Maybe<Page>
	id?: Maybe<Scalars['ID']['output']>
}

export type PageEntityResponse = {
	__typename?: 'PageEntityResponse'
	data?: Maybe<PageEntity>
}

export type PageEntityResponseCollection = {
	__typename?: 'PageEntityResponseCollection'
	data: Array<PageEntity>
	meta: ResponseCollectionMeta
}

export type PageFiltersInput = {
	SEO?: InputMaybe<ComponentSharedSeoFiltersInput>
	Title?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<PageFiltersInput>
	or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
	path?: InputMaybe<StringFilterInput>
	publishedAt?: InputMaybe<DateTimeFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageInput = {
	Image?: InputMaybe<Scalars['ID']['input']>
	SEO?: InputMaybe<ComponentSharedSeoInput>
	Title?: InputMaybe<Scalars['String']['input']>
	path?: InputMaybe<Scalars['String']['input']>
	publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type Pagination = {
	__typename?: 'Pagination'
	page: Scalars['Int']['output']
	pageCount: Scalars['Int']['output']
	pageSize: Scalars['Int']['output']
	total: Scalars['Int']['output']
}

export type PaginationArg = {
	limit?: InputMaybe<Scalars['Int']['input']>
	page?: InputMaybe<Scalars['Int']['input']>
	pageSize?: InputMaybe<Scalars['Int']['input']>
	start?: InputMaybe<Scalars['Int']['input']>
}

export enum PublicationState {
	Live = 'LIVE',
	Preview = 'PREVIEW',
}

export type Query = {
	__typename?: 'Query'
	campus?: Maybe<CampusEntityResponse>
	campuses?: Maybe<CampusEntityResponseCollection>
	course?: Maybe<CourseEntityResponse>
	courseCategories?: Maybe<CourseCategoryEntityResponseCollection>
	courseCategory?: Maybe<CourseCategoryEntityResponse>
	courses?: Maybe<CourseEntityResponseCollection>
	degree?: Maybe<DegreeEntityResponse>
	degrees?: Maybe<DegreeEntityResponseCollection>
	i18NLocale?: Maybe<I18NLocaleEntityResponse>
	i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>
	me?: Maybe<UsersPermissionsMe>
	page?: Maybe<PageEntityResponse>
	pages?: Maybe<PageEntityResponseCollection>
	uploadFile?: Maybe<UploadFileEntityResponse>
	uploadFiles?: Maybe<UploadFileEntityResponseCollection>
	uploadFolder?: Maybe<UploadFolderEntityResponse>
	uploadFolders?: Maybe<UploadFolderEntityResponseCollection>
	usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>
	usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>
	usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>
	usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>
}

export type QueryCampusArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryCampusesArgs = {
	filters?: InputMaybe<CampusFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryCourseArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryCourseCategoriesArgs = {
	filters?: InputMaybe<CourseCategoryFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryCourseCategoryArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryCoursesArgs = {
	filters?: InputMaybe<CourseFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryDegreeArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryDegreesArgs = {
	filters?: InputMaybe<DegreeFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryI18NLocaleArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryI18NLocalesArgs = {
	filters?: InputMaybe<I18NLocaleFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryPageArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryPagesArgs = {
	filters?: InputMaybe<PageFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	publicationState?: InputMaybe<PublicationState>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUploadFileArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUploadFilesArgs = {
	filters?: InputMaybe<UploadFileFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUploadFolderArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUploadFoldersArgs = {
	filters?: InputMaybe<UploadFolderFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUsersPermissionsRoleArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUsersPermissionsRolesArgs = {
	filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUsersPermissionsUserArgs = {
	id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUsersPermissionsUsersArgs = {
	filters?: InputMaybe<UsersPermissionsUserFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ResponseCollectionMeta = {
	__typename?: 'ResponseCollectionMeta'
	pagination: Pagination
}

export type StringFilterInput = {
	and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
	between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
	contains?: InputMaybe<Scalars['String']['input']>
	containsi?: InputMaybe<Scalars['String']['input']>
	endsWith?: InputMaybe<Scalars['String']['input']>
	eq?: InputMaybe<Scalars['String']['input']>
	eqi?: InputMaybe<Scalars['String']['input']>
	gt?: InputMaybe<Scalars['String']['input']>
	gte?: InputMaybe<Scalars['String']['input']>
	in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
	lt?: InputMaybe<Scalars['String']['input']>
	lte?: InputMaybe<Scalars['String']['input']>
	ne?: InputMaybe<Scalars['String']['input']>
	nei?: InputMaybe<Scalars['String']['input']>
	not?: InputMaybe<StringFilterInput>
	notContains?: InputMaybe<Scalars['String']['input']>
	notContainsi?: InputMaybe<Scalars['String']['input']>
	notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
	notNull?: InputMaybe<Scalars['Boolean']['input']>
	null?: InputMaybe<Scalars['Boolean']['input']>
	or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
	startsWith?: InputMaybe<Scalars['String']['input']>
}

export type UploadFile = {
	__typename?: 'UploadFile'
	alternativeText?: Maybe<Scalars['String']['output']>
	caption?: Maybe<Scalars['String']['output']>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	ext?: Maybe<Scalars['String']['output']>
	formats?: Maybe<Scalars['JSON']['output']>
	hash: Scalars['String']['output']
	height?: Maybe<Scalars['Int']['output']>
	mime: Scalars['String']['output']
	name: Scalars['String']['output']
	previewUrl?: Maybe<Scalars['String']['output']>
	provider: Scalars['String']['output']
	provider_metadata?: Maybe<Scalars['JSON']['output']>
	related?: Maybe<Array<Maybe<GenericMorph>>>
	size: Scalars['Float']['output']
	updatedAt?: Maybe<Scalars['DateTime']['output']>
	url: Scalars['String']['output']
	width?: Maybe<Scalars['Int']['output']>
}

export type UploadFileEntity = {
	__typename?: 'UploadFileEntity'
	attributes?: Maybe<UploadFile>
	id?: Maybe<Scalars['ID']['output']>
}

export type UploadFileEntityResponse = {
	__typename?: 'UploadFileEntityResponse'
	data?: Maybe<UploadFileEntity>
}

export type UploadFileEntityResponseCollection = {
	__typename?: 'UploadFileEntityResponseCollection'
	data: Array<UploadFileEntity>
	meta: ResponseCollectionMeta
}

export type UploadFileFiltersInput = {
	alternativeText?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
	caption?: InputMaybe<StringFilterInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	ext?: InputMaybe<StringFilterInput>
	folder?: InputMaybe<UploadFolderFiltersInput>
	folderPath?: InputMaybe<StringFilterInput>
	formats?: InputMaybe<JsonFilterInput>
	hash?: InputMaybe<StringFilterInput>
	height?: InputMaybe<IntFilterInput>
	id?: InputMaybe<IdFilterInput>
	mime?: InputMaybe<StringFilterInput>
	name?: InputMaybe<StringFilterInput>
	not?: InputMaybe<UploadFileFiltersInput>
	or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
	previewUrl?: InputMaybe<StringFilterInput>
	provider?: InputMaybe<StringFilterInput>
	provider_metadata?: InputMaybe<JsonFilterInput>
	size?: InputMaybe<FloatFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
	url?: InputMaybe<StringFilterInput>
	width?: InputMaybe<IntFilterInput>
}

export type UploadFileInput = {
	alternativeText?: InputMaybe<Scalars['String']['input']>
	caption?: InputMaybe<Scalars['String']['input']>
	ext?: InputMaybe<Scalars['String']['input']>
	folder?: InputMaybe<Scalars['ID']['input']>
	folderPath?: InputMaybe<Scalars['String']['input']>
	formats?: InputMaybe<Scalars['JSON']['input']>
	hash?: InputMaybe<Scalars['String']['input']>
	height?: InputMaybe<Scalars['Int']['input']>
	mime?: InputMaybe<Scalars['String']['input']>
	name?: InputMaybe<Scalars['String']['input']>
	previewUrl?: InputMaybe<Scalars['String']['input']>
	provider?: InputMaybe<Scalars['String']['input']>
	provider_metadata?: InputMaybe<Scalars['JSON']['input']>
	size?: InputMaybe<Scalars['Float']['input']>
	url?: InputMaybe<Scalars['String']['input']>
	width?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFileRelationResponseCollection = {
	__typename?: 'UploadFileRelationResponseCollection'
	data: Array<UploadFileEntity>
}

export type UploadFolder = {
	__typename?: 'UploadFolder'
	children?: Maybe<UploadFolderRelationResponseCollection>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	files?: Maybe<UploadFileRelationResponseCollection>
	name: Scalars['String']['output']
	parent?: Maybe<UploadFolderEntityResponse>
	path: Scalars['String']['output']
	pathId: Scalars['Int']['output']
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UploadFolderChildrenArgs = {
	filters?: InputMaybe<UploadFolderFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UploadFolderFilesArgs = {
	filters?: InputMaybe<UploadFileFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UploadFolderEntity = {
	__typename?: 'UploadFolderEntity'
	attributes?: Maybe<UploadFolder>
	id?: Maybe<Scalars['ID']['output']>
}

export type UploadFolderEntityResponse = {
	__typename?: 'UploadFolderEntityResponse'
	data?: Maybe<UploadFolderEntity>
}

export type UploadFolderEntityResponseCollection = {
	__typename?: 'UploadFolderEntityResponseCollection'
	data: Array<UploadFolderEntity>
	meta: ResponseCollectionMeta
}

export type UploadFolderFiltersInput = {
	and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
	children?: InputMaybe<UploadFolderFiltersInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	files?: InputMaybe<UploadFileFiltersInput>
	id?: InputMaybe<IdFilterInput>
	name?: InputMaybe<StringFilterInput>
	not?: InputMaybe<UploadFolderFiltersInput>
	or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
	parent?: InputMaybe<UploadFolderFiltersInput>
	path?: InputMaybe<StringFilterInput>
	pathId?: InputMaybe<IntFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UploadFolderInput = {
	children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	name?: InputMaybe<Scalars['String']['input']>
	parent?: InputMaybe<Scalars['ID']['input']>
	path?: InputMaybe<Scalars['String']['input']>
	pathId?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFolderRelationResponseCollection = {
	__typename?: 'UploadFolderRelationResponseCollection'
	data: Array<UploadFolderEntity>
}

export type UsersPermissionsCreateRolePayload = {
	__typename?: 'UsersPermissionsCreateRolePayload'
	ok: Scalars['Boolean']['output']
}

export type UsersPermissionsDeleteRolePayload = {
	__typename?: 'UsersPermissionsDeleteRolePayload'
	ok: Scalars['Boolean']['output']
}

export type UsersPermissionsLoginInput = {
	identifier: Scalars['String']['input']
	password: Scalars['String']['input']
	provider?: Scalars['String']['input']
}

export type UsersPermissionsLoginPayload = {
	__typename?: 'UsersPermissionsLoginPayload'
	jwt?: Maybe<Scalars['String']['output']>
	user: UsersPermissionsMe
}

export type UsersPermissionsMe = {
	__typename?: 'UsersPermissionsMe'
	blocked?: Maybe<Scalars['Boolean']['output']>
	confirmed?: Maybe<Scalars['Boolean']['output']>
	email?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	role?: Maybe<UsersPermissionsMeRole>
	username: Scalars['String']['output']
}

export type UsersPermissionsMeRole = {
	__typename?: 'UsersPermissionsMeRole'
	description?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	name: Scalars['String']['output']
	type?: Maybe<Scalars['String']['output']>
}

export type UsersPermissionsPasswordPayload = {
	__typename?: 'UsersPermissionsPasswordPayload'
	ok: Scalars['Boolean']['output']
}

export type UsersPermissionsPermission = {
	__typename?: 'UsersPermissionsPermission'
	action: Scalars['String']['output']
	createdAt?: Maybe<Scalars['DateTime']['output']>
	role?: Maybe<UsersPermissionsRoleEntityResponse>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UsersPermissionsPermissionEntity = {
	__typename?: 'UsersPermissionsPermissionEntity'
	attributes?: Maybe<UsersPermissionsPermission>
	id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsPermissionFiltersInput = {
	action?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
	createdAt?: InputMaybe<DateTimeFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
	or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
	role?: InputMaybe<UsersPermissionsRoleFiltersInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UsersPermissionsPermissionRelationResponseCollection = {
	__typename?: 'UsersPermissionsPermissionRelationResponseCollection'
	data: Array<UsersPermissionsPermissionEntity>
}

export type UsersPermissionsRegisterInput = {
	email: Scalars['String']['input']
	password: Scalars['String']['input']
	username: Scalars['String']['input']
}

export type UsersPermissionsRole = {
	__typename?: 'UsersPermissionsRole'
	createdAt?: Maybe<Scalars['DateTime']['output']>
	description?: Maybe<Scalars['String']['output']>
	name: Scalars['String']['output']
	permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
	type?: Maybe<Scalars['String']['output']>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
	users?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

export type UsersPermissionsRolePermissionsArgs = {
	filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsersArgs = {
	filters?: InputMaybe<UsersPermissionsUserFiltersInput>
	pagination?: InputMaybe<PaginationArg>
	sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleEntity = {
	__typename?: 'UsersPermissionsRoleEntity'
	attributes?: Maybe<UsersPermissionsRole>
	id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsRoleEntityResponse = {
	__typename?: 'UsersPermissionsRoleEntityResponse'
	data?: Maybe<UsersPermissionsRoleEntity>
}

export type UsersPermissionsRoleEntityResponseCollection = {
	__typename?: 'UsersPermissionsRoleEntityResponseCollection'
	data: Array<UsersPermissionsRoleEntity>
	meta: ResponseCollectionMeta
}

export type UsersPermissionsRoleFiltersInput = {
	and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
	createdAt?: InputMaybe<DateTimeFilterInput>
	description?: InputMaybe<StringFilterInput>
	id?: InputMaybe<IdFilterInput>
	name?: InputMaybe<StringFilterInput>
	not?: InputMaybe<UsersPermissionsRoleFiltersInput>
	or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
	permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
	type?: InputMaybe<StringFilterInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
	users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

export type UsersPermissionsRoleInput = {
	description?: InputMaybe<Scalars['String']['input']>
	name?: InputMaybe<Scalars['String']['input']>
	permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
	type?: InputMaybe<Scalars['String']['input']>
	users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type UsersPermissionsUpdateRolePayload = {
	__typename?: 'UsersPermissionsUpdateRolePayload'
	ok: Scalars['Boolean']['output']
}

export type UsersPermissionsUser = {
	__typename?: 'UsersPermissionsUser'
	TestInfo?: Maybe<Scalars['String']['output']>
	blocked?: Maybe<Scalars['Boolean']['output']>
	confirmed?: Maybe<Scalars['Boolean']['output']>
	createdAt?: Maybe<Scalars['DateTime']['output']>
	email: Scalars['String']['output']
	provider?: Maybe<Scalars['String']['output']>
	role?: Maybe<UsersPermissionsRoleEntityResponse>
	updatedAt?: Maybe<Scalars['DateTime']['output']>
	username: Scalars['String']['output']
}

export type UsersPermissionsUserEntity = {
	__typename?: 'UsersPermissionsUserEntity'
	attributes?: Maybe<UsersPermissionsUser>
	id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsUserEntityResponse = {
	__typename?: 'UsersPermissionsUserEntityResponse'
	data?: Maybe<UsersPermissionsUserEntity>
}

export type UsersPermissionsUserEntityResponseCollection = {
	__typename?: 'UsersPermissionsUserEntityResponseCollection'
	data: Array<UsersPermissionsUserEntity>
	meta: ResponseCollectionMeta
}

export type UsersPermissionsUserFiltersInput = {
	TestInfo?: InputMaybe<StringFilterInput>
	and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
	blocked?: InputMaybe<BooleanFilterInput>
	confirmationToken?: InputMaybe<StringFilterInput>
	confirmed?: InputMaybe<BooleanFilterInput>
	createdAt?: InputMaybe<DateTimeFilterInput>
	email?: InputMaybe<StringFilterInput>
	id?: InputMaybe<IdFilterInput>
	not?: InputMaybe<UsersPermissionsUserFiltersInput>
	or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
	password?: InputMaybe<StringFilterInput>
	provider?: InputMaybe<StringFilterInput>
	resetPasswordToken?: InputMaybe<StringFilterInput>
	role?: InputMaybe<UsersPermissionsRoleFiltersInput>
	updatedAt?: InputMaybe<DateTimeFilterInput>
	username?: InputMaybe<StringFilterInput>
}

export type UsersPermissionsUserInput = {
	TestInfo?: InputMaybe<Scalars['String']['input']>
	blocked?: InputMaybe<Scalars['Boolean']['input']>
	confirmationToken?: InputMaybe<Scalars['String']['input']>
	confirmed?: InputMaybe<Scalars['Boolean']['input']>
	email?: InputMaybe<Scalars['String']['input']>
	password?: InputMaybe<Scalars['String']['input']>
	provider?: InputMaybe<Scalars['String']['input']>
	resetPasswordToken?: InputMaybe<Scalars['String']['input']>
	role?: InputMaybe<Scalars['ID']['input']>
	username?: InputMaybe<Scalars['String']['input']>
}

export type UsersPermissionsUserRelationResponseCollection = {
	__typename?: 'UsersPermissionsUserRelationResponseCollection'
	data: Array<UsersPermissionsUserEntity>
}

export type GetCourseCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type GetCourseCategoriesQuery = {
	__typename?: 'Query'
	courseCategories?: {
		__typename?: 'CourseCategoryEntityResponseCollection'
		data: Array<{
			__typename?: 'CourseCategoryEntity'
			id?: string | null
			attributes?: {
				__typename?: 'CourseCategory'
				Name?: string | null
				courses?: {
					__typename?: 'CourseRelationResponseCollection'
					data: Array<{
						__typename?: 'CourseEntity'
						id?: string | null
						attributes?: { __typename?: 'Course'; CourseID?: number | null } | null
					}>
				} | null
			} | null
		}>
	} | null
}

export type GetDegreesQueryVariables = Exact<{ [key: string]: never }>

export type GetDegreesQuery = {
	__typename?: 'Query'
	degrees?: {
		__typename?: 'DegreeEntityResponseCollection'
		data: Array<{
			__typename?: 'DegreeEntity'
			id?: string | null
			attributes?: {
				__typename?: 'Degree'
				Title?: string | null
				Description?: any | null
				Buttons?: Array<{
					__typename?: 'ComponentListButtons'
					Label?: string | null
					Link?: string | null
					Style?: Enum_Componentlistbuttons_Style | null
				} | null> | null
				Schools?: Array<{
					__typename?: 'ComponentListSchools'
					SchoolList?: string | null
					SchoolLinks?: Array<{ __typename?: 'ComponentListSchoolLinks'; School?: string | null; Link?: string | null } | null> | null
				} | null> | null
			} | null
		}>
	} | null
}

export const GetCourseCategoriesDocument = gql`
	query getCourseCategories {
		courseCategories {
			data {
				id
				attributes {
					Name
					courses {
						data {
							id
							attributes {
								CourseID
							}
						}
					}
				}
			}
		}
	}
`

/**
 * __useGetCourseCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCourseCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCourseCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>(GetCourseCategoriesDocument, options)
}
export function useGetCourseCategoriesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>(GetCourseCategoriesDocument, options)
}
export function useGetCourseCategoriesSuspenseQuery(
	baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>(GetCourseCategoriesDocument, options)
}
export type GetCourseCategoriesQueryHookResult = ReturnType<typeof useGetCourseCategoriesQuery>
export type GetCourseCategoriesLazyQueryHookResult = ReturnType<typeof useGetCourseCategoriesLazyQuery>
export type GetCourseCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCourseCategoriesSuspenseQuery>
export type GetCourseCategoriesQueryResult = Apollo.QueryResult<GetCourseCategoriesQuery, GetCourseCategoriesQueryVariables>
export const GetDegreesDocument = gql`
	query getDegrees {
		degrees {
			data {
				id
				attributes {
					Title
					Description
					Buttons {
						Label
						Link
						Style
					}
					Schools {
						SchoolList
						SchoolLinks {
							School
							Link
						}
					}
				}
			}
		}
	}
`

/**
 * __useGetDegreesQuery__
 *
 * To run a query within a React component, call `useGetDegreesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDegreesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDegreesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDegreesQuery(baseOptions?: Apollo.QueryHookOptions<GetDegreesQuery, GetDegreesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetDegreesQuery, GetDegreesQueryVariables>(GetDegreesDocument, options)
}
export function useGetDegreesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDegreesQuery, GetDegreesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetDegreesQuery, GetDegreesQueryVariables>(GetDegreesDocument, options)
}
export function useGetDegreesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDegreesQuery, GetDegreesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetDegreesQuery, GetDegreesQueryVariables>(GetDegreesDocument, options)
}
export type GetDegreesQueryHookResult = ReturnType<typeof useGetDegreesQuery>
export type GetDegreesLazyQueryHookResult = ReturnType<typeof useGetDegreesLazyQuery>
export type GetDegreesSuspenseQueryHookResult = ReturnType<typeof useGetDegreesSuspenseQuery>
export type GetDegreesQueryResult = Apollo.QueryResult<GetDegreesQuery, GetDegreesQueryVariables>
