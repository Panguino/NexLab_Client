# API Integration Guide

## GraphQL Architecture

### Dual Endpoint Setup

// Data API - Weather/scientific data
const DATA_API = process.env.NEXT_PUBLIC_DATA_API_URL + '/graphql'

// Strapi CMS - Content management
const STRAPI_API = process.env.NEXT_PUBLIC_API_URL + '/graphql'

````

### Code Generation
```bash
npm run graphql-codegen

# Generate types for Strapi
npm run graphql-codegen:strapi
````

## Apollo Client Configuration

### Provider Setup

```typescript
// src/components/providers/ApolloStrapiProvider/ApolloStrapiProvider.tsx
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const strapiClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

const dataClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_DATA_API_URL + '/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

export const ApolloStrapiProvider = ({ children }) => (
  <ApolloProvider client={strapiClient}>
    {children}
  </ApolloProvider>
)
```

### Client Selection Pattern

````typescript
// Use appropriate client based on data source
const useWeatherData = () => {
  const { data, loading, error } = useQuery(GET_NEXRAD_DATA, {
    client: dataClient
  })

   return { data, loading, error }


  const useCMSContent = () => {
   // For CMS content - use Strapi client (default)
  const { data, loading, error } = useQuery(GET_PAGE_BLOCKS)

  return { data, loading, error }

  ``

  # Query Patterns

### Server-Side Data Fetching
```typescript
// In page components - fetch at build/request time
const Page = async () => {
  const faqs = await getFAQs()

  return <FAQs title={overview.Title} faqs={faqs} />
}

// API function pattern
  export const getFAQs = async (): Promise<FAQ[]> => {
  try {
    const { data } = await strapiClient.query({
      query: GET_FAQS,
      errorPolicy: 'all',
    })

    return data?.faqs?.data || []
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return []
      }
}
````

### Client-Side Data Fetching

```typescript
// In components - fetch on user interaction
const WeatherSelector = () => {
  const [selectedRegion, setSelectedRegion] = useState('')

    client: dataClient,
    errorPolicy: 'all',
  })

    const { data: products, loading: productsLoading } = useQuery(
    GET_WEATHER_PRODUCTS,
    {
      variables: { regionId: selectedRegion },
      client: dataClient,
        skip: !selectedRegion,
      errorPolicy: 'all',
    }
  )

  return (
    <div>
      <RegionSelect
        options={regions?.weatherRegions || []}
        value={selectedRegion}
          onChange={setSelectedRegion}
        loading={loading}
      />

      {selectedRegion && (
        <ProductSelect
          options={products?.weatherProducts || []}
          loading={productsLoading}
        />
            )}
    </div>
  )
}
```

## Weather Data API Patterns

### NEXRAD Data Queries

````typescript
// queries/nexradQueries.ts
import { gql } from '@apollo/client'

export const GET_NEXRAD_REGIONS = gql`
  query GetNexradRegions {
      id
      label
      rotate
      scale
      sites {
         id
          name
           coordinates
         }
       }



        rt const GET_NEXRAD_PRODUCTS = gql`
        ery GetNexradProducts($regionId: String!) {
       nexradProducts(regionId: $regionId) {
        id
       name
      description
      unit
      levels
     }
    }


      ort const GET_NEXRAD_FRAMES = gql`
      uery GetNexradFrames(
       $regionId: String!
      $productId: String!
     $siteId: String!
    $timeRange: TimeRangeInput
  ) {
    nexradFrames(
       regionId: $region
    Id




        productId
      : $productId




         siteId: $siteId
         timeRange: $timeRange
       ) {
         timestamp
          imageUrl
          validTime
          metadata {
           elevation
          volume
         tilt
      }
    }
  }
`

### Satellite Data Queries
```typescript
  / queries/satelliteQueries.ts
    port const GET_SATELLITE_REGIONS = gql`
      uery GetSatelliteRegions {
       satelliteRegions {
         id
         label
         satellite
          coverage
          sectors {
            id
           name
          coordinates
       }
    }
  }
`

    port const GET_SATELLITE_PRODUCTS = gql`
      uery GetSatelliteProducts($regionId: String!) {
       satelliteProducts(regionId: $regionId) {
         id
         name
         wavelength
        description
       derivedFrom
    }
  }
`
````

### Upper Air Data Queries

```typescript
// queries/upperAirQueries.ts
  xport const GET_UPPER_AIR_LEVELS = gql`
    query GetUpperAirLevels {
       upperAirLevels {
         pressure
         altitude
        description
     }
  }
`

  xport const GET_UPPER_AIR_
    ANALYSIS = gql`




    query GetUpperAir
      Analysis(




       $regionId: String!
       $productId: String!
       $level: Int!
       $validTime: String!
       {
      upperAirAnalysis(
       regionId: $regionId
      productId: $productId
      level: $level
      validTime: $validTime
    ) {
      timestamp
      imageUrl
      validTime
      forecastHour
    }
   }



          rapi CMS API Patterns

            ge Content Queries
              script
              ies/strapiQueries.ts
              const GET_PAGE_BLOCKS = gql`
                GetPageBlocks($pageId: String!) {
                  id: $pageId) {
                     {
                    tributes {
                   blocks {
                    __typename
                   ... on ComponentBlocksHero {
                    title
                    subtitle
                     backgroundImage {
                       data {
                        attributes {
                          url
                           alternativeText
                          }
                         }
                        }
                      }
                      ... on ComponentBlocksTextBlock {
                       content
                      alignment
                   }
                  ... on ComponentBlocksImageGallery {
                   images {
                    data {
                     attributes {
                      url
                     alternativeText
                    caption
                  }
                }
               }
              }
             }
            }
          }




        rt const GET_FAQS = gql`
      uery GetFAQs {
      faqs {
       data {
        id
        attributes {
          question
          answer
          order
        }
       }
      }




          avigation Queries
          pescript
          t const GET_NAVIGATION_ITEMS = gql`
            y GetNavigationItems {
              igationItems {
              ata {
                id
               attributes {
                label
               url
               order
                parent {
                   data {
                     id
                      attributes {
                        label
                      }
                   }
                }
               children {
                data {
                 id
                attributes {
                 label
                url
                order
              }
            }
          }
        }
    }
  }
`
```

## Data Fetching Utilities

## Weather Data Fetchers

``typescript
/ apollo/data/getNexradData.ts
port { dataClient } from '../clients'
port { GET_NEXRAD_FRAMES } from './queries/nexradQueries'

export interface NexradParams {
regionId: string
productId: string
siteId: string
timeRange?: {
start: string
end: string

    export const getNexradData = async (params: NexradParams) => {
    try {
     const { data } = await dataClient.query({
        query: GET_NEXRAD_FRAMES,
        variables: params,
       errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    })

    return data?.nexradFrames || []

} catch (error) {
console.error('Failed to fetch NEXRAD data:', error)
throw new Error('Weather data temporarily unavailable')

    // apollo/data/getSatelliteData.ts
    port const getSatelliteData = async (params: SatelliteParams) => {

try {
const { data } = await dataClient.query({
query: GET_SATELLITE_FRAMES,
variables: params,
errorPolicy: 'all',
})

    return data?.satelliteFrames || []
    console.error('Failed to fetch satellite data:', error)
    throw new Error('Satellite data temporarily unavailable')

}
}

```

  ## CMS Content Fetchers
    `typescript
      apollo/strapi/getPageBlocks.ts
      ort { strapiClient } from '../clients'
      ort { GET_PAGE_BLOCKS } from './queries/strapiQueries'

    export const getPageBlocks = async (pageId: string) => {
    try {
     const { data } = await strapiClient.query({
        query: GET_PAGE_BLOCKS,
        variables: { pageId },
       errorPolicy: 'all',
    })

    return data?.page?.data?.attributes?.blocks || []
  } catch (error) {
     console.error('Failed to fetch page blocks:', error)
      return []



    // apollo/strapi/getFAQs.ts
    port const getFAQs = async () => {
   try {
      const { data } = await strapiClient.query({
        query: GET_FAQS,
       errorPolicy: 'all',
    })

    return data?.faqs?.data || []
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return []  }
}
```

# Error Handling Patterns

    # GraphQL Error Handling
    `typescript
     Consistent error handling across queries

onst useWeatherQuery = (query: DocumentNode, variables: any) => {
const { data, loading, error } = useQuery(query, {
variables,
client: dataClient,
errorPolicy: 'all',
notifyOnNetworkStatusChange: true,
})

    // Transform GraphQL errors to user-friendly messages
      const errorMessage = useMemo(() => {
      if (!error) return null

          if (error.networkError) {
         return 'Network connection error. Please check your internet connection.'
        }

        if (error.graphQLErrors?.length > 0) {
           const firstError = error.graphQLErrors[0]

           switch (firstError.extensions?.code) {
           case 'WEATHER_DATA_UNAVAILABLE':
            return 'Weather data is temporarily unavailable. Please try again later.'
            case 'INVALID_REGION':
            return 'Selected region is not available. Please choose a different region.'
         default:
            return 'An error occurred while loading data. Please try again.'
       }
    }

    return 'An unexpected error occurred.'

}, [error])  
 return { data, loading, error: errorMessage }
}

````

  ## Retry Logic
  ```typescript
  / Automatic retry for failed weather data requests
    nst useWeatherDataWithRetry = (params: WeatherParams) => {
    const [retryCount, setRetryCount] = useState(0)
    const maxRetries = 3

      onst { data, loading, error } = useQuery(GET_WEATHER_DATA, {
        variables: lient: dataClient,
          rorPolicy: 'al',
        nE  if (retryCount < maxRetries &    setTimeout(() => {
             setRetryCount(prev => prev + 1)
          }, 1000 * Math.pow(2, retryCount)) // Exponential backoff
       }
      },
   })

    const retry = () => {
     setRetryCount(0)
      // Trigger refetch
   }

  return { data, loading, error, retry, canRetry: retryCount < maxRetries }
}
````

## Caching Strategies

### Apollo Cache Configuration

```typescript
// Optimized cache policies for different data types
  onst cacheConfig = new InMemoryCache({
    typePolicies: {
       WeatherFrame: {
        keyFields: ['timestamp', 'productId', 'regionId'],
      },
       WeatherRegion: {
        keyFields: ['id'],
      },
       FAQ: {
        keyFields: ['id'],
      },
       Page: {
        keyFields: ['id'],
     },
  },
})

// Cache-first for static data, network-only for real-time data
  onst useStaticWeatherData = () => {
    return useQuery(GET_WEATHER_REGIONS, {
      fetchPolicy: 'cache-first',
     client: dataClient,
  })
}

  onst useRealTimeWeatherData = () => {
    return useQuery(GET_CURRENT_WEATHER, {
      fetchPolicy: 'network-only',
      pollInterval: 300000, // Poll every 5 minutes
     client: dataClient,
  })
}
```

## Performance Optimization

### Query Optimization

```typescript
// Use fragments for reusable query parts
const WEATHER_FRAME_FRAGMENT = gql`
	fragment WeatherFrameFields on WeatherFrame {
		timestamp
		imageUrl
		validTime
		metadata {
			level
			elevation
		}
	}
`

const GET_WEATHER_ANIMATION = gql`
	${WEATHER_FRAME_FRAGMENT}
	query GetWeatherAnimation($params: WeatherParams!) {
		weatherFrames(params: $params) {
			...WeatherFrameFields
		}
	}
`

// Pagination for large datasets
const GET_WEATHER_HISTORY = gql`
   query GetWeatherHistory
    (
   
   
  
      $params: WeatherParams!
       $first: Int!
        $after: String
          
        weatherHistory(params: $params, first: $first, after: $after) {
          edges {
           node {
             ...WeatherFrameFields
            }
            cursor
         }
        pageInfo {
         hasNextPage
        endCursor
      }
    }
  }`
```

### Lazy Loading

```typescript
  // Lazy load weather data based on user selections
const WeatherAnimator = () => {
  const { selectedRegion, selectedProduct } = useWeatherStore()

  // Only fetch when both region and product are selected
  const { data, loading } = useQuery(GET_WEATHER_FRAMES, {
    variables: { regionId: selectedRegion, productId: selectedProduct },
      skip: !selectedRegion || !selectedProduct,
    client: dataClient,
  })

  return (
    <div>
      {loading && <AnimationSkeleton />}
      {data && <WeatherAnimation frames={data.weatherFrames} />}
    </div>
  )
}
```

#Related Documentation

-\*[Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md)\*\* - Data structures and organization

-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - How components consume API data
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Caching and optimization strategies
-   **[Authentication Patterns](./AUTHENTICATION_PATTERNS.md)** - Securing API endpoints

## AI Assistant Context

When working with APIs in this codebase:

1. **Dual GraphQL endpoints** - Weather data API and Strapi CMS
2. **Type generation** from GraphQL schemas using codegen
3. **Error handling** with user-friendly messages for weather data
4. **Caching strategies** optimized for different data types
5. **Server-side fetching** for static content, client-side for dynamic data
6. **Retry logic** for weather data reliability

7. **Performance optimization** through fragments and pagination

This API architecture provides reliable access to both weather data and CMS content while maintaining type safety and optimal performance.
