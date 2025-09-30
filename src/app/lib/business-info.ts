export const BUSINESS_INFO = {
  // Core Business Details
  name: "Epic Toyota - Raam Group",
  legalName: "Epic Toyota Chennai Showroom",
  description: "Premier Toyota dealership in Chennai offering new Toyota cars, genuine spare parts, professional service, and comprehensive financing solutions. Authorized Toyota dealer serving Mount Road, Vyasarpadi, and all of Chennai.",
  
  // Location Details with Precise Coordinates
  locations: {
    mountRoad: {
      name: "Epic Toyota Mount Road",
      address: {
        streetAddress: "123 Anna Salai (Mount Road), Near Spencer Plaza",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600002",
        addressCountry: "IN"
      },
      coordinates: {
        latitude: "13.0632",
        longitude: "80.2707",
        accuracy: "ROOFTOP" // Precise building level accuracy
      },
      phone: "+91-44-2851-XXXX", // Update with actual number
      email: "mountroad@epictoyota.com",
      landmarks: ["Spencer Plaza", "Thousand Lights", "Anna Salai", "T Nagar"],
      areasCovered: ["Mount Road", "T Nagar", "Thousand Lights", "Teynampet", "Anna Nagar East"]
    },
    vyasarpadi: {
      name: "Epic Toyota Vyasarpadi", 
      address: {
        streetAddress: "456 High Road, Vyasarpadi Industrial Estate",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600039", 
        addressCountry: "IN"
      },
      coordinates: {
        latitude: "13.1067",
        longitude: "80.2897",
        accuracy: "ROOFTOP" // Precise building level accuracy
      },
      phone: "+91-44-2661-YYYY", // Update with actual number
      email: "vyasarpadi@epictoyota.com",
      landmarks: ["Vyasarpadi Industrial Estate", "Perambur", "Korattur", "Red Hills Road"],
      areasCovered: ["Vyasarpadi", "Perambur", "Korattur", "Madhavaram", "Red Hills", "Puzhal"]
    }
  },

  // Contact Information
  contact: {
    phone: "+91-44-2XXX-XXXX", // Primary business number
    email: "info@epictoyota.com",
    website: "https://epictoyota.in",
    supportHours: "9:00 AM - 7:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)"
  },

  // Services Offered
  services: [
    {
      name: "New Toyota Car Sales",
      description: "Complete range of new Toyota vehicles including sedans, hatchbacks, SUVs, and commercial vehicles.",
      keywords: "toyota cars chennai, new toyota, buy toyota chennai"
    },
    {
      name: "Toyota Service Center",
      description: "Authorized Toyota service center with genuine parts, trained technicians, and comprehensive maintenance.",
      keywords: "toyota service chennai, toyota maintenance, genuine toyota parts"
    },
    {
      name: "Toyota Spare Parts",
      description: "Genuine Toyota spare parts and accessories for all Toyota models.",
      keywords: "toyota spare parts chennai, genuine toyota parts, toyota accessories"
    },
    {
      name: "Car Financing & Insurance",
      description: "Attractive car loans, insurance solutions, and flexible financing options for Toyota vehicles.",
      keywords: "toyota car loan chennai, car finance, toyota insurance"
    },
    {
      name: "Car Exchange Program",
      description: "Best value exchange offers for your old car when purchasing a new Toyota.",
      keywords: "car exchange chennai, toyota exchange offer, sell old car"
    }
  ],

  // SEO Keywords
  seoKeywords: {
    primary: [
      "Toyota Chennai",
      "Toyota showroom Chennai",
      "Toyota dealer Chennai",
      "Toyota cars Chennai",
      "Buy Toyota Chennai"
    ],
    location: [
      "Toyota Mount Road",
      "Toyota Vyasarpadi", 
      "Toyota T Nagar",
      "Toyota Anna Nagar",
      "Toyota Adyar"
    ],
    services: [
      "Toyota service Chennai",
      "Toyota spare parts Chennai",
      "Toyota car loan Chennai",
      "Toyota exchange Chennai"
    ],
    models: [
      "Innova Crysta Chennai",
      "Fortuner Chennai",
      "Camry Chennai", 
      "Vellfire Chennai",
      "Glanza Chennai"
    ]
  },

  // Social Media
  social: {
    facebook: "https://facebook.com/epictoyotachennai",
    instagram: "https://instagram.com/epictoyotachennai",
    youtube: "https://youtube.com/@epictoyotachennai",
    twitter: "https://twitter.com/epictoyotachn"
  },

  // Business Hours
  openingHours: {
    weekdays: "Mo-Fr 09:00-19:00",
    saturday: "Sa 09:00-19:00", 
    sunday: "Su 10:00-18:00"
  },

  // Google Business Profile
  googlePlaceId: "", // Add actual Google Place ID
  googleBusinessUrl: "",

  // Brand Information
  brand: {
    logo: "/images/epic-toyota-logo.png",
    favicon: "/favicon.ico",
    colors: {
      primary: "#EB0A1E", // Toyota Red
      secondary: "#1C1C1C", // Toyota Black
      accent: "#FFFFFF"
    }
  },

  // Geographic Coverage with Coordinates
  serviceAreas: [
    {
      name: "Chennai Central",
      coordinates: { lat: "13.0827", lng: "80.2707" },
      radius: "5km",
      localities: ["Mount Road", "T Nagar", "Thousand Lights", "Teynampet", "Anna Nagar East"]
    },
    {
      name: "North Chennai",
      coordinates: { lat: "13.1067", lng: "80.2897" },
      radius: "8km", 
      localities: ["Vyasarpadi", "Perambur", "Korattur", "Madhavaram", "Red Hills", "Puzhal", "Tiruvottiyur"]
    },
    {
      name: "South Chennai",
      coordinates: { lat: "12.9716", lng: "80.2476" },
      radius: "10km",
      localities: ["Adyar", "Velachery", "Tambaram", "Chromepet", "Pallikaranai", "Sholinganallur"]
    },
    {
      name: "West Chennai", 
      coordinates: { lat: "13.0358", lng: "80.1766" },
      radius: "12km",
      localities: ["Porur", "Vadapalani", "Koyambedu", "Saligramam", "Ramapuram", "Kundrathur"]
    },
    {
      name: "IT Corridor (OMR/ECR)",
      coordinates: { lat: "12.8406", lng: "80.1534" },
      radius: "15km",
      localities: ["OMR", "ECR", "Kelambakkam", "Mahindra City", "Siruseri", "Navalur"]
    }
  ],

  // Geo-Targeting Data for Enhanced Local SEO
  geoData: {
    primaryCoordinates: {
      latitude: "13.0827",
      longitude: "80.2707",
      accuracy: "APPROXIMATE", // City center for broad targeting
      place_id: "ChIJYTN9T-plUjoRM9RjaAunYW4" // Chennai Place ID (update with actual)
    },
    targetRadius: "25km", // Cover entire Chennai metropolitan area
    competitorLocations: [
      { name: "Toyota India Official", distance: "0km", priority: "HIGH" },
      { name: "Other Toyota Dealers", distance: "5-20km", priority: "MEDIUM" }
    ],
    localKeywords: [
      "Toyota dealer near me",
      "Toyota showroom in Chennai", 
      "Toyota service center Chennai",
      "Best Toyota dealer Chennai",
      "Toyota cars Chennai price"
    ]
  }
};

export const META_DEFAULTS = {
  siteName: BUSINESS_INFO.name,
  siteUrl: BUSINESS_INFO.contact.website,
  title: "Epic Toyota Chennai - Authorized Toyota Dealer | Mount Road & Vyasarpadi",
  description: BUSINESS_INFO.description,
  keywords: BUSINESS_INFO.seoKeywords.primary.join(", ") + ", " + BUSINESS_INFO.seoKeywords.location.join(", "),
  author: BUSINESS_INFO.name,
  robots: "index, follow",
  language: "en-IN",
  region: "IN-TN"
};