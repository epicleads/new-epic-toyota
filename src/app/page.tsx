import { Metadata } from "next";
import HeroServer from "./components/hero/HeroServer";
import CountdownSection from "./components/CountdownSection";
import AboutSection from "./components/aboutSection/aboutSectionClient";
import ServicesSection from "./components/services/servicesClient";
import TestimonialsSection from "./components/testimonials/testimonialsClient";
import ToyotaFeaturedModels from "./components/models/modelsClient";
import WhyBuySection from "./components/whyBuyFromUs/whyBuySection";
import LocationsSection from "./components/Locations/locationsClient";
import FinalCTASection from "./components/finalCTA";
import Footer from "./components/Footer";
import { BUSINESS_INFO } from "./lib/business-info";
import Header from "./components/header";

// COMPREHENSIVE SEO - Dominate ALL Toyota searches in Chennai (Dealer, Showroom, Offers, Models)
export const metadata: Metadata = {
  title: "Epic Toyota Chennai - #1 Authorized Dealer Mount Road & Vyasarpadi | Latest Offers 2025",
  description: "Epic Toyota Chennai - Premier authorized Toyota showroom at Mount Road & Vyasarpadi. Latest offers on Innova Hycross, Fortuner, Glanza, Camry & all models. Best prices, exchange deals, low EMI. Book test drive today!",
  keywords: [
    // PRIMARY DEALER/SHOWROOM KEYWORDS (Highest Search Volume)
    "Toyota dealer Chennai", "Toyota showroom Chennai", "Authorized Toyota dealer Chennai",
    "Epic Toyota Chennai", "Toyota Chennai", "Best Toyota dealer Chennai",
    "Toyota Mount Road", "Toyota Vyasarpadi", "Toyota showroom near me",

    // LOCATION-SPECIFIC DEALER SEARCHES
    "Toyota dealer Mount Road", "Toyota showroom Vyasarpadi", "Toyota T Nagar",
    "Toyota Anna Nagar", "Toyota Adyar", "Toyota Velachery", "Toyota OMR",
    "Toyota ECR", "Toyota IT Corridor", "Toyota Porur", "Toyota Nungambakkam",

    // OFFERS KEYWORDS (High Buying Intent)
    "Toyota offers Chennai", "Latest Toyota offers Chennai", "Toyota discount Chennai",
    "Toyota deals Chennai", "Best Toyota offers", "Toyota exchange offers Chennai",
    "Toyota year end offers", "Toyota festival offers", "Toyota price Chennai",

    // MODEL-SPECIFIC SEARCHES (People search by model)
    "Innova Hycross Chennai", "Fortuner Chennai", "Glanza Chennai",
    "Urban Cruiser Hyryder Chennai", "Innova Crysta Chennai", "Camry Chennai",
    "Vellfire Chennai", "Hilux Chennai", "Land Cruiser Chennai",
    "Rumion Chennai", "Taisor Chennai",

    // BUYING INTENT KEYWORDS
    "Buy Toyota Chennai", "New Toyota cars Chennai", "Toyota on road price Chennai",
    "Toyota car price Chennai", "Book Toyota test drive Chennai",
    "Toyota showroom timings Chennai", "Toyota contact number Chennai",

    // SERVICE KEYWORDS (Bring people to showroom)
    "Toyota service Chennai", "Toyota service center Chennai", "Toyota spare parts Chennai",
    "Toyota maintenance Chennai", "Toyota car service Mount Road", "Toyota authorized service",

    // FINANCIAL KEYWORDS
    "Toyota loan Chennai", "Toyota EMI Chennai", "Toyota finance Chennai",
    "Toyota car loan offers", "Toyota zero down payment", "Toyota low EMI",
    "Toyota insurance Chennai", "Toyota extended warranty",

    // EXCHANGE KEYWORDS
    "Toyota exchange Chennai", "Old car exchange Toyota", "Toyota trade-in Chennai",
    "Sell old car buy Toyota", "Toyota exchange offer Mount Road",

    // COMPARISON SEARCHES
    "Best Toyota showroom Chennai", "Toyota dealer near me", "Nearest Toyota showroom",
    "Toyota authorized dealer list Chennai", "Official Toyota dealer Chennai"
  ].join(", "),
  
  openGraph: {
    title: "Epic Toyota Chennai - #1 Authorized Dealer | Latest Offers on All Models",
    description: "Epic Toyota Chennai - Premier showroom at Mount Road & Vyasarpadi. Latest offers on Innova Hycross, Fortuner, Glanza & all models. Best prices, exchange deals, test drives.",
    url: BUSINESS_INFO.contact.website,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: "/images/epic-toyota-chennai-showroom.jpg",
        width: 1200,
        height: 630,
        alt: "Latest Toyota Offers Chennai 2025 - Epic Toyota Exclusive Deals",
      }
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Latest Toyota Offers Chennai 2025 | Epic Toyota Exclusive Deals",
    description: "Best Toyota offers in Chennai! Year-end discounts, exchange deals, low EMI. Limited period offers.",
    images: ["/images/epic-toyota-chennai-showroom.jpg"],
  },
  
  alternates: {
    canonical: BUSINESS_INFO.contact.website,
  },
  
  other: {
    "article:publisher": BUSINESS_INFO.social.facebook,
    "article:author": BUSINESS_INFO.name,
    "geo.region": "IN-TN",
    "geo.placename": "Chennai, Tamil Nadu, India",
    "geo.position": `${BUSINESS_INFO.geoData.primaryCoordinates.latitude};${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`,
    "ICBM": `${BUSINESS_INFO.geoData.primaryCoordinates.latitude}, ${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`,
  },
};

export default function HomePage() {  
  return (
    <>
      {/* Hidden SEO Content - OFFERS FOCUSED for Automotive Industry */}
      <div className="sr-only">
        <h1>Latest Toyota Offers Chennai 2025 - Epic Toyota Exclusive Deals & Discounts</h1>
        <p>Get the best Toyota offers in Chennai at Epic Toyota! We bring you exclusive year-end discounts, exchange offers, and special financing schemes on all Toyota models including Innova Hycross, Fortuner, Glanza, Urban Cruiser Hyryder, Innova Crysta, Camry, and more. Visit our showrooms at Mount Road and Vyasarpadi for limited period deals.</p>
        <h2>Current Toyota Offers in Chennai</h2>
        <p>Exclusive Toyota year-end offers Chennai, special exchange bonuses up to ₹50,000, low EMI starting from ₹9,999/month, zero down payment schemes, free accessories worth ₹25,000, extended warranty offers, corporate discounts, loyalty benefits for existing Toyota customers.</p>
        <h2>Why Choose Epic Toyota for Best Offers?</h2>
        <p>Authorized Toyota dealer Chennai, transparent pricing, genuine accessories, best exchange value, flexible financing options, doorstep delivery, 24/7 customer support, Mount Road and Vyasarpadi locations.</p>
        <div>
          <span>Toyota offers Chennai, Toyota discount Chennai, Toyota deals Mount Road, Toyota exchange offers Vyasarpadi, best Toyota price Chennai, Toyota finance schemes, Toyota low EMI, Toyota year end sale, Toyota festival offers, Epic Toyota exclusive deals</span>
        </div>
      </div>

      {/* Main Content with SEO-Optimized Structure */}
      <main 
        itemScope 
        itemType="https://schema.org/WebPage"
        className="relative"
      >
        {/* Automotive Dealer Schema - LEAD GENERATION (No Product/Offer to avoid merchant issues) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutomotiveDealer",
              "@id": `${BUSINESS_INFO.contact.website}#maindealer`,
              "name": BUSINESS_INFO.name,
              "description": "Epic Toyota Chennai - Authorized Toyota dealer offering latest models, special offers, exchange deals, financing options, and expert service at Mount Road & Vyasarpadi locations",
              "url": BUSINESS_INFO.contact.website,
              "brand": {
                "@type": "Brand",
                "name": "Toyota"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Chennai",
                  "containedInPlace": {
                    "@type": "State",
                    "name": "Tamil Nadu"
                  }
                }
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "Test Drive Booking",
                  "description": "Book a free test drive for any Toyota model at Epic Toyota Chennai",
                  "category": "Service",
                  "availableAtOrFrom": {
                    "@type": "Place",
                    "name": "Epic Toyota Chennai Showrooms"
                  }
                },
                {
                  "@type": "Offer",
                  "name": "Vehicle Exchange Program",
                  "description": "Exchange your old car for a new Toyota with attractive exchange bonuses",
                  "category": "Service",
                  "availableAtOrFrom": {
                    "@type": "Place",
                    "name": "Epic Toyota Chennai"
                  }
                },
                {
                  "@type": "Offer",
                  "name": "Financing Assistance",
                  "description": "Flexible car loan options with competitive EMI schemes",
                  "category": "Service",
                  "availableAtOrFrom": {
                    "@type": "Place",
                    "name": "Epic Toyota Chennai"
                  }
                }
              ],
              "potentialAction": {
                "@type": "ReserveAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BUSINESS_INFO.contact.website}#contact`,
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                },
                "result": {
                  "@type": "Reservation",
                  "name": "Test Drive Booking"
                }
              }
            }),
          }}
        />

        {/* WebPage Schema - INFORMATIONAL (No commercial product listing) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${BUSINESS_INFO.contact.website}#webpage`,
              "name": "Epic Toyota Chennai - Authorized Toyota Dealer | Latest Offers 2025",
              "description": "Epic Toyota Chennai - Premier authorized Toyota showroom at Mount Road & Vyasarpadi. Latest offers on Innova Hycross, Fortuner, Glanza, Camry & all models. Best prices, exchange deals, low EMI. Book test drive today!",
              "url": BUSINESS_INFO.contact.website,
              "inLanguage": "en-IN",
              "isPartOf": {
                "@type": "WebSite",
                "@id": `${BUSINESS_INFO.contact.website}#website`
              },
              "about": {
                "@type": "AutomotiveDealer",
                "@id": `${BUSINESS_INFO.contact.website}#organization`,
                "name": BUSINESS_INFO.name
              },
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": `${BUSINESS_INFO.contact.website}/images/epic-toyota-chennai-showroom.jpg`,
                "width": 1200,
                "height": 630
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": BUSINESS_INFO.contact.website
                  }
                ]
              },
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".description"]
              }
            }),
          }}
        />

        {/* Navigation Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": `${BUSINESS_INFO.contact.website}#navigation`,
              "name": "Epic Toyota Chennai Navigation",
              "url": [
                {
                  "@type": "WebPage",
                  "name": "Home",
                  "url": BUSINESS_INFO.contact.website
                },
                {
                  "@type": "WebPage", 
                  "name": "About Epic Toyota Chennai",
                  "url": `${BUSINESS_INFO.contact.website}/#about`
                },
                {
                  "@type": "WebPage",
                  "name": "Toyota Cars & Models",
                  "url": `${BUSINESS_INFO.contact.website}/#models`
                },
                {
                  "@type": "WebPage",
                  "name": "Toyota Service Chennai",
                  "url": `${BUSINESS_INFO.contact.website}/#services`
                },
                {
                  "@type": "WebPage",
                  "name": "Customer Reviews",
                  "url": `${BUSINESS_INFO.contact.website}/#testimonials`
                },
                {
                  "@type": "WebPage",
                  "name": "Showroom Locations",
                  "url": `${BUSINESS_INFO.contact.website}/#locations`
                }
              ]
            }),
          }}
        />

        {/* Main Content Sections - Semantic HTML (No Product microdata) */}
        <Header/>
        <header id="hero">
          <HeroServer />
        </header>

        <section id="offers">
          <CountdownSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section id="models">
          <ToyotaFeaturedModels />
        </section>

        <section id="why-choose">
          <WhyBuySection />
        </section>

        <section id="locations">
          <LocationsSection />
        </section>

        <section id="contact">
          <FinalCTASection />
        </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}