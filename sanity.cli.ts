/**
 * sanity.cli.ts
 * Sanity CLI configuration — enables `npx sanity` commands to work from the project root.
 * Run `npx sanity@latest init --coupon javascriptmastery2022` to initialise your project.
 */

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        // Set these values after running `npx sanity init` and pasting the returned IDs
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    },
});
