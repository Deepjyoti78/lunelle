export type ActiveTab = 'discover' | 'date-ideas' | 'places' | 'stories' | 'our-space';

export interface DateIdea {
  id: string;
  title: string;
  category: 'Starlit' | 'Intimate' | 'Adventurous' | 'Culinary' | 'Artistic';
  description: string;
  duration: string;
  vibe: string;
  rating: number;
  featured?: boolean;
}

export interface Place {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  atmosphere: string;
  bestTime: string;
  image: string;
}

export interface CoupleStory {
  id: string;
  couple: string;
  title: string;
  excerpt: string;
  fullStory: string;
  location: string;
  yearsTogether: string;
  quote: string;
  image: string;
}

export interface BucketListItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  addedBy: string;
}

