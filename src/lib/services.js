/**
 * src/lib/services.js
 * Procurement & Supply Capabilities shown in the services section.
 * The footer links to each group by its `slug`, so keep slugs stable.
 * Photos are free-licence Unsplash images saved in public/assets/services.
 */

export const serviceGroups = [
    {
        slug: 'technical-industrial-procurement',
        title: 'Technical & Industrial Procurement',
        items: [
            'Oilfield, Drilling & Marine Supplies',
            'Pipes, Valves, Flanges & Fittings',
            'Mechanical, Electrical & Instrumentation',
            'HSE, Fire & Safety Equipment',
            'Mining & Mineral Processing Supplies',
            'Industrial Chemicals & Environmental Supplies',
            'Environmental & Spill Response Supplies',
        ],
        images: [
            {
                src: '/assets/services/oilfield.jpg',
                alt: 'Wellhead valve assembly in front of a drilling rig',
                caption: 'Oilfield, Drilling & Marine Supplies',
            },
            {
                src: '/assets/services/pipes-valves.jpg',
                alt: 'Steel pipes, flanges, valves and fittings laid out on a workbench',
                caption: 'Pipes, Valves, Flanges & Fittings',
            },
            {
                src: '/assets/services/spill-control.jpg',
                alt: 'Absorbent pads, a containment boom and a spill kit beside the water',
                caption: 'Spill Control & Absorbent Solutions',
            },
        ],
    },
    {
        slug: 'corporate-general-procurement',
        title: 'Corporate & General Procurement',
        items: [
            'Office, Stationery & IT Supplies',
            'Furniture, Appliances & Electronics',
            'Corporate Uniforms & Workwear',
            'Printing, Branding & Promotional Items',
            'Building, Medical & General Supplies',
        ],
        images: [
            {
                src: '/assets/services/stationery.jpg',
                alt: 'Binders, notebooks, a calculator, stamps and pens',
                caption: 'Office, Stationery & IT Supplies',
            },
            {
                src: '/assets/services/furniture.jpg',
                alt: 'Executive desk, meeting table and office chairs',
                caption: 'Furniture, Appliances & Electronics',
            },
            {
                src: '/assets/services/printing.jpg',
                alt: 'Large-format printer producing a printed banner',
                caption: 'Printing, Branding & Promotional Items',
            },
        ],
    },
    {
        slug: 'facilities-operational-support',
        title: 'Facilities & Operational Support',
        items: [
            'Janitorial & Facility Management',
            'Industrial & Commercial Cleaning',
            'Catering & Hospitality Services',
            'Camp & Accommodation Support',
            'Logistics, Warehousing & Distribution',
            'Waste Management & Sanitation',
        ],
        images: [
            {
                src: '/assets/services/janitorial.jpg',
                alt: 'Cleaning team vacuuming and wiping down an office',
                caption: 'Janitorial & Facility Management',
            },
            {
                src: '/assets/services/catering-service.jpg',
                alt: 'Chef serving a buffet to workers in an industrial facility',
                caption: 'Catering & Hospitality Services',
            },
            {
                src: '/assets/services/logistics.jpg',
                alt: 'Trucks and forklifts loading pallets in a distribution warehouse',
                caption: 'Logistics, Warehousing & Distribution',
            },
        ],
    },
    {
        slug: 'events-corporate-services',
        title: 'Events & Corporate Services',
        items: [
            'Event Planning & Coordination',
            'Conference & Meeting Management',
            'Corporate Hospitality & Decoration',
            'Venue, Equipment & Logistics Management',
            'Corporate Travel & Accommodation Coordination',
        ],
        images: [
            {
                src: '/assets/services/event-hall.jpg',
                alt: 'Event hall set with a stage, screens and dressed round tables',
                caption: 'Event Planning & Coordination',
            },
            {
                src: '/assets/services/conference-room.jpg',
                alt: 'Conference room with an oval table and chairs',
                caption: 'Conference & Meeting Management',
            },
            {
                src: '/assets/services/travel.jpg',
                alt: 'Travellers walking through an airport terminal',
                caption: 'Corporate Travel & Accommodation Coordination',
            },
        ],
    },
    {
        slug: 'procurement-supply-chain-services',
        title: 'Procurement & Supply Chain Services',
        items: [
            'Strategic Sourcing & Supplier Management',
            'Vendor Registration & Coordination',
            'RFQ & Tender Support',
            'Procurement Expediting',
            'Materials & Inventory Management',
            'Local & International Sourcing',
            'Contract & Project Procurement Support',
        ],
        images: [
            {
                src: '/assets/services/container-port.jpg',
                alt: 'Cargo ships docked at a container port',
                caption: 'Local & International Sourcing',
            },
            {
                src: '/assets/services/warehouse-shelves.jpg',
                alt: 'Warehouse aisles lined with storage shelves',
                caption: 'Materials & Inventory Management',
            },
            {
                src: '/assets/services/forklift.jpg',
                alt: 'Forklift operator moving a boxed load',
                caption: 'Procurement Expediting',
            },
        ],
    },
];
