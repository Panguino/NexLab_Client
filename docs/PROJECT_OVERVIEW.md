# NexLab Client - Project Overview

## Architecture & Tech Stack

### Frontend Framework

-   **Next.js 14** with App Router
-   **TypeScript** for type safety
-   **SCSS Modules** for styling with CSS variables
-   **Storybook** for component development

### Authentication

-   **NextAuth.js** with OAuth providers (Google, Facebook)
-   **Account linking** - users can sign in with multiple providers using same email
-   **JWT tokens** from Strapi backend for session management
-   See [Authentication Patterns](./AUTHENTICATION_PATTERNS.md) for implementation details

### Data & APIs

-   **Apollo Client** for GraphQL data fetching
-   **Strapi CMS** backend for content management
-   **GraphQL Codegen** for type-safe API calls
-   Dual GraphQL endpoints: Data API + Strapi CMS
-   See [API Integration](./API_INTEGRATION.md) for setup and patterns

### UI/UX Patterns

-   **Component-driven development** with Storybook
-   **CSS Variables** for theming (light/dark mode support)
-   **Responsive design** with mobile-first approach
-   **FontAwesome** icons throughout
-   See [Component Patterns](./COMPONENT_PATTERNS.md) for architecture details

### Development Workflow

-   **GTS (Google TypeScript Style)** for linting/formatting
-   **Chromatic** for visual regression testing
-   **GitHub Actions** for CI/CD
-   **Monday.com** integration for project management
-   See [Coding Standards](./CODING_STANDARDS.md) for conventions

## Key Features

### Weather Data Platform

-   **Multi-source weather data** visualization and analysis
-   **NEXRAD radar** animations and analysis tools
-   **Satellite imagery** with multiple product types
-   **Upper air analysis** for atmospheric conditions
-   **Surface analysis** for ground-level weather
-   See [Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md) for data structures

### User Experience

-   **Responsive dashboard** interface
-   **Interactive weather maps** with animation controls
-   **Regional and sector-based** data organization
-   **Real-time data updates** and caching
-   **Dark/light theme** support

### Performance Features

-   **Server-side rendering** for fast initial loads
-   **Dynamic imports** for code splitting
-   **Image optimization** for weather imagery
-   **Efficient caching** strategies
-   See [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md) for details

## Project Structure

```
nexlab_client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── blocks/            # Page-level components
│   │   ├── elements/          # Reusable UI elements
│   │   ├── layout/            # Layout components
│   │   └── providers/         # Context providers
│   ├── data/                  # Weather data definitions
│   │   ├── nexrad/           # Radar data structures
│   │   ├── satrad/           # Satellite data structures
│   │   ├── upperair/         # Upper air analysis
│   │   └── surface/          # Surface analysis
│   ├── apollo/               # GraphQL queries & mutations
│   │   ├── data/            # Weather data API
│   │   └── strapi/          # CMS API
│   ├── gql/                 # Generated GraphQL types
│   ├── stores/              # Zustand state management
│   └── styles/              # Global SCSS and variables
├── docs/                    # Comprehensive documentation
├── .storybook/             # Storybook configuration
└── public/                 # Static assets
```

## Development Environment

### Required Tools

-   **Node.js 18+** (specified in package.json)
-   **npm** for package management
-   **Git** for version control

### Environment Variables

```bash
# Core APIs
NEXT_PUBLIC_API_URL=          # Strapi CMS
NEXT_PUBLIC_DATA_API_URL=     # Weather Data API

# Authentication
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
NEXTAUTH_SECRET=

# Search
NEXT_PUBLIC_MEILISEARCH_HOST=
NEXT_PUBLIC_MEILISEARCH_KEY=

# Deployment
VERCEL_URL=
VERCEL_PROTOCOL=

# Optional Integrations
BLACKBAUD_APP_ID=             # Donation platform
BLACKBAUD_APP_SECRET=
NEXT_PUBLIC_DISCORD_CLIENT_ID= # Community integration
DISCORD_CLIENT_SECRET=
DISCORD_BOT_TOKEN=
DISCORD_GUILD_ID=
DISCORD_STANDARD_ROLE_ID=
DISCORD_ADVANCED_ROLE_ID=
DISCORD_PREMIUM_ROLE_ID=
DISCORD_SPONSOR_ROLE_ID=

# Development
CHROMATIC_PROJECT_TOKEN=      # Visual testing
```

### Getting Started

1. **Clone repository** and install dependencies
2. **Set up environment** variables
3. **Start development server** with `npm run dev`
4. **Run Storybook** with `npm run storybook`
5. **Follow Git workflow** for feature development

## Related Documentation

-   **[Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md)** - Understanding weather data structures
-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - React component organization
-   **[Coding Standards](./CODING_STANDARDS.md)** - Development conventions
-   **[API Integration](./API_INTEGRATION.md)** - GraphQL setup and usage
-   **[Authentication Patterns](./AUTHENTICATION_PATTERNS.md)** - OAuth implementation
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Speed and efficiency

## AI Assistant Context

This project uses weather data visualization as its core domain. When working with AI tools:

-   **Weather data** follows specific regional/sector/product hierarchies
-   **Component architecture** emphasizes reusability and performance
-   **State management** uses Zustand for weather data selections
-   **Authentication** involves complex OAuth account linking
-   **Performance** is critical for large weather datasets and animations

The documentation is designed to give AI tools comprehensive context about these domain-specific patterns and architectural decisions.
