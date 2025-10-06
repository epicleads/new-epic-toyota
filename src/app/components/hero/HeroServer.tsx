// HeroServer.tsx - Debug version
import { Suspense } from 'react';
import HeroClient from './HeroClient';

interface Banner {
  id: number;
  desktop_banner_url: string;
  mobile_banner_url: string;
  banner_url?: string;
  cta_text: string;
  cta_link: string;
  end_date: string;
  status: boolean;
  created_at: string;
}

interface ApiResponse {
  ok: boolean;
  data: Banner | null;
  error?: string;
}

async function getActiveBanner(): Promise<Banner | null> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://raam-group-all-websites.onrender.com';
    const url = `${API_BASE}/admin/epic-toyota/campaign-banners/active`;
    
    const response = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch active banner:', response.status, response.statusText);
      return null;
    }

    const result: ApiResponse = await response.json();
    
    if (!result.ok || !result.data) {
      return null;
    }

    // Handle both single banner (from /active endpoint) and array (from list endpoint)
    let banner;
    if (Array.isArray(result.data)) {
      // Filter for active, non-expired banners
      const now = new Date();
      const activeBanners = result.data.filter(b => {
        const isActive = b.status === true;
        const isNotExpired = new Date(b.end_date) > now;
        return isActive && isNotExpired;
      });
      banner = activeBanners.length > 0 ? activeBanners[0] : null;
      if (!banner) {
        return null;
      }
    } else {
      banner = result.data;
    }
    
    // Validate banner
    const now = new Date();
    const endDate = new Date(banner.end_date);
    
    const isActive = banner.status === true;
    const isNotExpired = endDate > now;
    const hasValidUrls = (banner.desktop_banner_url || banner.banner_url) && 
                        (banner.mobile_banner_url || banner.banner_url);
    
    if (isActive && isNotExpired && hasValidUrls) {
      return banner;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching active banner:', error);
    return null;
  }
}

export default async function HeroServer() {
  const activeBanner = await getActiveBanner();
  
  // Default banner configuration
  const defaultBanner = {
    desktop_image: '/assets/epictoyotahero.jpg',
    mobile_image: '/assets/epictoyotahero.jpg',
    cta_text: 'Book Now',
    cta_link: '/vehicles',
    
  };

  // Prepare banner data for client component
  const bannerData = activeBanner ? {
    desktop_image: activeBanner.desktop_banner_url || activeBanner.banner_url || defaultBanner.desktop_image,
    mobile_image: activeBanner.mobile_banner_url || activeBanner.banner_url || defaultBanner.mobile_image,
    cta_text: activeBanner.cta_text,
    cta_link: activeBanner.cta_link,
    isFromBackend: true,
  } : {
    desktop_image: defaultBanner.desktop_image,
    mobile_image: defaultBanner.mobile_image,
    cta_text: defaultBanner.cta_text,
    cta_link: defaultBanner.cta_link,
    isFromBackend: false,
  };


  return (
    <>
      
      
      {/* SEO Meta tags - Server-side rendered */}
      <div className="sr-only">
        <h1>
          {activeBanner ? activeBanner.cta_text : 'Epic Toyota - Premium Vehicles'}
        </h1>
        <p>
          {activeBanner 
            ? `Limited time offer: ${activeBanner.cta_text}. Visit Epic Toyota for exclusive deals.`
            : 'Discover Toyota\'s premium collection of vehicles. Experience innovation, reliability, and style with Epic Toyota.'
          }
        </p>
        {activeBanner && (
          <span>Valid until: {new Date(activeBanner.end_date).toLocaleDateString()}</span>
        )}
      </div>
      
      {/* Client-side Interactive Hero */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroClient bannerData={bannerData} />
      </Suspense>
    </>
  );
}

// Loading skeleton for hero section
function HeroSkeleton() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse">
      <div className="absolute inset-0 bg-gray-800/50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-700 rounded-lg w-96 mx-auto"></div>
          <div className="h-6 bg-gray-700 rounded-lg w-64 mx-auto"></div>
          <div className="h-12 bg-gray-700 rounded-lg w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}