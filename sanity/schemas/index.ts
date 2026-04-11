/**
 * sanity/schemas/index.ts
 * Central export for all Sanity schemas.
 * Add new schemas here to register them with the Studio.
 */

import { blockContent } from './blockContent';
import { jobListing } from './jobListing';
import { jobApplication } from './jobApplication';

// All schemas exported as an array — consumed by sanity.config.ts
export const schemaTypes = [blockContent, jobListing, jobApplication];
