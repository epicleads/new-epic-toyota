import { BUSINESS_INFO } from "@/app/lib/business-info";

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
  // AUTOMOTIVE DEALER REVIEWS - No Product Schema (Avoids Merchant Center Issues)
  const automotiveDealerReviewsSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveDealer",
    "@id": `${BUSINESS_INFO.contact.website}#organization`,
    "name": BUSINESS_INFO.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": reviews.length + 250, // Include actual Google reviews count
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map((review, index) => ({
      "@type": "Review",
      "@id": `${BUSINESS_INFO.contact.website}#review-${index}`,
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.review,
      "datePublished": review.date || new Date().toISOString().split('T')[0],
      "itemReviewed": {
        "@type": "AutomotiveDealer",
        "name": BUSINESS_INFO.name
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(automotiveDealerReviewsSchema),
      }}
    />
  );
}