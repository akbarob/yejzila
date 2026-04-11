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
            
            // ── Talent Pipeline ───────────────────────────────────────────
            S.listItem()
                .title('Talent Pipeline')
                .icon(() => '🚀')
                .child(
                    S.list()
                        .title('Talent Pipeline Management')
                        .items([
                            // Pipeline Categories (HR, Customer Service, etc.)
                            S.listItem()
                                .title('Pipeline Categories')
                                .icon(() => '🏷️')
                                .child(
                                    S.documentTypeList('pipelineCategory')
                                        .title('Management Categories')
                                ),
                            
                            S.divider(),

                            // Pipeline Applications specifically
                            S.listItem()
                                .title('Pipeline Submissions')
                                .icon(() => '📥')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('Pipeline Applications')
                                        .filter('_type == "jobApplication" && applicationType == "pipeline"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),
                        ])
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
                            
                            // Specific filter for standard job applications
                            S.listItem()
                                .title('Specific Job Apps')
                                .icon(() => '💼')
                                .child(
                                    S.documentTypeList('jobApplication')
                                        .title('Job Listings Applications')
                                        .filter('_type == "jobApplication" && applicationType == "job"')
                                        .defaultOrdering([{ field: 'appliedAt', direction: 'desc' }])
                                ),

                            S.divider(),

                            // Status-based filters (applies to all types)
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
