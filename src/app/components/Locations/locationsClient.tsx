'use client';

import React, { useState } from 'react';

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapSrc: string;
}

const locations: LocationData[] = [
  {
    id: 'mount-road',
    name: 'Epic Toyota Mount Road',
    address: 'Mount Road, Chennai, Tamil Nadu',
    phone: '+91 09500007575',
    hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31088.71141219464!2d80.24374316133371!3d13.093550432901699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700025cc4a5%3A0xeff661cda2fcd401!2sEpic%20Toyota%20Mount%20Road!5e0!3m2!1sen!2sin!4v1757063032172!5m2!1sen!2sin'
  },
  {
    id: 'vyasarpadi',
    name: 'Epic Toyota Vyasarpadi',
    address: 'Vyasarpadi, Chennai, Tamil Nadu',
    phone: '+91 09500007575',
    hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31088.71141219464!2d80.24374316133371!3d13.093550432901699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526500127f7cd1%3A0x1983923bf68cca61!2sEpic%20Toyota%20Vyasarpadi!5e0!3m2!1sen!2sin!4v1757063049098!5m2!1sen!2sin'
  }
];

const LocationsClient: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<string>('mount-road');

  const currentLocation = locations.find(loc => loc.id === activeLocation);

  return (
    <div className="bg-white text-black min-h-screen font-manrope">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-black">
            OUR LOCATIONS
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Location Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 border border-gray-200 rounded-lg p-1">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeLocation === location.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {location.name.replace('Epic Toyota ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {currentLocation && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Location Information */}
            <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-2xl flex flex-col" style={{height: '530px'}}>
              <h2 className="text-2xl font-bold mb-8 text-red-600">
                {currentLocation.name}
              </h2>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 text-red-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Address</h3>
                    <p className="text-gray-700">{currentLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 text-red-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Phone</h3>
                    <p className="text-gray-700">{currentLocation.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 text-red-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Hours</h3>
                    <p className="text-gray-700">{currentLocation.hours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 text-red-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Services</h3>
                    <p className="text-gray-700">Sales • Service • Parts • Finance</p>
                  </div>
                </div>

                

            
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/25 transition-all duration-300">
                Get Directions
              </button>
            </div>

            {/* Map Section */}
            <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-2xl flex flex-col" style={{height: '530px'}}>
              <h3 className="text-2xl font-bold text-red-600 mb-8">Find Us</h3>
              <div className="rounded-lg overflow-hidden flex-grow">
                <iframe
                  src={currentLocation.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsClient;