/**
 * sanity/deskStructure.ts
 * Custom Sanity Studio desk structure for the client dashboard.
 * Groups job applications under their parent job listing for easy review.
 * Provides status-based filtering of applications (new, reviewing, shortlisted, rejected).
 */

import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
    S.list()
        .title('Yejzila Careers')
        .items([
            // ── Job Listings ──────────────────────────────────────────────
            S.listItem()
                .title('Job Listings')
                .icon(() => '📋')
                .child(
                    S.documentTypeList('jobListing')
                        .title('All Job Listings')
                        .filter('_type == "jobListing"')
                        .defaultOrdering([{ field: 'postedAt', direction: 'desc' }])
                ),

            S.divider(),

            // ── Applications — overview and status-based views ─────────────
            S.listItem()
                .title('Job Applications')
                .icon(() => '📬')
                .child(
                    S.list()
                        .title('Applications')
                        .items([
                            // All applications
                            S.listItem()
                                .title('All Applications')
                                .icon(() => '📂')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('All Applications')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),

                            S.divider(),

                            // New — just submitted, not yet reviewed
                            S.listItem()
                                .title('🆕 New')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('New Applications')
                                        .filter('_type == "jobApplication" && status == "new"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),

                            // Reviewing
                            S.listItem()
                                .title('👀 Reviewing')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('Under Review')
                                        .filter('_type == "jobApplication" && status == "reviewing"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),

                            // Shortlisted
                            S.listItem()
                                .title('✅ Shortlisted')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('Shortlisted Candidates')
                                        .filter('_type == "jobApplication" && status == "shortlisted"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),

                            // Rejected
                            S.listItem()
                                .title('❌ Rejected')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('Rejected Applications')
                                        .filter('_type == "jobApplication" && status == "rejected"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),
                        ])
                ),
        ]);
