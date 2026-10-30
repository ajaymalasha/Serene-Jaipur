/**
 * Single source of truth for brand & contact details.
 * Fill in the phone/WhatsApp number and timings once confirmed —
 * every CTA on the site reads from here.
 */
export const SITE = {
  name: 'Serene',
  tagline: 'Fitness & Wellness Club',
  city: 'Jaipur',
  address: {
    line1: 'Near City Park, New Sanganer Road',
    line2: 'Mansarovar, Jaipur, Rajasthan 302020',
    mapsQuery: 'City Park, New Sanganer Road, Mansarovar, Jaipur',
  },
  /** E.164 without "+" e.g. "919876543210". Leave empty to hide phone CTAs. */
  whatsapp: '',
  phoneDisplay: '',
  email: '',
  instagram: 'https://www.instagram.com/serene.jaipur/',
  instagramHandle: '@serene.jaipur',
  hours: [
    { label: 'Monday – Saturday', value: '6:00 AM – 10:00 PM' },
    { label: 'Sunday', value: '7:00 AM – 2:00 PM' },
  ],
  openedOn: 'October 2026',
} as const

export const NAV = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Spaces', href: '#spaces' },
  { label: 'Movement', href: '#movement' },
  { label: 'Recovery', href: '#recovery' },
  { label: 'Technology', href: '#technology' },
  { label: 'Visit', href: '#visit' },
] as const

export const media = {
  video: (name: string) => `/media/video/${name}.mp4`,
  poster: (name: string) => `/media/video/${name}.webp`,
  img: (name: string) => `/media/img/${name}.webp`,
  tiny: (name: string) => `/media/img/${name}.tiny.webp`,
}

export type Space = {
  id: string
  index: string
  title: string
  kicker: string
  copy: string
  image: string
  video?: string
}

export const SPACES: Space[] = [
  {
    id: 'floor',
    index: '01',
    title: 'The Floor',
    kicker: 'Strength & Conditioning',
    copy: 'Racks, plates and free weights across a sunlit training floor — engineered by Technogym, arranged for flow.',
    image: 'functional-wall',
    video: 'hero',
  },
  {
    id: 'cardio',
    index: '02',
    title: 'Cardio Deck',
    kicker: 'Run · Ride · Climb',
    copy: 'Treadmills, bikes and climbers set beneath the arches, facing the light. Long runs feel shorter here.',
    image: 'gym-floor',
  },
  {
    id: 'pilates',
    index: '03',
    title: 'Pilates Studio',
    kicker: 'Reformer & Mat',
    copy: 'A quiet, dedicated studio for reformer work — precision, control and small-group attention.',
    image: 'pilates-studio',
    video: 'pilates',
  },
  {
    id: 'yoga',
    index: '04',
    title: 'Yoga & Movement',
    kicker: 'Flow · Mobility · Breath',
    copy: 'Warm wood, soft light and nothing to prove. Slow flows in the morning, deep stretch at dusk.',
    image: 'headstand',
    video: 'yoga',
  },
  {
    id: 'pool',
    index: '05',
    title: 'The Pool',
    kicker: 'Swim · Float · Reset',
    copy: 'Laps when you want work, stillness when you want nothing at all.',
    image: 'pool-float',
    video: 'pool',
  },
  {
    id: 'recovery',
    index: '06',
    title: 'Recovery Lounge',
    kicker: 'Red Light · Cold · Heat',
    copy: 'Red-light therapy, cold plunge and sauna — because the session isn’t over until you’ve recovered from it.',
    image: 'sauna-towel',
    video: 'redlight',
  },
  {
    id: 'cafe',
    index: '07',
    title: 'The Café',
    kicker: 'Nourish',
    copy: 'Matcha, protein, cold-pressed everything. Slow mornings and post-session conversations.',
    image: 'matcha',
  },
]

export type Program = {
  title: string
  meta: string
  image: string
}

export const PROGRAMS: Program[] = [
  { title: 'Strength Training', meta: 'Barbell · Dumbbell · Machines', image: 'strength-bench' },
  { title: 'Reformer Pilates', meta: 'Small group · Private', image: 'pilates-ball' },
  { title: 'Yoga & Mobility', meta: 'Vinyasa · Yin · Breath', image: 'expansion' },
  { title: 'Functional Conditioning', meta: 'Kettlebell · Sled · Wall balls', image: 'functional-wall' },
  { title: 'Indoor Cycling', meta: 'Rhythm · Power · Endurance', image: 'bike-room' },
  { title: 'Personal Training', meta: 'One on one · Programmed', image: 'overhead-press' },
]

export const RECOVERY = [
  {
    title: 'Red-Light Therapy',
    copy: 'Full-body beds that support collagen, circulation and faster recovery between sessions.',
    video: 'redlight',
  },
  {
    title: 'Cold Plunge',
    copy: 'A deliberate minute of cold. Lower inflammation, sharper mind, a reset you can feel.',
    video: 'icebath',
  },
  {
    title: 'Sauna & Steam',
    copy: 'Dry heat, eucalyptus steam and warm towels to close every ritual the right way.',
    image: 'sauna-towel',
  },
] as const

export const TECH = [
  {
    title: 'Technogym Floor',
    copy: 'Connected strength and cardio equipment that remembers your settings, your tempo and your last best set.',
  },
  {
    title: 'Body Composition',
    copy: 'Segmental muscle, hydration and fat analysis at the start of your journey — and at every milestone.',
  },
  {
    title: 'Guided Programmes',
    copy: 'Screens that coach the rep, not just count it. Programmes that adapt as you do.',
  },
] as const

export const GALLERY = [
  { image: 'reception', alt: 'Serene reception', span: 'tall' },
  { image: 'expansion', alt: 'Camel pose — expansion', span: 'short' },
  { image: 'signage', alt: 'Serene signage above the training floor', span: 'short' },
  { image: 'pool-towel', alt: 'Serene towel by the pool', span: 'tall' },
  { image: 'dumbbells-sage', alt: 'Dumbbells on sage', span: 'short' },
  { image: 'mat-roll', alt: 'Rolling a mat after class', span: 'tall' },
  { image: 'do-not-disturb', alt: 'Please do not disturb', span: 'short' },
  { image: 'facade', alt: 'Serene at dusk', span: 'tall' },
  { image: 'spa-robe', alt: 'Spa corridor', span: 'short' },
] as const

export const PILLARS = [
  {
    key: 'move',
    title: 'Move',
    copy: 'Strength, cardio and mobility that build a body for the long run.',
  },
  {
    key: 'restore',
    title: 'Restore',
    copy: 'Cold, heat and light — recovery given the same respect as training.',
  },
  {
    key: 'nourish',
    title: 'Nourish',
    copy: 'A café that fuels the work, and conversations that stretch it.',
  },
  {
    key: 'belong',
    title: 'Belong',
    copy: 'A considered community. Familiar faces, quiet encouragement.',
  },
] as const
