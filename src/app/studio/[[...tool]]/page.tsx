/**
 * src/app/studio/[[...tool]]/page.tsx
 * Embeds the full Sanity Studio as a Next.js page at the /studio route.
 * The client admin accesses this URL to create/edit job listings and review applications.
 *
 * NOTE: This page MUST be a Client Component (metadata export not needed here).
 * next-sanity's NextStudio handles all studio rendering including auth.
 */

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// Export dynamic to force server-side rendering on every request (required for Studio auth)
export const dynamic = 'force-dynamic';

/**
 * StudioPage — renders the embedded Sanity Studio admin panel.
 * Access at: http://localhost:3000/studio (dev) or https://yejzila.com/studio (prod)
 */
export default function StudioPage() {
    return <NextStudio config={config} />;
}
