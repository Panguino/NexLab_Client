# NexLab Client

> Next.js weather data visualization platform for meteorological analysis

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook
```

## 🏗️ Architecture

-   **Framework**: Next.js 14 with App Router & TypeScript
-   **Styling**: SCSS Modules with CSS Variables (Dark/Light themes)
-   **Authentication**: NextAuth.js with OAuth account linking
-   **Data**: Apollo GraphQL with dual endpoints (Data API + Strapi CMS)
-   **UI**: Component-driven development with Storybook
-   **Testing**: Chromatic for visual regression testing

## � Documentation

**→ [Complete Documentation](./docs/README.md)**

### Quick Links

-   [🚀 Getting Started](./docs/PROJECT_OVERVIEW.md)
-   [🧩 Component Patterns](./docs/COMPONENT_PATTERNS.md)
-   [🎨 Coding Standards](./docs/CODING_STANDARDS.md)
-   [🌦️ Weather Data Architecture](./docs/WEATHER_DATA_ARCHITECTURE.md)

## 🔧 Development

### Environment Setup

```bash
# Required environment variables
NEXT_PUBLIC_API_URL=your-strapi-url
NEXT_PUBLIC_DATA_API_URL=your-data-api-url
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
NEXTAUTH_SECRET=your-secret-key
VERCEL_URL=your-vercel-url
VERCEL_PROTOCOL=https
NEXT_PUBLIC_MEILISEARCH_HOST=your-meilisearch-host
NEXT_PUBLIC_MEILISEARCH_KEY=your-meilisearch-key

# Optional integrations
BLACKBAUD_APP_ID=your-blackbaud-app-id
BLACKBAUD_APP_SECRET=your-blackbaud-secret
NEXT_PUBLIC_DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-secret
DISCORD_BOT_TOKEN=your-discord-bot-token
DISCORD_GUILD_ID=your-discord-guild-id
DISCORD_STANDARD_ROLE_ID=your-standard-role-id
DISCORD_ADVANCED_ROLE_ID=your-advanced-role-id
DISCORD_PREMIUM_ROLE_ID=your-premium-role-id
DISCORD_SPONSOR_ROLE_ID=your-sponsor-role-id
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/NXL-[Monday-ID]-[description]

# Before PR
npm run lint
npm run graphql-codegen

# Create PR with Monday Item ID in description
```

## 🤖 AI-Friendly Codebase

This project includes comprehensive documentation designed for AI code assistants:

-   Detailed architecture patterns
-   Consistent coding standards
-   Weather data structures
-   Component organization
-   Authentication flows

See [Documentation](./docs/README.md) for complete AI context.

## 📄 License

[Your License Here]
