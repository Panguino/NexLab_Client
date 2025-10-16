# Feedback System Implementation

## Overview

This implementation adds a Google Form alternative to the existing Discord-focused feedback system while maintaining the emphasis on Discord as the primary method.

## Structure

### Main Feedback Page (`/feedback`)

**Components:**

1. **FeedbackHero** - Prominently features Discord with calls to action
2. **DiscordRequirements** - Detailed steps for using Discord (unchanged)
3. **WebFormAlternative** - NEW: Subtle section at the bottom offering the web form as an alternative

### Web Form Page (`/feedback/webform`)

**Components:**

1. **WebFormHero** - Simple hero section that still encourages Discord usage
2. **GoogleFormEmbed** - Contains placeholder for Google Form embed code

## Key Design Decisions

### Hierarchy & Messaging

-   **Primary Method**: Discord is presented first with rich visuals, detailed instructions, and prominent CTAs
-   **Alternative Method**: Web form is presented last in a more subtle design with neutral colors
-   The web form is positioned as "if you're not familiar with Discord" rather than as an equal option

### Component Structure

```
FeedbackPage/
├── FeedbackHero/              (existing - Discord focused)
├── DiscordRequirements/       (existing - Discord steps)
├── WebFormAlternative/        (NEW - subtle alternative offer)
├── WebFormHero/               (NEW - webform page hero)
├── GoogleFormEmbed/           (NEW - houses the form)
└── WebFormPage/               (NEW - webform page layout)
```

### Styling Consistency

All new components follow the existing patterns:

-   Use CSS custom properties from the design system
-   Dark/light mode support via `var(--color-*)` variables
-   Responsive breakpoints at 768px and 900px
-   Consistent padding, border-radius (12px), and spacing
-   Same transition patterns for theme changes

## Implementation Details

### WebFormAlternative Component

-   Located at the bottom of `/feedback` page
-   Uses muted colors (grey instead of blue) to de-emphasize
-   Compact single-row layout with form icon
-   Button links to `/feedback/webform`

### WebFormHero Component

-   Simpler than Discord hero (no image, smaller)
-   Grey gradient instead of blue to signal lower priority
-   Still includes a Discord CTA to encourage community use
-   Shorter copy focusing on form utility

### GoogleFormEmbed Component

-   Currently contains placeholder div
-   Ready for iframe embed code insertion
-   Styled to handle responsive iframe sizing
-   Max-width of 900px for optimal form display

## Next Steps

### Adding the Google Form Embed Code

1. Navigate to: `src/components/blocks/FeedbackPage/GoogleFormEmbed/GoogleFormEmbed.tsx`
2. Replace the placeholder `<div className={styles.placeholder}>` section with your Google Form iframe embed
3. Example structure:

```tsx
<div className={styles.embedWrapper}>
	<iframe src="YOUR_GOOGLE_FORM_URL" width="640" height="800" frameBorder="0" marginHeight={0} marginWidth={0}>
		Loading…
	</iframe>
</div>
```

### Optional Enhancements

-   Add metadata/SEO for the `/feedback/webform` page
-   Consider adding analytics tracking for form vs Discord usage
-   Add success/thank you messaging after form submission

## File Locations

### New Files Created

-   `src/components/blocks/FeedbackPage/WebFormAlternative/WebFormAlternative.tsx`
-   `src/components/blocks/FeedbackPage/WebFormAlternative/WebFormAlternative.module.scss`
-   `src/components/blocks/FeedbackPage/GoogleFormEmbed/GoogleFormEmbed.tsx`
-   `src/components/blocks/FeedbackPage/GoogleFormEmbed/GoogleFormEmbed.module.scss`
-   `src/components/blocks/FeedbackPage/WebFormHero/WebFormHero.tsx`
-   `src/components/blocks/FeedbackPage/WebFormHero/WebFormHero.module.scss`
-   `src/components/blocks/FeedbackPage/WebFormPage/WebFormPage.tsx`
-   `src/components/blocks/FeedbackPage/WebFormPage/WebFormPage.module.scss`
-   `src/app/feedback/webform/page.tsx`

### Modified Files

-   `src/components/blocks/FeedbackPage/FeedbackPage.tsx` (added WebFormAlternative import and component)

## Design Philosophy

The implementation follows a "strong suggestion, light alternative" approach:

-   Discord gets premium real estate, rich visuals, and enthusiastic copy
-   Web form gets functional presentation with neutral design
-   User flow naturally guides to Discord but respects user comfort levels
