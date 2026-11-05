import type { DateIdea, Place, CoupleStory, BucketListItem } from '../types';

export const DATE_IDEAS: DateIdea[] = [
  {
    id: 'stargazing-cliff',
    title: 'Cliffside Stargazing with Hot Cider',
    category: 'Starlit',
    description: 'Drive to a high coastal bluff at dusk. Wrap yourselves in a heavy wool blanket, listen to ambient vinyl, and track constellations as the horizon deepens.',
    duration: '3 hours',
    vibe: 'Atmospheric & Deep',
    rating: 4.9,
    featured: true,
    image: '/download (57).jpg'
  },
  {
    id: 'candlelit-listening',
    title: 'Midnight Vinyl & Low Light Listening',
    category: 'Intimate',
    description: 'Dim every overhead light. Light three amber beeswax candles. Take turns playing three records that shaped your souls before you met.',
    duration: '2 hours',
    vibe: 'Slow & Nostalgic',
    rating: 4.9,
    featured: true,
    image: '/1101552390136306348.jpg'
  },
  {
    id: 'secret-rooftop-picnic',
    title: 'Blue Hour Rooftop Supper',
    category: 'Culinary',
    description: 'A wooden board with fig jam, aged manchego, fresh sourdough, and warm herbal tea enjoyed 20 minutes after sunset when the city turns cobalt blue.',
    duration: '2.5 hours',
    vibe: 'Cinematic & Romantic',
    rating: 4.8
  },
  {
    id: 'bioluminescent-kayak',
    title: 'Bioluminescent Night Paddle',
    category: 'Adventurous',
    description: 'Glide into calm sheltered waters under a new moon where every stroke of your oars sparks a turquoise halo beneath the surface.',
    duration: '3.5 hours',
    vibe: 'Ethereal & Magical',
    rating: 5.0,
    featured: true,
    image: '/download (58).jpg'
  },
  {
    id: 'ceramic-touch',
    title: 'Clay & Candlelight Pottery Studio',
    category: 'Artistic',
    description: 'Book an after-hours private ceramic wheel session. Shape a shared tea set with your hands covered in smooth wet clay and ambient jazz.',
    duration: '2.5 hours',
    vibe: 'Tactile & Playful',
    rating: 4.8
  },
  {
    id: 'sunrise-mist-walk',
    title: 'First Light Forest Trail',
    category: 'Adventurous',
    description: 'Wake up before the sun. Walk through dew-soaked redwoods with a thermos of pour-over coffee while the world is still asleep.',
    duration: '2 hours',
    vibe: 'Peaceful & Grounding',
    rating: 4.9,
    featured: true,
    image: '/703476404338919012.jpg'
  }
];

export const PLACES_TO_EXPLORE: Place[] = [
  {
    id: 'bixby-bluff',
    name: 'Bixby Canyon Overlook',
    location: 'Big Sur, California',
    tagline: 'Where ancient granite meets the Pacific mist',
    description: 'A dramatic cliffside terrace perched 800 feet above the crashing waves. At sunset, the golden rays ignite the coastal fog in tones of amber and copper.',
    atmosphere: 'Cinematic, Wild, Vast',
    bestTime: 'October – April at Twilight',
    image: '/download (57).jpg'
  },
  {
    id: 'kyoto-lantern-path',
    name: 'Sagano Bamboo Twilight Way',
    location: 'Kyoto, Japan',
    tagline: 'A silent green sanctuary lit by stone lanterns',
    description: 'When dusk settles, the bamboo forest empties. Warm amber lanterns illuminate the towering emerald stalks as the evening breeze rustles softly above.',
    atmosphere: 'Meditative, Ethereal, Poetic',
    bestTime: 'November during autumn leaves',
    image: '/download (58).jpg'
  },
  {
    id: 'amalfi-terrace',
    name: 'Villa Rufo Cliffside Gardens',
    location: 'Ravello, Italy',
    tagline: 'Suspended between sapphire sea and lemon groves',
    description: 'Overhanging the Tyrrhenian Sea, this quiet garden feels floating in the clouds. Perfect for sharing wine while distant church bells ring across the valley.',
    atmosphere: 'Timeless, Warm, Elegant',
    bestTime: 'May & September at Golden Hour',
    image: '/703476404338919012.jpg'
  },
  {
    id: 'tromso-aurora-cabin',
    name: 'Fjord Panorama Glashaus',
    location: 'Tromsø, Norway',
    tagline: 'Sleeping beneath the emerald dancing skies',
    description: 'A secluded glass cabin perched along the Lyngen Alps. From your heated featherbed, watch green ribbons of solar light dance across polar mountain peaks.',
    atmosphere: 'Intimate, Wonder, Cosmic',
    bestTime: 'December – February under New Moons',
    image: '/1101552390136306348.jpg'
  }
];

export const COUPLE_STORIES: CoupleStory[] = [
  {
    id: 'story-1',
    couple: 'Elena & David',
    title: 'The Edge of the World in Big Sur',
    location: 'Pacific Coast Highway',
    yearsTogether: '4 years',
    excerpt: 'We drove for six hours in complete silence without turning the radio on once. Not because we were angry, but because the silence between us was full of warmth.',
    fullStory: 'We stood on the cliff just as the morning sun burst over the edge of the planet. Looking down at the endless clouds illuminated in fire and gold, David looked at me and said: "No matter how big the cosmos feels, having your hand in mine makes it feel like home."',
    quote: '"Having your hand in mine makes the cosmos feel like home."',
    image: '/download (57).jpg'
  },
  {
    id: 'story-2',
    couple: 'Maya & Julian',
    title: 'The 36 Questions on a Rainy Tuesday',
    location: 'Edinburgh, Scotland',
    yearsTogether: '2 years',
    excerpt: 'We bought a cheap bottle of Bordeaux, turned off our phones, and printed out Arthur Aron’s 36 questions that lead to intimacy.',
    fullStory: 'We ended up talking until 4:45 AM. Question 28 asked: "When did you last cry in front of another person?" That was the night we stopped being two people dating and became each other’s safe harbor.',
    quote: '"That night we stopped being two people dating and became each other’s safe harbor."',
    image: '/703476404338919012.jpg'
  },
  {
    id: 'story-3',
    couple: 'Sora & Callum',
    title: 'Three Years, Forty-Two Sunrise Hikes',
    location: 'Hokkaido, Japan',
    yearsTogether: '6 years',
    excerpt: 'On our first anniversary, we decided that instead of exchanging expensive presents, we would gift each other sunrises in remote places.',
    fullStory: 'Each sunrise has its own memory. One was spent shivering under a shared tarp in driving drizzle. Another was an explosion of peach-colored light over Lake Toya. Experiences are the only wealth that never fades.',
    quote: '"Experiences are the only wealth that never fades."',
    image: '/download (58).jpg'
  }
];

export const INITIAL_BUCKET_LIST: BucketListItem[] = [
  { id: '1', text: 'Camp under the Perseid meteor shower at high altitude', completed: true, category: 'Starlit', addedBy: 'Elena' },
  { id: '2', text: 'Cook handmade tortellini from scratch with aged Chianti', completed: false, category: 'Culinary', addedBy: 'David' },
  { id: '3', text: 'Rent a wooden sailboat and swim in open deep water', completed: false, category: 'Adventurous', addedBy: 'Elena' },
  { id: '4', text: 'Spend an entire rainy Sunday reading aloud by the fireplace', completed: true, category: 'Intimate', addedBy: 'David' },
  { id: '5', text: 'Stand together on the sunrise cliff edge at the world’s rim', completed: true, category: 'Atmospheric', addedBy: 'Both' },
];
