// Removed to keep Storybook fully decoupled from server-only imports.
// PageBlocks is an aggregate that imports server-wrapped blocks (e.g., StaffGrid, FaqsBlock).
// Rendering those should be tested via individual block View components with mock data.
// Intentionally no default export to prevent Storybook indexing; exporting a dummy default avoids errors.
export default {
	title: 'Page Blocks/PageBlocks (Removed)',
	parameters: { docs: { disable: true } },
}
