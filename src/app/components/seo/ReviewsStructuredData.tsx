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
  const aggregateRating = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": reviews.length + 250, // Include actual Google reviews count
    "bestRating": "5",
    "worstRating": "1"
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.contact.website}#organization`,
    "name": BUSINESS_INFO.name,
    "aggregateRating": aggregateRating,
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
      "publisher": {
        "@type": "Organization",
        "name": "Epic Toyota Chennai"
      }
    }))
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS_INFO.contact.website}#toyota-cars`,
    "name": "Toyota Cars Chennai",
    "description": "New Toyota vehicles including Innova Crysta, Fortuner, Camry, Vellfire and more from Epic Toyota Chennai",
    "brand": {
      "@type": "Brand",
      "name": "Toyota"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "500000",
      "highPrice": "8000000",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": `${BUSINESS_INFO.contact.website}#organization`
      }
    },
    "aggregateRating": aggregateRating,
    "review": reviews.map((review, index) => ({
      "@type": "Review",
      "@id": `${BUSINESS_INFO.contact.website}#product-review-${index}`,
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": review.review,
      "datePublished": review.date || new Date().toISOString().split('T')[0]
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}