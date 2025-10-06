import { BUSINESS_INFO } from "@/app/lib/business-info";

export default function GeoTargeting() {
  // Service Area Schema for each location zone
  const serviceAreaSchemas = BUSINESS_INFO.serviceAreas.map((area, index) => ({
    "@context": "https://schema.org",
    "@type": "ServiceArea", 
    "@id": `${BUSINESS_INFO.contact.website}#service-area-${index}`,
    "name": area.name,
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": area.coordinates.lat,
        "longitude": area.coordinates.lng
      },
      "geoRadius": area.radius
    },
    "areaServed": area.localities.map(locality => ({
      "@type": "Place",
      "name": locality,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locality,
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    })),
    "provider": {
      "@id": `${BUSINESS_INFO.contact.website}#organization`
    }
  }));

  // Enhanced LocalBusiness with multiple service areas (GOOGLE COMPLIANT - has required address field)
  const enhancedLocalBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveDealer"],
    "@id": `${BUSINESS_INFO.contact.website}#enhanced-local`,
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.contact.website,

    // REQUIRED: Primary address field for LocalBusiness
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.locations.mountRoad.address.streetAddress,
      "addressLocality": BUSINESS_INFO.locations.mountRoad.address.addressLocality,
      "addressRegion": BUSINESS_INFO.locations.mountRoad.address.addressRegion,
      "postalCode": BUSINESS_INFO.locations.mountRoad.address.postalCode,
      "addressCountry": BUSINESS_INFO.locations.mountRoad.address.addressCountry
    },

    // Multiple precise locations (additional branches)
    "location": [
      {
        "@type": "Place",
        "@id": `${BUSINESS_INFO.contact.website}#mount-road-precise`,
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
        "containsPlace": BUSINESS_INFO.locations.mountRoad.landmarks?.map(landmark => ({
          "@type": "Place",
          "name": landmark
        }))
      },
      {
        "@type": "Place",
        "@id": `${BUSINESS_INFO.contact.website}#vyasarpadi-precise`,
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
        "containsPlace": BUSINESS_INFO.locations.vyasarpadi.landmarks?.map(landmark => ({
          "@type": "Place",
          "name": landmark
        }))
      }
    ],

    // Service areas coverage
    "areaServed": BUSINESS_INFO.serviceAreas.map(area => ({
      "@type": "GeoCircle",
      "name": area.name,
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": area.coordinates.lat,
        "longitude": area.coordinates.lng
      },
      "geoRadius": area.radius,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    })),

    // Enhanced contact info
    "telephone": BUSINESS_INFO.contact.phone,
    "email": BUSINESS_INFO.contact.email,

    // Brand and parent organization
    "brand": {
      "@type": "Brand",
      "name": "Toyota"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Raam Group"
    }
  };

  // Place schema for major Chennai landmarks (association targeting)
  const landmarkSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${BUSINESS_INFO.contact.website}#spencer-plaza-toyota`,
      "name": "Toyota Dealer near Spencer Plaza Chennai",
      "description": "Epic Toyota Mount Road showroom located near Spencer Plaza, Chennai's premier shopping destination.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "13.0632",
        "longitude": "80.2707"
      },
      "nearbyAttraction": [
        {
          "@type": "Place",
          "name": "Spencer Plaza"
        },
        {
          "@type": "Place", 
          "name": "Mount Road"
        },
        {
          "@type": "Place",
          "name": "T Nagar"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${BUSINESS_INFO.contact.website}#vyasarpadi-industrial-toyota`,
      "name": "Toyota Dealer Vyasarpadi Industrial Estate Chennai", 
      "description": "Epic Toyota Vyasarpadi showroom in the heart of North Chennai's industrial hub.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "13.1067",
        "longitude": "80.2897"
      },
      "nearbyAttraction": [
        {
          "@type": "Place",
          "name": "Vyasarpadi Industrial Estate"
        },
        {
          "@type": "Place",
          "name": "Perambur"
        },
        {
          "@type": "Place", 
          "name": "Red Hills Road"
        }
      ]
    }
  ];

  return (
    <>
      {/* Enhanced LocalBusiness with Precise Geo-targeting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedLocalBusiness),
        }}
      />
      
      {/* Service Area Schemas */}
      {serviceAreaSchemas.map((schema, index) => (
        <script
          key={`service-area-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {/* Landmark Association Schemas */}
      {landmarkSchemas.map((schema, index) => (
        <script
          key={`landmark-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {/* Geo Meta Tags for Enhanced Location Targeting */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai, Tamil Nadu, India" />
      <meta name="geo.position" content={`${BUSINESS_INFO.geoData.primaryCoordinates.latitude};${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`} />
      <meta name="ICBM" content={`${BUSINESS_INFO.geoData.primaryCoordinates.latitude}, ${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`} />
      
      {/* Location-specific meta tags */}
      <meta name="DC.coverage" content="Chennai, Tamil Nadu, India" />
      <meta name="coverage" content="Chennai Metropolitan Area" />
      
      {/* Service area meta tags */}
      {BUSINESS_INFO.serviceAreas.map((area, index) => (
        <meta 
          key={`area-${index}`}
          name={`geo.service-area-${index}`}
          content={`${area.name}: ${area.coordinates.lat},${area.coordinates.lng} (${area.radius})`}
        />
      ))}
    </>
  );
}