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

// Enhanced page metadata for Toyota Chennai domination
export const metadata: Metadata = {
  title: "Epic Toyota Chennai - #1 Toyota Dealer Mount Road & Vyasarpadi | New Cars, Service, Parts",
  description: "Epic Toyota Chennai - Premier authorized Toyota dealer serving Mount Road, Vyasarpadi & all Chennai. New Toyota cars, genuine service, spare parts & financing. Visit India's best Toyota showroom today!",
  keywords: [
    // Primary Chennai Toyota keywords
    "Toyota Chennai", "Toyota dealer Chennai", "Toyota showroom Chennai",
    "Toyota Mount Road", "Toyota Vyasarpadi", "Toyota T Nagar",
    "Epic Toyota Chennai", "Toyota Anna Nagar", "Toyota Adyar",
    
    // Service keywords
    "Toyota service Chennai", "Toyota spare parts Chennai", "Toyota maintenance Chennai",
    "Toyota car loan Chennai", "Toyota insurance Chennai", "Toyota exchange Chennai",
    
    // Model specific keywords
    "Innova Crysta Chennai", "Fortuner Chennai", "Camry Chennai", "Vellfire Chennai",
    "Glanza Chennai", "Urban Cruiser Hyryder Chennai", "Hilux Chennai",
    
    // Buying intent keywords
    "Buy Toyota Chennai", "New Toyota cars Chennai", "Toyota price Chennai",
    "Best Toyota dealer Chennai", "Toyota offers Chennai", "Toyota booking Chennai",
    
    // Location specific
    "Toyota dealer Mount Road", "Toyota showroom Vyasarpadi", "Toyota T Nagar",
    "Toyota dealer Anna Nagar", "Toyota showroom Adyar", "Toyota Velachery",
    "Toyota OMR", "Toyota ECR", "Toyota IT Corridor"
  ].join(", "),
  
  openGraph: {
    title: "Epic Toyota Chennai - #1 Toyota Dealer Mount Road & Vyasarpadi",
    description: "Epic Toyota Chennai - Premier authorized Toyota dealer. New cars, service, parts & financing across Mount Road, Vyasarpadi & Chennai.",
    url: BUSINESS_INFO.contact.website,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: "/images/epic-toyota-chennai-showroom.jpg",
        width: 1200,
        height: 630,
        alt: "Epic Toyota Chennai Showroom - Mount Road & Vyasarpadi",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Epic Toyota Chennai - #1 Toyota Dealer Mount Road & Vyasarpadi",
    description: "Epic Toyota Chennai - Premier authorized Toyota dealer. New cars, service, parts & financing.",
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
      {/* Hidden SEO Content for Enhanced Keyword Targeting */}
      <div className="sr-only">
        <h1>Epic Toyota Chennai - Premier Toyota Dealer Mount Road Vyasarpadi</h1>
        <p>Epic Toyota Chennai is the leading authorized Toyota dealer serving Mount Road, Vyasarpadi, T Nagar, Anna Nagar, Adyar and entire Chennai metropolitan area. We offer new Toyota cars including Innova Crysta, Fortuner, Camry, Vellfire, Glanza, Urban Cruiser Hyryder with genuine Toyota service, spare parts, car loans, insurance and exchange offers.</p>
        <div>
          <span>Toyota showroom Chennai, Toyota dealer Mount Road, Toyota service center Vyasarpadi, Toyota spare parts T Nagar, Toyota car loan Anna Nagar, Toyota insurance Adyar, Toyota exchange Velachery, Toyota OMR, Toyota ECR, Toyota IT Corridor</span>
        </div>
      </div>

      {/* Main Content with SEO-Optimized Structure */}
      <main 
        itemScope 
        itemType="https://schema.org/WebPage"
        className="relative"
      >
        {/* Structured Data for Page Content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${BUSINESS_INFO.contact.website}#webpage`,
              "name": "Epic Toyota Chennai - Toyota Dealer Mount Road & Vyasarpadi",
              "description": "Epic Toyota Chennai homepage featuring new Toyota cars, service, spare parts, and financing solutions for Chennai customers.",
              "url": BUSINESS_INFO.contact.website,
              "inLanguage": "en-IN",
              "isPartOf": {
                "@id": `${BUSINESS_INFO.contact.website}#website`
              },
              "about": {
                "@type": "Organization",
                "@id": `${BUSINESS_INFO.contact.website}#organization`,
                "name": BUSINESS_INFO.name
              },
              "mainEntity": {
                "@type": "AutomotiveDealer",
                "@id": `${BUSINESS_INFO.contact.website}#organization`
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
              "potentialAction": [
                {
                  "@type": "ReserveAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${BUSINESS_INFO.contact.website}/ContactUs`,
                    "actionPlatform": [
                      "http://schema.org/DesktopWebPlatform",
                      "http://schema.org/MobileWebPlatform"
                    ]
                  },
                  "object": {
                    "@type": "Product",
                    "name": "Toyota Car Test Drive Chennai"
                  }
                },
                {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${BUSINESS_INFO.contact.website}/search?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              ]
            }),
          }}
        />

        {/* Article Schema for SEO Content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${BUSINESS_INFO.contact.website}#homepage-article`,
              "headline": "Epic Toyota Chennai - Premier Toyota Dealer Serving Mount Road, Vyasarpadi & All Chennai",
              "description": "Discover Epic Toyota Chennai, the leading authorized Toyota dealer offering new cars, genuine service, spare parts and financing across Mount Road, Vyasarpadi and entire Chennai metro.",
              "author": {
                "@type": "Organization",
                "@id": `${BUSINESS_INFO.contact.website}#organization`,
                "name": BUSINESS_INFO.name
              },
              "publisher": {
                "@type": "Organization",
                "@id": `${BUSINESS_INFO.contact.website}#organization`,
                "name": BUSINESS_INFO.name,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${BUSINESS_INFO.contact.website}/images/epic-toyota-logo.png`
                }
              },
              "datePublished": new Date().toISOString().split('T')[0],
              "dateModified": new Date().toISOString().split('T')[0],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": BUSINESS_INFO.contact.website
              },
              "image": {
                "@type": "ImageObject",
                "url": `${BUSINESS_INFO.contact.website}/images/epic-toyota-chennai-showroom.jpg`,
                "width": 1200,
                "height": 630
              },
              "keywords": "Toyota Chennai, Toyota dealer Chennai, Toyota Mount Road, Toyota Vyasarpadi, Epic Toyota, Toyota service Chennai, Toyota spare parts Chennai",
              "about": [
                {
                  "@type": "Thing",
                  "name": "Toyota Dealer Chennai"
                },
                {
                  "@type": "Place", 
                  "name": "Chennai, Tamil Nadu"
                },
                {
                  "@type": "Brand",
                  "name": "Toyota"
                }
              ]
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

        {/* Main Content Sections with Enhanced SEO */}
        <Header/>
        <header itemScope itemType="https://schema.org/WPHeader" id="hero">
          <HeroServer />
        </header>

        <section itemScope itemType="https://schema.org/PromotionalOffer" id="offers">
          <CountdownSection />
        </section>

        <section itemScope itemType="https://schema.org/AboutPage" id="about">
          <AboutSection />  
        </section>

        <section itemScope itemType="https://schema.org/Service" id="services">
          <ServicesSection />
        </section>

        <section itemScope itemType="https://schema.org/Review" id="testimonials">
          <TestimonialsSection />
        </section>

        <section itemScope itemType="https://schema.org/Product" id="models">
          <ToyotaFeaturedModels />
        </section>

        <section itemScope itemType="https://schema.org/Organization" id="why-choose">
          <WhyBuySection />
        </section>

        <section itemScope itemType="https://schema.org/Place" id="locations">
          <LocationsSection />  
        </section>

        <section itemScope itemType="https://schema.org/ContactPage" id="contact">
          <FinalCTASection />
        </section>

        <footer itemScope itemType="https://schema.org/WPFooter">
          <Footer />  
        </footer>
      </main>
    </>
  );
}