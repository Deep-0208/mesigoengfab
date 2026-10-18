/**
 * Machinery categories listed in Mesigo Eng Fab's IndiaMART and TradeIndia
 * catalogues. Descriptions use only the materials, types and applications
 * those listings state. `slug` doubles as the enquiry-form value and as the
 * future /machinery/[slug]/ route when product pages are added.
 */
export type Machinery = {
  slug: string;
  name: string;
  summary: string;
  /** `cutout`: catalogue render with its white background removed; shown whole (contain), never cropped. */
  image: { src: string; alt: string; width: number; height: number; cutout?: boolean };
  /** Published ranges from the company's own catalogue listing, only where they exist. */
  specs?: { label: string; value: string }[];
};

export const featuredMachinery: Machinery[] = [
  {
    slug: 'screw-conveyors',
    name: 'Screw Conveyors',
    summary:
      'Horizontal, inclined, U-trough, tubular and taper screw conveyors for powders, grains and bulk solids, built to the plant layout.',
    image: {
      src: '/images/machinery/ss-screw-conveyor.webp',
      alt: 'Stainless steel screw conveyor with its helical flight exposed in an open trough at the workshop',
      width: 720,
      height: 900,
    },
    specs: [
      { label: 'Construction', value: 'SS304 or mild steel' },
      { label: 'Screw diameter', value: '100 to 600 mm' },
      { label: 'Conveyor length', value: '3 to 30 m' },
      { label: 'Flight thickness', value: '1.6 to 8 mm' },
    ],
  },
  {
    slug: 'bucket-elevators',
    name: 'Bucket Elevators',
    summary:
      'Vertical and Z-type bucket elevators in mild steel for grain, pulses, seeds, fertiliser and powders, supplied with belt, buckets and geared drive.',
    image: {
      src: '/images/machinery/bucket-elevator-cutout.webp',
      alt: 'Mild steel vertical bucket elevator with top head section, access ladder and platform',
      width: 720,
      height: 900,
      cutout: true,
    },
  },
  {
    slug: 'ribbon-blenders',
    name: 'Ribbon Blenders',
    summary: 'Horizontal ribbon blenders in MS or SS with bottom discharge, used for feed and food powder mixing.',
    image: {
      src: '/images/machinery/ribbon-blender.webp',
      alt: 'Horizontal ribbon blender on a fabricated stand with belt-driven motor and gearbox',
      width: 720,
      height: 540,
    },
  },
  {
    slug: 'hoppers-and-airlocks',
    name: 'Storage Hoppers and Rotary Airlocks',
    summary: 'Stationary hopper bins fabricated to the required capacity, with bottom discharge and rotary airlock valves for metered feeding.',
    image: {
      src: '/images/machinery/storage-hopper-bin-cutout.webp',
      alt: 'Painted mild steel storage hopper bin with pyramid roof and bottom discharge',
      width: 720,
      height: 540,
      cutout: true,
    },
  },
  {
    slug: 'dust-collectors-and-blowers',
    name: 'Dust Collectors and Air Blowers',
    summary: 'Baghouse and cyclone dust collectors with centrifugal air blowers for cement, powder, wood and process dust extraction.',
    image: {
      src: '/images/machinery/centrifugal-air-blower.webp',
      alt: 'Blue single-inlet centrifugal air blower mounted on a steel base frame',
      width: 720,
      height: 540,
    },
  },
  {
    slug: 'hydraulic-baling-presses',
    name: 'Hydraulic Baling Presses',
    summary: 'Vertical, semi-automatic hydraulic presses for baling scrap metal, paper, plastic and textile waste.',
    image: {
      src: '/images/machinery/hydraulic-baling-press-cutout.webp',
      alt: 'Blue vertical hydraulic scrap baling press with top-mounted cylinder and front loading door',
      width: 720,
      height: 540,
      cutout: true,
    },
  },
];

/** Other fabricated equipment listed in the catalogue, shown as a compact list. */
export const otherEquipment = [
  'Inclined slat chain conveyors',
  'Gravity roller conveyors',
  'Belt conveyors',
  'Screw flights',
  'Storage tanks and air receivers',
  'Ash conditioners',
] as const;

export const enquiryOptions = [
  ...featuredMachinery.map(({ slug, name }) => ({ value: slug, label: name })),
  { value: 'other-conveyors', label: 'Chain, roller or belt conveyors' },
  { value: 'screw-flights-spares', label: 'Screw flights and spares' },
  { value: 'tanks-and-fabrication', label: 'Tanks or custom fabrication' },
] as const;

export type EnquiryOption = (typeof enquiryOptions)[number]['value'];
