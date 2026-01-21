"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { geocodeRegion } from "@/utils/geocodeRegion";
import { formatPrice } from "@/utils/formatPrice";
import { getDeveloperIdByName, fetchDevelopersMapping } from "@/utils/developerMapping";

const MultiPropertyMap = dynamic(() => import("@/components/MultiPropertyMap"), {
  ssr: false,
});

const PropertyInfoPanel = dynamic(() => import("@/components/PropertyInfoPanel"), {
  ssr: false,
});

interface Property {
  propertyId: number; // Numeric ID for compatibility with MultiPropertyMap
  id?: string; // UUID from API (for navigation)
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  images: string[];
  developer?: string;
  propertyType?: string[];
  description?: string;
  latitude?: number;
  longitude?: number;
}

interface APIProject {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
  min_price?: number;
  max_price?: number;
  address: string;
  city: string;
  type: string[];
  category: string;
  project_name: string;
  min_bedrooms?: string;
  max_bedrooms?: string;
  min_bathrooms?: string;
  max_bathrooms?: string;
  latitude?: number;
  longitude?: number;
  developer?: {
    company?: {
      name?: string;
    };
  };
}

interface HotspotSearchRequestBody {
  prioritize_brokerage_id: string;
  category: string;
  include_developer: boolean;
  type?: string;
  min_bedrooms?: string[];
  min_price?: number;
  max_price?: number;
  developer_id?: string; // Use developer_id instead of search
  search?: string; // For developer name search (fallback)
}

// Helper function to convert bedroom enum to number
const bedroomEnumToNumber = (bedroomEnum?: string): number => {
  const enumMap: { [key: string]: number } = {
    "Studio": 0,
    "One": 1,
    "Two": 2,
    "Three": 3,
    "Four": 4,
    "Four_Plus": 5,
    "Five": 5,
    "Six": 6,
    "Seven": 7,
  };
  return bedroomEnum ? enumMap[bedroomEnum] || 0 : 0;
};

// Helper function to convert bathroom enum to number
const bathroomEnumToNumber = (bathroomEnum?: string): number => {
  const enumMap: { [key: string]: number } = {
    "One": 1,
    "Two": 2,
    "Three_Plus": 3,
  };
  return bathroomEnum ? enumMap[bathroomEnum] || 0 : 0;
};

interface HotspotsProps {
  title?: string;
  showTitle?: boolean;
  showFilters?: boolean;
  filterOptions?: string[];
  className?: string;
  developerFilters?: string[];
  showDeveloperFilters?: boolean;
  selectedDeveloper?: string;
  onDeveloperChange?: (developer: string) => void;
}

export default function Hotspots({ 
  title = "Choose from Top Developers",
  showTitle = true,
  showFilters = true,
  filterOptions = ["All", "Villa", "2 BHK", "3 BHK", "1 BHK"],
  className = "",
  developerFilters = ["All", "EMAAR", "DAMAC", "SOBHA", "MERAAS", "AZIZI", "NAKHEEL"],
  showDeveloperFilters = false,
  selectedDeveloper: externalSelectedDeveloper,
  onDeveloperChange
}: HotspotsProps = {}) {
  const [propertyType, setPropertyType] = useState("All");
  const [internalSelectedDeveloper, setInternalSelectedDeveloper] = useState("All");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [developerMapping, setDeveloperMapping] = useState<Map<string, string>>(new Map());
  
  // Use external developer if provided, otherwise use internal state
  const selectedDeveloper = externalSelectedDeveloper !== undefined ? externalSelectedDeveloper : internalSelectedDeveloper;
  
  const handleDeveloperChange = (developer: string) => {
    if (onDeveloperChange) {
      onDeveloperChange(developer);
    } else {
      setInternalSelectedDeveloper(developer);
    }
  };

  // Fetch developer mapping on mount
  useEffect(() => {
    fetchDevelopersMapping().then(setDeveloperMapping);
  }, []);

  // Property type mapping
  const propertyTypeMap: { [key: string]: string | undefined } = {
    "All": undefined,
    "Villa": "Villa",
    "Apartment": "Apartment",
    "Townhouse": "Townhouse",
    "Duplex": "Duplex",
    "Penthouse": "Penthouse",
    "2 BHK": undefined, // Filter by bedroom count instead
    "3 BHK": undefined, // Filter by bedroom count instead
    "1 BHK": undefined, // Filter by bedroom count instead
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Use the API route that proxies to the backend
        const baseUrl = "/api/projects";

        // Build request body for new API
        const requestBody: HotspotSearchRequestBody = {
          // Always prioritize brokerage_id projects first
          prioritize_brokerage_id: "cc3e22bb-5ee1-443a-a4b0-47c33f0d9040",
          // Market type is always offPlan for hotspots
          category: "Off_plan",
          // Include developer information
          include_developer: true,
        };

        // Note: Property type filter removed due to backend Prisma bug
        // Property type filters are kept for UI but don't filter server-side

        // Handle BHK types - filter by bedroom count using enum
        if (propertyType === "1 BHK") {
          requestBody.min_bedrooms = ["One"];
        } else if (propertyType === "2 BHK") {
          requestBody.min_bedrooms = ["Two"];
        } else if (propertyType === "3 BHK") {
          requestBody.min_bedrooms = ["Three"];
        }

        // Use developer_id for filtering if developer is selected
        if (selectedDeveloper && selectedDeveloper !== "All") {
          // Try to get developer ID from mapping
          const developerId = developerMapping.get(selectedDeveloper.toUpperCase()) || 
                             getDeveloperIdByName(selectedDeveloper);
          
          if (developerId) {
            requestBody.developer_id = developerId;
            console.log(`Using developer_id filter: ${developerId} for "${selectedDeveloper}"`);
          } else {
            // Fallback to search if ID not found
            console.warn(`Developer ID not found for "${selectedDeveloper}", falling back to search`);
            requestBody.search = selectedDeveloper;
          }
        }

        // Build query parameters for pagination
        const queryParams = new URLSearchParams();
        queryParams.append("page", "1");
        queryParams.append("limit", "100"); // API max is 100

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;

        console.log(`Fetching ${propertyType} properties:`, requestBody);

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `API error: ${res.status} ${res.statusText}`;
          console.error('API request failed:', errorMessage);
          throw new Error(errorMessage);
        }

        const data = await res.json();
        
        // Handle API response structure according to Postman collection
        // Response can be: { data: [...], pagination: {...} } or { success: false, data: [], message: "..." }
        let records: APIProject[] = [];
        
        if (data.success === false) {
          console.error('API returned error:', data.message || data.error);
          setProperties([]);
          setIsLoading(false);
          return;
        }
        
        // Extract data array from response
        if (Array.isArray(data.data)) {
          records = data.data;
        } else if (Array.isArray(data)) {
          // Fallback: if response is directly an array
          records = data;
        }

        console.log(`API returned ${records.length} properties`, {
          total: data.pagination?.total || records.length,
          page: data.pagination?.page || 1,
          totalPages: data.pagination?.totalPages || 1,
          searchTerm: selectedDeveloper && selectedDeveloper !== "All" ? selectedDeveloper : "none"
        });
        
        // Log unique developer names in response for debugging
        if (records.length > 0) {
          const uniqueDevelopers = [...new Set(
            records
              .map((r: APIProject) => {
                if (typeof r.developer === 'string') return r.developer;
                if (r.developer?.company?.name) return r.developer.company.name;
                if ((r.developer as any)?.name) return (r.developer as any).name;
                if ((r as any).developer_name) return (r as any).developer_name;
                return null;
              })
              .filter(Boolean)
          )];
          console.log(`Unique developers in API response (${uniqueDevelopers.length}):`, uniqueDevelopers.slice(0, 15));
        }

        // Map API response to Property format
        let mappedProperties: Property[] = records.map((item: APIProject, index: number) => {
          // Generate a numeric propertyId from UUID for compatibility
          // Use a better hash function to reduce collisions
          const uuidHash = item.id
            .replace(/-/g, "")
            .split("")
            .reduce((acc, char, idx) => acc + (char.charCodeAt(0) * (idx + 1)), 0);
          // Combine with index to ensure uniqueness even if hash collides
          const numericId = (uuidHash + index) % 1000000;

          const bedrooms = bedroomEnumToNumber(item.min_bedrooms || item.max_bedrooms);
          const bathrooms = bathroomEnumToNumber(item.min_bathrooms || item.max_bathrooms);

          // Extract developer name from multiple possible structures
          let developerName: string | undefined = undefined;
          if (item.developer) {
            if (typeof item.developer === 'string') {
              developerName = item.developer;
            } else if (item.developer.company?.name) {
              developerName = item.developer.company.name;
            } else if ((item.developer as any).name) {
              developerName = (item.developer as any).name;
            }
          }
          // Also check for developer_name field directly on item
          if (!developerName && (item as any).developer_name) {
            developerName = (item as any).developer_name;
          }

          return {
            propertyId: numericId, // Keep numeric for compatibility
            id: item.id, // Store UUID
            title: item.title || item.project_name || "Untitled Property",
            description: item.description || "",
            location: item.city || item.address || "N/A",
            bedrooms,
            bathrooms,
            price: item.min_price || item.max_price || 0,
            images: item.image_urls || [],
            developer: developerName,
            propertyType: item.type || [],
            latitude: item.latitude,
            longitude: item.longitude,
          };
        });

        // Filter out properties with "sartawi properties" in description
        mappedProperties = mappedProperties.filter((property: Property) => {
          const description = property.description?.toLowerCase() || '';
          const hasSartawi = description.includes('sartawi properties');
          if (hasSartawi) {
            console.log(`Filtered out: ${property.title} - contains 'sartawi properties'`);
          }
          return !hasSartawi;
        });

        // For BHK types, ensure we filter by exact bedroom count
        if (propertyType === "1 BHK") {
          mappedProperties = mappedProperties.filter((p) => p.bedrooms === 1);
        } else if (propertyType === "2 BHK") {
          mappedProperties = mappedProperties.filter((p) => p.bedrooms === 2);
        } else if (propertyType === "3 BHK") {
          mappedProperties = mappedProperties.filter((p) => p.bedrooms === 3);
        }

        // Note: Developer filtering is now done server-side using developer_id
        // No need for client-side filtering when developer_id is used
        // Only filter client-side if we had to fall back to search parameter
        if (selectedDeveloper && selectedDeveloper !== "All" && !requestBody.developer_id) {
          // Fallback: client-side filtering when developer_id is not available
          const beforeFilter = mappedProperties.length;
          const searchTerm = selectedDeveloper.toUpperCase().trim();
          
          mappedProperties = mappedProperties.filter((p) => {
            const developerName = (p.developer || "").toUpperCase().trim();
            if (!developerName) return false;
            return developerName.includes(searchTerm) || developerName.startsWith(searchTerm);
          });
          
          console.log(`Developer filter (fallback) "${selectedDeveloper}": ${beforeFilter} -> ${mappedProperties.length} properties`);
        }

        console.log(`After filtering: ${mappedProperties.length} properties remain for ${propertyType}${selectedDeveloper && selectedDeveloper !== "All" ? ` and ${selectedDeveloper}` : ""}`);

        // Show all properties
        setProperties(mappedProperties);
        // Reset selected property when filter changes
        setSelectedProperty(null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
        // Optionally show user-friendly error message
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [propertyType, selectedDeveloper, developerMapping]);

  // Geocode properties to get coordinates
  useEffect(() => {
    const geocodeProperties = async () => {
      const updatedProperties = await Promise.all(
        properties.map(async (property) => {
          // If property already has coordinates, return as is
          if (property.latitude && property.longitude) {
            return property;
          }

          // Try to geocode the location
          const coords = await geocodeRegion(property.location);
          if (coords) {
            return {
              ...property,
              latitude: coords.lat,
              longitude: coords.lon,
            };
          }

          return property;
        })
      );

      // Only update if coordinates were added
      if (JSON.stringify(updatedProperties) !== JSON.stringify(properties)) {
        setProperties(updatedProperties);
      }
    };

    if (properties.length > 0) {
      geocodeProperties();
    }
  }, [properties.length]); // Only run when properties count changes to avoid infinite loops

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleClosePanel = () => {
    setSelectedProperty(null);
  };

  // Check if we're in a dark background context
  const isDarkBackground = className.includes('bg-transparent') || className.includes('bg-[#1a1a1a]');
  const hasCustomPadding = className.includes('px-0') || className.includes('py-0');
  
  // Extract border radius from className if present
  const borderRadiusClass = className.includes('rounded-') 
    ? className.match(/rounded-\[?[\w-]+\]?/)?.[0] || 'rounded-2xl'
    : 'rounded-2xl';
  
  return (
    <section className={`${isDarkBackground ? 'bg-transparent' : 'bg-white'} ${hasCustomPadding ? '' : 'px-6 md:px-12 lg:px-20 py-20'} ${className}`}>
      {/* Title */}
      {showTitle && (
        <h2 className={`text-center text-2xl md:text-4xl font-display font-medium ${isDarkBackground ? 'text-white' : 'text-secondary'} mb-6`}>
          {title}
        </h2>
      )}

      {/* Developer Filter Buttons */}
      {showDeveloperFilters && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {developerFilters.map((developer) => (
            <button
              key={developer}
              onClick={() => {
                console.log(`Developer filter clicked: ${developer}`);
                handleDeveloperChange(developer);
              }}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedDeveloper === developer
                  ? isDarkBackground
                    ? "bg-white text-black border border-white"
                    : "bg-[#C5A365] text-white shadow-md"
                  : isDarkBackground
                  ? "bg-transparent text-gray-400 border border-white/20 hover:border-white hover:text-white hover:bg-white/10"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#C5A365] hover:text-[#C5A365] hover:shadow-md"
              }`}
            >
              {developer}
            </button>
          ))}
        </div>
      )}

      {/* Property Type Filter Buttons */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
          {filterOptions.map((type) => (
            <button
              key={type}
              onClick={() => setPropertyType(type)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all ${
                propertyType === type
                  ? "bg-[#C5A365] text-white shadow-md"
                  : isDarkBackground
                  ? "bg-white/10 text-white border border-white/20 hover:border-[#C5A365] hover:text-[#C5A365]"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#C5A365] hover:text-[#C5A365]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Full Width Map with Side Panel */}
      <div className={`relative w-full ${borderRadiusClass} overflow-hidden`} style={{ height: "600px" }}>
        {isLoading ? (
          <div className={`flex items-center justify-center ${isDarkBackground ? 'bg-gray-800' : 'bg-gray-100'} ${borderRadiusClass} h-full`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A365]"></div>
          </div>
        ) : (
          <>
            <MultiPropertyMap
              properties={properties}
              height="600px"
              onMarkerClick={handleMarkerClick}
              selectedPropertyId={selectedProperty?.propertyId}
            />
            {selectedProperty && (
              <PropertyInfoPanel
                property={selectedProperty}
                onClose={handleClosePanel}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
