// REMOVED: Review structured data - Google does NOT support self-declared reviews
// Reviews should come from Google My Business only
// Adding review schemas here triggers "Item does not support reviews" errors

// This component is now empty but kept to avoid breaking imports
// Reviews will show from Google My Business profile instead

interface Review {
  name: string;
  review: string;
  rating: number;
  date?: string;
}

interface ReviewsStructuredDataProps {
  reviews: Review[];
}

export default function ReviewsStructuredData({ reviews }: ReviewsStructuredDataProps) {
  // NO SCHEMA - Google only accepts reviews from Google My Business
  // Self-declared review structured data causes validation errors
  return null;
}