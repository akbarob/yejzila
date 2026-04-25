/**
 * sanity.config.ts
 * Top-level Sanity Studio configuration.
 * Registers all schemas and configures the project/dataset from environment variables.
 * The studio is embedded at /studio in the Next.js app via the NextStudio component.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { deskStructure } from './sanity/deskStructure';

export default defineConfig({
    // Base path where Sanity Studio is served - must match the Next.js route
    basePath: '/studio',

    // Project credentials - set these in .env.local after running `npx sanity init`
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '00000000',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    // Register content schemas
    schema: {
        types: schemaTypes,
    },

    plugins: [
        // Structure tool with custom desk layout for easy application review
        structureTool({
            structure: deskStructure,
        }),
        // Note: @sanity/vision (GROQ query tester) is not included here because
        // it requires React 19 and this project runs React 18.
        // It can be added later when React is upgraded.
    ],
});

