# Google Search Console & Google Ads Compliance Guide

## ✅ COMPLIANCE STATUS: AUTOMOTIVE LEAD GENERATION SITE

This website is configured as an **Automotive Dealer Lead Generation Site** - NOT an e-commerce/product listing site. This prevents Google Merchant Center errors and ensures proper validation in Google Search Console and Google Ads.

---

## 🎯 What We Fixed

### ❌ REMOVED (Causes Merchant Center Issues)
1. **Product Schema** - Removed from ReviewsStructuredData.tsx
2. **AggregateOffer Schema** - No pricing data that triggers product feed requirements
3. **OfferCatalog Schema** - Replaced with service-based offers
4. **itemScope/itemType microdata** on sections - Removed Product, PromotionalOffer types
5. **Individual Offer schemas with Car items** - Replaced with service offerings

### ✅ IMPLEMENTED (Automotive Industry Compliant)
1. **AutomotiveDealer Schema** - Primary organization type
2. **LocalBusiness Schema** - For local SEO
3. **Service-Based Offers** - Test drives, financing, exchange programs (no product prices)
4. **Review Schema** - Attached to AutomotiveDealer (not Product)
5. **WebPage Schema** - Informational content (not commercial product listing)
6. **ReserveAction** - Lead generation actions (test drive bookings)

---

## 📊 Current Structured Data Architecture

### 1. **AutomotiveDealer** (Main Business Entity)
```json
{
  "@type": "AutomotiveDealer",
  "name": "Epic Toyota Chennai",
  "brand": { "@type": "Brand", "name": "Toyota" },
  "makesOffer": [
    { "@type": "Offer", "name": "Test Drive Booking", "category": "Service" },
    { "@type": "Offer", "name": "Vehicle Exchange Program", "category": "Service" },
    { "@type": "Offer", "name": "Financing Assistance", "category": "Service" }
  ],
  "potentialAction": { "@type": "ReserveAction" }
}
```
**Purpose**: Identifies the business as an automotive dealer with service offerings (not product sales)

### 2. **LocalBusiness** (Local SEO)
```json
{
  "@type": "LocalBusiness",
  "name": "Epic Toyota Chennai",
  "address": {...},
  "geo": {...},
  "openingHoursSpecification": [...]
}
```
**Purpose**: Local search visibility without triggering product feed requirements

### 3. **WebPage** (Informational Content)
```json
{
  "@type": "WebPage",
  "about": { "@type": "AutomotiveDealer" },
  "inLanguage": "en-IN"
}
```
**Purpose**: Marks page as informational/editorial content, not a product catalog

### 4. **Reviews on AutomotiveDealer** (NOT Product)
```json
{
  "@type": "AutomotiveDealer",
  "aggregateRating": {...},
  "review": [
    {
      "@type": "Review",
      "itemReviewed": { "@type": "AutomotiveDealer" }
    }
  ]
}
```
**Purpose**: Reviews for the dealer business, not for products (avoids review snippet errors)

### 5. **FAQPage, WebSite, Service** (Supporting Schemas)
All properly configured in StructuredData.tsx component

---

## 🚫 What NOT to Do

### ❌ DON'T Add These Schemas (Will Trigger Merchant Issues)
1. **Product Schema with Offers**
   ```json
   // ❌ BAD - Triggers product feed requirement
   {
     "@type": "Product",
     "name": "Toyota Fortuner",
     "offers": {
       "@type": "Offer",
       "price": "3500000",
       "priceCurrency": "INR"
     }
   }
   ```

2. **AggregateOffer on Products**
   ```json
   // ❌ BAD - Requires Merchant Center feed
   {
     "@type": "Product",
     "offers": {
       "@type": "AggregateOffer",
       "lowPrice": "500000",
       "highPrice": "8000000"
     }
   }
   ```

3. **OfferCatalog with Product Items**
   ```json
   // ❌ BAD - Google expects a product feed
   {
     "@type": "OfferCatalog",
     "itemListElement": [
       {
         "@type": "Offer",
         "itemOffered": { "@type": "Car" }
       }
     ]
   }
   ```

4. **Review on Product**
   ```json
   // ❌ BAD - Reviews on products need product data
   {
     "@type": "Product",
     "review": [...]
   }
   ```

### ✅ DO Use These Instead (Automotive Lead Generation)
1. **Service-Based Offers**
   ```json
   // ✅ GOOD - Service offering, not product sale
   {
     "@type": "AutomotiveDealer",
     "makesOffer": [
       {
         "@type": "Offer",
         "name": "Test Drive Booking",
         "category": "Service",
         "description": "Book a free test drive"
       }
     ]
   }
   ```

2. **ReserveAction for Lead Generation**
   ```json
   // ✅ GOOD - Action-based, not purchase-based
   {
     "@type": "ReserveAction",
     "target": { "@type": "EntryPoint" },
     "result": { "@type": "Reservation" }
   }
   ```

3. **Reviews on AutomotiveDealer**
   ```json
   // ✅ GOOD - Business reviews
   {
     "@type": "AutomotiveDealer",
     "review": [
       {
         "@type": "Review",
         "itemReviewed": { "@type": "AutomotiveDealer" }
       }
     ]
   }
   ```

---

## 🔍 Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://epictoyota.co.in`
3. Verify ownership (use HTML tag in `layout.tsx` or DNS method)

### Step 2: Submit Sitemap
1. Create sitemap: `public/sitemap.xml`
2. Submit: `https://epictoyota.co.in/sitemap.xml`

### Step 3: Request Indexing
1. Use URL Inspection tool
2. Request indexing for main page
3. Wait 24-48 hours for crawl

### Step 4: Monitor Issues
Check these sections:
- **Coverage**: Should show no errors for merchant/product issues
- **Enhancements**: Check for review snippet errors
- **Manual Actions**: Should be clean (no penalties)
- **Rich Results**: Should show AutomotiveDealer, LocalBusiness, FAQPage

### Step 5: Expected Results
✅ **What Should Appear**:
- AutomotiveDealer rich result
- LocalBusiness with ratings
- FAQ snippets
- Breadcrumbs
- Site links

❌ **What Should NOT Appear**:
- Product rich results
- Merchant listing warnings
- Shopping feed errors
- Price drop notifications

---

## 🎯 Google Ads Compliance

### Campaign Setup
1. **Campaign Type**: Search campaigns (NOT Shopping/PMax for products)
2. **Ad Extensions**: Location, Call, Sitelink (NOT Product feeds)
3. **Keywords**: Service/dealer keywords (NOT product keywords)
4. **Landing Pages**: Lead gen forms (NOT checkout pages)

### Tracking Setup
1. **Conversion Actions**:
   - Form submissions (test drive booking)
   - Phone calls
   - WhatsApp clicks
   - Directions clicks

2. **NOT Product Transactions**:
   - No purchase tracking
   - No cart value
   - No product catalogs

### Ad Copy Guidelines
✅ **Allowed**:
- "Book Test Drive at Epic Toyota Chennai"
- "Latest Toyota Offers - Visit Our Showroom"
- "Exchange Your Old Car Today"
- "Flexible EMI Options Available"

❌ **Avoid**:
- "Buy Toyota Fortuner ₹35 Lakhs"
- "Add to Cart - Toyota Cars"
- "Shop Toyota Models Online"
- Specific on-road prices in ads

---

## 🧪 Testing & Validation

### 1. Rich Results Test
**URL**: https://search.google.com/test/rich-results

**Test Your Site**:
```
https://epictoyota.co.in
```

**Expected Results**:
- ✅ AutomotiveDealer valid
- ✅ LocalBusiness valid
- ✅ FAQPage valid
- ✅ Review valid
- ❌ No Product errors
- ❌ No AggregateOffer warnings

### 2. Schema Markup Validator
**URL**: https://validator.schema.org/

**Paste Structured Data** from:
- `page.tsx` (main dealer schema)
- `StructuredData.tsx` (organization schema)
- `ReviewsStructuredData.tsx` (reviews schema)

**Expected**: 0 errors, 0 warnings

### 3. Mobile-Friendly Test
**URL**: https://search.google.com/test/mobile-friendly

**Expected**: Pass (responsive design)

### 4. PageSpeed Insights
**URL**: https://pagespeed.web.dev/

**Check**:
- Core Web Vitals
- SEO score
- No structured data errors

---

## 📝 Maintenance Checklist

### Monthly Tasks
- [ ] Check Search Console for new issues
- [ ] Update review count in ReviewsStructuredData.tsx
- [ ] Verify all schemas still valid
- [ ] Monitor click-through rates for rich results
- [ ] Update FAQ schema with new questions

### Quarterly Tasks
- [ ] Re-test all schemas with Rich Results Test
- [ ] Update service offerings in makesOffer array
- [ ] Refresh meta descriptions for seasonal offers
- [ ] Analyze which rich results drive most traffic

### When Adding New Content
- [ ] Use service-based language (not product listings)
- [ ] Add FAQ schema for new questions
- [ ] Update breadcrumb schema if new pages added
- [ ] No Product/Offer schemas with prices

---

## 🎓 Key Principles

### 1. **Lead Generation ≠ E-commerce**
- You're generating leads for showroom visits
- Not selling products online with shopping carts
- Structured data should reflect this distinction

### 2. **Service Offers ≠ Product Offers**
- "Test Drive Booking" is a service
- "Buy Toyota Fortuner ₹35L" is a product
- Always frame as services, not products

### 3. **Reviews on Business ≠ Reviews on Products**
- Reviews for Epic Toyota Chennai (business)
- NOT reviews for Toyota Fortuner (product)
- This prevents product feed requirements

### 4. **Informational ≠ Transactional**
- Content is informational (learn about offers)
- NOT transactional (buy now with price)
- Google treats these differently

---

## 🚨 Common Errors & Fixes

### Error: "Missing field 'offers.price'"
**Cause**: Google thinks you're listing products for sale

**Fix**: Remove Product schema, use AutomotiveDealer with service-based makesOffer

### Error: "Review must have itemReviewed"
**Cause**: Review not properly attached to entity

**Fix**: Ensure itemReviewed is AutomotiveDealer, not Product

### Error: "AggregateOffer requires product feed"
**Cause**: Using AggregateOffer on Product schema

**Fix**: Remove Product schema entirely, use service offerings

### Warning: "Price missing in Offer"
**Cause**: Offer schema without price (when attached to Product)

**Fix**: Change Offer to service-based (no price needed)

---

## ✅ Final Checklist Before Submission

- [ ] No Product schemas anywhere in codebase
- [ ] No AggregateOffer schemas
- [ ] No OfferCatalog with product items
- [ ] Reviews attached to AutomotiveDealer only
- [ ] All offers are service-based (category: "Service")
- [ ] ReserveAction for lead generation (not BuyAction)
- [ ] WebPage schema (not ItemPage)
- [ ] Meta description focuses on dealer/showroom, not product sales
- [ ] No itemScope/itemType="Product" in HTML
- [ ] All prices mentioned in text only (not structured data)

---

## 📞 Support Resources

- **Google Search Central**: https://developers.google.com/search
- **Schema.org Automotive**: https://schema.org/AutomotiveDealer
- **Rich Results Guide**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Local Business Guidelines**: https://developers.google.com/search/docs/appearance/structured-data/local-business

---

**Last Updated**: 2025-01-06
**Status**: ✅ Compliant for Google Search Console & Google Ads
**Site Type**: Automotive Dealer Lead Generation (Non-transactional)
