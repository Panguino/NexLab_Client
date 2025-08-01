# Authentication Patterns & Security Implementation

## NextAuth.js Configuration

### Provider Setup

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { JWT } from 'next-auth/jwt'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],

	callbacks: {
		async signIn({ user, account, profile }) {
			// Allow sign-in for all verified email addresses
			if (account?.provider === 'google' || account?.provider === 'facebook') {
				return true
			}
			return false
		},

		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				token.accessToken = account.access_token
				token.provider = account.provider

				// Link account with Strapi backend
				try {
					const strapiUser = await linkAccountWithStrapi({
						email: user.email!,
						name: user.name!,
						provider: account.provider,
						providerId: account.providerAccountId,
					})

					token.strapiJwt = strapiUser.jwt
					token.strapiUser = strapiUser.user
				} catch (error) {
					console.error('Failed to link account with Strapi:', error)
				}
			}

			return token
		},

		async session({ session, token }) {
			// Send properties to the client
			session.accessToken = token.accessToken as string
			session.provider = token.provider as string
			session.strapiJwt = token.strapiJwt as string
			session.strapiUser = token.strapiUser as any

			return session
		},
	},

	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},

	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
```

### Account Linking with Strapi

```typescript
// src/lib/auth/strapiAuth.ts
interface LinkAccountParams {
	email: string
	name: string
	provider: string
	providerId: string
}

interface StrapiAuthResponse {
	jwt: string
	user: {
		id: number
		username: string
		email: string
		confirmed: boolean
		blocked: boolean
		createdAt: string
		updatedAt: string
	}
}

export const linkAccountWithStrapi = async ({ email, name, provider, providerId }: LinkAccountParams): Promise<StrapiAuthResponse> => {
	const strapiUrl = process.env.NEXT_PUBLIC_API_URL

	try {
		// Check if user exists with this email
		const existingUserResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${email}`, {
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
		})

		const existingUsers = await existingUserResponse.json()

		if (existingUsers.length > 0) {
			// User exists, link new provider
			const user = existingUsers[0]

			// Check if this provider is already linked
			const providerResponse = await fetch(
				`${strapiUrl}/api/oauth-providers?filters[user][id][$eq]=${user.id}&filters[provider][$eq]=${provider}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					},
				},
			)

			const existingProviders = await providerResponse.json()

			if (existingProviders.data.length === 0) {
				// Link new provider to existing user
				await fetch(`${strapiUrl}/api/oauth-providers`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					},
					body: JSON.stringify({
						data: {
							provider,
							providerId,
							user: user.id,
						},
					}),
				})
			}

			// Generate JWT for existing user
			const jwtResponse = await fetch(`${strapiUrl}/api/auth/local`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					identifier: email,
					password: `oauth_${providerId}`, // Temporary password for OAuth users
				}),
			})

			if (jwtResponse.ok) {
				return await jwtResponse.json()
			}
		}

		// Create new user
		const newUserResponse = await fetch(`${strapiUrl}/api/auth/local/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: email.split('@')[0] + '_' + Date.now(),
				email,
				password: `oauth_${providerId}`,
				confirmed: true,
			}),
		})

		if (!newUserResponse.ok) {
			throw new Error('Failed to create user in Strapi')
		}

		const newUser = await newUserResponse.json()

		// Link OAuth provider to new user
		await fetch(`${strapiUrl}/api/oauth-providers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			body: JSON.stringify({
				data: {
					provider,
					providerId,
					user: newUser.user.id,
				},
			}),
		})

		return newUser
	} catch (error) {
		console.error('Strapi authentication error:', error)
		throw error
	}
}
```

## Authentication Components

### Auth Provider Wrapper

```typescript
// src/components/providers/NextAuthProvider/NextAuthProvider.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface NextAuthProviderProps {
  children: ReactNode
  session?: any
}

export const NextAuthProvider: React.FC<NextAuthProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  )
}
```

### Authentication Buttons

```typescript
// src/components/elements/AuthButtons/AuthButtons.tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './AuthButtons.module.scss'

export const AuthButtons: React.FC = () => {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (provider: 'google' | 'facebook') => {
    setIsLoading(true)
    try {
      await signIn(provider, {
        callbackUrl: '/dashboard',
        redirect: true
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true
      })
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className={styles.authButtons}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  if (session) {
    return (
      <div className={styles.authButtons}>
        <div className={styles.userInfo}>
          <FontAwesomeIcon icon={faUser} />
          <span>{session.user?.name}</span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className={styles.signOutButton}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className={styles.authButtons}>
      <button
        onClick={() => handleSignIn('google')}
        disabled={isLoading}
        className={`${styles.authButton} ${styles.google}`}
      >
        <FontAwesomeIcon icon={faGoogle} />
        Sign in with Google
      </button>

      <button
        onClick={() => handleSignIn('facebook')}
        disabled={isLoading}
        className={`${styles.authButton} ${styles.facebook}`}
      >
        <FontAwesomeIcon icon={faFacebook} />
        Sign in with Facebook
      </button>
    </div>
  )
}
```

### Custom Sign-In Page

```typescript
// src/app/auth/signin/page.tsx
'use client'

import { getProviders, signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import styles from './SignIn.module.scss'

interface Provider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const error = searchParams.get('error')

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    fetchProviders()
  }, [])

  useEffect(() => {
    // Check if user is already signed in
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push(callbackUrl)
      }
    }

    checkSession()
  }, [router, callbackUrl])

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true)
    try {
      await signIn(providerId, { callbackUrl })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return faGoogle
      case 'facebook':
        return faFacebook
      default:
        return faGoogle
    }
  }

  const getProviderClass = (providerId: string) => {
    return `${styles.providerButton} ${styles[providerId]}`
  }

  if (!providers) {
    return (
      <div className={styles.signInPage}>
        <div className={styles.loading}>Loading sign-in options...</div>
      </div>
    )
  }

  return (
    <div className={styles.signInPage}>
      <div className={styles.signInCard}>
        <div className={styles.header}>
          <h1>Welcome to NexLab</h1>
          <p>Sign in to access personalized weather data and save your preferences</p>
        </div>

        {error && (
          <div className={styles.error}>
            <p>
              {error === 'OAuthSignin' && 'Error occurred during sign-in. Please try again.'}
              {error === 'OAuthCallback' && 'Error occurred during authentication. Please try again.'}
              {error === 'OAuthCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'EmailCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'Callback' && 'Error occurred during sign-in. Please try again.'}
              {error === 'OAuthAccountNotLinked' && 'Account already exists with different provider.'}
              {error === 'EmailSignin' && 'Check your email for sign-in link.'}
              {error === 'CredentialsSignin' && 'Invalid credentials. Please try again.'}
              {error === 'SessionRequired' && 'Please sign in to access this page.'}
              {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'EmailSignin', 'CredentialsSignin', 'SessionRequired'].includes(error) && 'An error occurred. Please try again.'}
            </p>
          </div>
        )}

        <div className={styles.providers}>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleSignIn(provider.id)}
              disabled={isLoading}
              className={getProviderClass(provider.id)}
            >
              <FontAwesomeIcon icon={getProviderIcon(provider.id)} />
              Sign in with {provider.name}
            </button>
          ))}
        </div>

        <div className={styles.features}>
          <h3>Why sign in?</h3>
          <ul>
            <li>Save your favorite weather locations</li>
            <li>Customize dashboard preferences</li>
            <li>Access premium weather data</li>
            <li>Sync settings across devices</li>
          </ul>
        </div>

        <div className={styles.privacy}>
          <p>
            By signing in, you agree to our{' '}
            <a href="/terms-of-use" target="_blank">Terms of Use</a>
            {' '}and{' '}
            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
```

## Protected Routes & Middleware

### Route Protection Middleware

```typescript
// src/middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl
		const token = req.nextauth.token

		// Protect dashboard routes
		if (pathname.startsWith('/dashboard')) {
			if (!token) {
				return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + encodeURIComponent(pathname), req.url))
			}
		}

		// Protect admin routes
		if (pathname.startsWith('/admin')) {
			if (!token || !token.strapiUser?.role?.type === 'admin') {
				return NextResponse.redirect(new URL('/unauthorized', req.url))
			}
		}

		// Protect premium weather data
		if (pathname.startsWith('/weather-data/premium')) {
			if (!token || !token.strapiUser?.subscription?.active) {
				return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + encodeURIComponent(pathname), req.url))
			}
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				const { pathname } = req.nextUrl

				// Allow public routes
				if (
					pathname.startsWith('/auth') ||
					pathname.startsWith('/api/auth') ||
					pathname === '/' ||
					pathname.startsWith('/weather-data') ||
					pathname.startsWith('/storm-chasing') ||
					pathname.startsWith('/campus-weather')
				) {
					return true
				}

				// Require authentication for protected routes
				return !!token
			},
		},
	},
)

export const config = {
	matcher: ['/dashboard/:path*', '/admin/:path*', '/weather-data/premium/:path*', '/profile/:path*'],
}
```

### Protected Page Component

```typescript
// src/components/layout/ProtectedRoute/ProtectedRoute.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { LoadingSpinner } from '@/components/elements/LoadingSpinner/LoadingSpinner'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireRole?: string
  fallbackUrl?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRole,
  fallbackUrl = '/auth/signin',
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (requireAuth && !session) {
      router.push(`${fallbackUrl}?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    if (requireRole && session?.strapiUser?.role?.type !== requireRole) {
      router.push('/unauthorized')
      return
    }
  }, [session, status, router, requireAuth, requireRole, fallbackUrl])

  if (status === 'loading') {
    return <LoadingSpinner message="Checking authentication..." />
  }

  if (requireAuth && !session) {
    return <LoadingSpinner message="Redirecting to sign in..." />
  }

  if (requireRole && session?.strapiUser?.role?.type !== requireRole) {
    return <LoadingSpinner message="Checking permissions..." />
  }

  return <>{children}</>
}
```

## Session Management

### Custom Session Hook

```typescript
// src/hooks/useAuthSession.ts
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

interface AuthUser {
	id: number
	email: string
	name: string
	role: {
		type: string
		name: string
	}
	subscription?: {
		active: boolean
		plan: string
		expiresAt: string
	}
	preferences?: {
		defaultRegion: string
		favoriteProducts: string[]
		theme: 'light' | 'dark'
	}
}

interface UseAuthSessionReturn {
	user: AuthUser | null
	isAuthenticated: boolean
	isLoading: boolean
	strapiJwt: string | null
	hasRole: (role: string) => boolean
	hasSubscription: () => boolean
	canAccessPremium: () => boolean
}

export const useAuthSession = (): UseAuthSessionReturn => {
	const { data: session, status } = useSession()

	const authData = useMemo(() => {
		const user = session?.strapiUser || null
		const strapiJwt = session?.strapiJwt || null
		const isAuthenticated = !!session && !!user
		const isLoading = status === 'loading'

		const hasRole = (role: string): boolean => {
			return user?.role?.type === role
		}

		const hasSubscription = (): boolean => {
			return user?.subscription?.active === true
		}

		const canAccessPremium = (): boolean => {
			return isAuthenticated && (hasRole('admin') || hasSubscription())
		}

		return {
			user,
			isAuthenticated,
			isLoading,
			strapiJwt,
			hasRole,
			hasSubscription,
			canAccessPremium,
		}
	}, [session, status])

	return authData
}
```

### Session Persistence

```typescript
// src/lib/auth/sessionStorage.ts
interface UserPreferences {
	defaultRegion: string
	favoriteProducts: string[]
	theme: 'light' | 'dark'
	dashboardLayout: string[]
}

export class SessionStorage {
	private static readonly PREFERENCES_KEY = 'nexlab_user_preferences'
	private static readonly SESSION_KEY = 'nexlab_session_data'

	static savePreferences(preferences: UserPreferences): void {
		try {
			localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences))
		} catch (error) {
			console.error('Failed to save preferences:', error)
		}
	}

	static getPreferences(): UserPreferences | null {
		try {
			const stored = localStorage.getItem(this.PREFERENCES_KEY)
			return stored ? JSON.parse(stored) : null
		} catch (error) {
			console.error('Failed to load preferences:', error)
			return null
		}
	}

	static clearPreferences(): void {
		try {
			localStorage.removeItem(this.PREFERENCES_KEY)
		} catch (error) {
			console.error('Failed to clear preferences:', error)
		}
	}

	static saveSessionData(data: any): void {
		try {
			sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(data))
		} catch (error) {
			console.error('Failed to save session data:', error)
		}
	}

	static getSessionData(): any | null {
		try {
			const stored = sessionStorage.getItem(this.SESSION_KEY)
			return stored ? JSON.parse(stored) : null
		} catch (error) {
			console.error('Failed to load session data:', error)
			return null
		}
	}

	static clearSessionData(): void {
		try {
			sessionStorage.removeItem(this.SESSION_KEY)
		} catch (error) {
			console.error('Failed to clear session data:', error)
		}
	}
}
```

## API Authentication

### Authenticated GraphQL Client

```typescript
// src/apollo/authenticatedClient.ts
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getSession } from 'next-auth/react'

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
})

const authLink = setContext(async (_, { headers }) => {
	const session = await getSession()
	const token = session?.strapiJwt

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`)
		})
	}

	if (networkError) {
		console.error(`Network error: ${networkError}`)

		// Handle authentication errors
		if ('statusCode' in networkError && networkError.statusCode === 401) {
			// Redirect to sign in
			window.location.href = '/auth/signin'
		}
	}
})

export const authenticatedClient = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
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
```

### Protected API Routes

```typescript
// src/app/api/user/preferences/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.strapiJwt) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Fetch user preferences from Strapi
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=preferences`, {
			headers: {
				Authorization: `Bearer ${session.strapiJwt}`,
			},
		})

		if (!response.ok) {
			throw new Error('Failed to fetch user preferences')
		}

		const userData = await response.json()

		return NextResponse.json({
			preferences: userData.preferences || {},
		})
	} catch (error) {
		console.error('API error:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function PUT(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.strapiJwt) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { preferences } = body

		// Update user preferences in Strapi
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.strapiUser.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.strapiJwt}`,
			},
			body: JSON.stringify({
				preferences,
			}),
		})

		if (!response.ok) {
			throw new Error('Failed to update user preferences')
		}

		const updatedUser = await response.json()

		return NextResponse.json({
			success: true,
			preferences: updatedUser.preferences,
		})
	} catch (error) {
		console.error('API error:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
```

## Security Best Practices

### Environment Variables

```bash
# .env.local
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Discord OAuth (optional)
NEXT_PUBLIC_DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-secret

# Strapi Backend
NEXT_PUBLIC_API_URL=https://strapi.nexlab.com
STRAPI_API_TOKEN=your-strapi-api-token

# Deployment
VERCEL_URL=your-vercel-url
VERCEL_PROTOCOL=https

# Security
ALLOWED_ORIGINS=https://nexlab.com,https://www.nexlab.com
```

### CSRF Protection

```typescript
// src/lib/security/csrf.ts
import { NextRequest } from 'next/server'

export const validateCSRF = (request: NextRequest): boolean => {
	const origin = request.headers.get('origin')
	const referer = request.headers.get('referer')
	const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

	// Check origin header
	if (origin && !allowedOrigins.includes(origin)) {
		return false
	}

	// Check referer header for state-changing requests
	if (request.method !== 'GET' && referer) {
		const refererOrigin = new URL(referer).origin
		if (!allowedOrigins.includes(refererOrigin)) {
			return false
		}
	}

	return true
}
```

### Rate Limiting

```typescript
// src/lib/security/rateLimit.ts
interface RateLimitConfig {
	windowMs: number
	maxRequests: number
}

class RateLimiter {
	private requests = new Map<string, number[]>()

	constructor(private config: RateLimitConfig) {}

	isAllowed(identifier: string): boolean {
		const now = Date.now()
		const windowStart = now - this.config.windowMs

		// Get existing requests for this identifier
		const userRequests = this.requests.get(identifier) || []

		// Filter out requests outside the window
		const recentRequests = userRequests.filter((time) => time > windowStart)

		// Check if under limit
		if (recentRequests.length >= this.config.maxRequests) {
			return false
		}

		// Add current request
		recentRequests.push(now)
		this.requests.set(identifier, recentRequests)

		return true
	}

	reset(identifier: string): void {
		this.requests.delete(identifier)
	}
}

export const authRateLimit = new RateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 5, // 5 attempts per window
})

export const apiRateLimit = new RateLimiter({
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 100, // 100 requests per minute
})
```

## Error Handling

### Authentication Error Component

```typescript
// src/components/elements/AuthError/AuthError.tsx
interface AuthErrorProps {
  error: string | null
  onRetry?: () => void
}

export const AuthError: React.FC<AuthErrorProps> = ({ error, onRetry }) => {
  if (!error) return null

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'OAuthSignin':
        return 'Error occurred during sign-in. Please try again.'
      case 'OAuthCallback':
        return 'Error occurred during authentication. Please try again.'
      case 'OAuthCreateAccount':
        return 'Could not create account. Please try again.'
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account. Please sign in with the original provider.'
      case 'SessionRequired':
        return 'Please sign in to access this page.'
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this resource.'
      default:
        return 'An authentication error occurred. Please try again.'
    }
  }

  return (
    <div className={styles.authError}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorContent}>
        <h3>Authentication Error</h3>
        <p>{getErrorMessage(error)}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
```

## Testing Authentication

### Auth Component Testing

```typescript
// src/components/elements/AuthButtons/AuthButtons.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { AuthButtons } from './AuthButtons'

// Mock NextAuth
jest.mock('next-auth/react')

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

describe('AuthButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows sign-in buttons when not authenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<AuthButtons />)

    expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    expect(screen.getByText('Sign in with Facebook')).toBeInTheDocument()
  })

  it('shows user info and sign-out when authenticated', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        strapiJwt: 'mock-jwt',
      },
      status: 'authenticated',
    })

    render(<AuthButtons />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Sign Out')).toBeInTheDocument()
  })

  it('calls signIn when Google button is clicked', async () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<AuthButtons />)

    fireEvent.click(screen.getByText('Sign in with Google'))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('google', {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    })
  })

  it('calls signOut when sign-out button is clicked', async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        strapiJwt: 'mock-jwt',
      },
      status: 'authenticated',
    })

    render(<AuthButtons />)

    fireEvent.click(screen.getByText('Sign Out'))

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({
        callbackUrl: '/',
        redirect: true,
      })
    })
  })
})
```

## Related Documentation

-   **[API Integration](./API_INTEGRATION.md)** - Authenticated GraphQL queries
-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - Auth component architecture
-   **[Coding Standards](./CODING_STANDARDS.md)** - Security coding practices
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Session optimization

## AI Assistant Context

When working with authentication in this codebase:

1. **NextAuth.js** handles OAuth with Google and Facebook providers
2. **Account linking** allows users to sign in with multiple providers using the same email
3. **Strapi integration** provides JWT tokens and user management
4. **Protected routes** use middleware and component-level protection
5. **Session management** includes persistence and custom hooks
6. **Security measures** include CSRF protection and rate limiting
7. **Error handling** provides user-friendly error messages
8. **Testing patterns** mock NextAuth for component testing

This authentication system provides secure, user-friendly OAuth authentication with seamless account linking and comprehensive session management for the weather data platform.
