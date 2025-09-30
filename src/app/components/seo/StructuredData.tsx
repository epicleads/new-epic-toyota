import { BUSINESS_INFO } from "@/app/lib/business-info";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveDealer",
    "@id": `${BUSINESS_INFO.contact.website}#organization`,
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.contact.website,
    "logo": {
      "@type": "ImageObject",
      "url": `${BUSINESS_INFO.contact.website}/images/epic-toyota-logo.png`,
      "width": 512,
      "height": 512
    },
    "image": [
      `${BUSINESS_INFO.contact.website}/images/epic-toyota-og-image.jpg`,
      `${BUSINESS_INFO.contact.website}/images/showroom-exterior.jpg`,
      `${BUSINESS_INFO.contact.website}/images/service-center.jpg`
    ],
    "telephone": BUSINESS_INFO.contact.phone,
    "email": BUSINESS_INFO.contact.email,
    "sameAs": [
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.youtube,
      BUSINESS_INFO.social.twitter
    ],
    "brand": {
      "@type": "Brand",
      "name": "Toyota"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Raam Group"
    },
    "location": [
      {
        "@type": "Place",
        "@id": `${BUSINESS_INFO.contact.website}#mount-road`,
        "name": BUSINESS_INFO.locations.mountRoad.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_INFO.locations.mountRoad.address.streetAddress,
          "addressLocality": BUSINESS_INFO.locations.mountRoad.address.addressLocality,
          "addressRegion": BUSINESS_INFO.locations.mountRoad.address.addressRegion,
          "postalCode": BUSINESS_INFO.locations.mountRoad.address.postalCode,
          "addressCountry": BUSINESS_INFO.locations.mountRoad.address.addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": BUSINESS_INFO.locations.mountRoad.coordinates.latitude,
          "longitude": BUSINESS_INFO.locations.mountRoad.coordinates.longitude
        },
        "telephone": BUSINESS_INFO.locations.mountRoad.phone,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification", 
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "18:00"
          }
        ]
      },
      {
        "@type": "Place",
        "@id": `${BUSINESS_INFO.contact.website}#vyasarpadi`,
        "name": BUSINESS_INFO.locations.vyasarpadi.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_INFO.locations.vyasarpadi.address.streetAddress,
          "addressLocality": BUSINESS_INFO.locations.vyasarpadi.address.addressLocality,
          "addressRegion": BUSINESS_INFO.locations.vyasarpadi.address.addressRegion,
          "postalCode": BUSINESS_INFO.locations.vyasarpadi.address.postalCode,
          "addressCountry": BUSINESS_INFO.locations.vyasarpadi.address.addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates", 
          "latitude": BUSINESS_INFO.locations.vyasarpadi.coordinates.latitude,
          "longitude": BUSINESS_INFO.locations.vyasarpadi.coordinates.longitude
        },
        "telephone": BUSINESS_INFO.locations.vyasarpadi.phone,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday", 
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "18:00"
          }
        ]
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.contact.website}#localbusiness`,
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.contact.website,
    "telephone": BUSINESS_INFO.contact.phone,
    "email": BUSINESS_INFO.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS_INFO.geoData.primaryCoordinates.latitude,
      "longitude": BUSINESS_INFO.geoData.primaryCoordinates.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00", 
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Car Loan"],
    "areaServed": BUSINESS_INFO.serviceAreas.map(area => ({
      "@type": "Place",
      "name": area
    }))
  };

  const serviceSchemas = BUSINESS_INFO.services.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service", 
    "@id": `${BUSINESS_INFO.contact.website}#service-${index}`,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@id": `${BUSINESS_INFO.contact.website}#organization`
    },
    "areaServed": {
      "@type": "Place",
      "name": "Chennai, Tamil Nadu, India"
    },
    "category": "Automotive Services",
    "audience": {
      "@type": "Audience",
      "audienceType": "Car Buyers and Owners"
    }
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BUSINESS_INFO.contact.website
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS_INFO.contact.website}#website`,
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.contact.website,
    "publisher": {
      "@id": `${BUSINESS_INFO.contact.website}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BUSINESS_INFO.contact.website}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is Epic Toyota located in Chennai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epic Toyota has two locations in Chennai - Mount Road and Vyasarpadi. Both showrooms offer complete Toyota sales, service, and spare parts."
        }
      },
      {
        "@type": "Question", 
        "name": "What Toyota models are available at Epic Toyota Chennai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epic Toyota Chennai offers the complete range of Toyota vehicles including Innova Crysta, Fortuner, Camry, Vellfire, Glanza, Urban Cruiser Hyryder, and commercial vehicles."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide car financing and insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Epic Toyota provides attractive car financing options with competitive interest rates, along with comprehensive insurance solutions for all Toyota vehicles."
        }
      },
      {
        "@type": "Question",
        "name": "What are the service center timings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our service centers are open Monday-Friday 9 AM to 7 PM, Saturday 9 AM to 7 PM, and Sunday 10 AM to 6 PM."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={`service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}