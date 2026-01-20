import { NextRequest, NextResponse } from 'next/server';

// Backend API URL - set via environment variable BACKEND_API_URL
const API_BASE_URL = process.env.BACKEND_API_URL;

if (!API_BASE_URL) {
  throw new Error('BACKEND_API_URL environment variable is not set. Please add it to your .env.local file.');
}

// Cache duration: 10 minutes for developers list
const CACHE_DURATION = 600; // 10 minutes

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

function getCacheKey(page: string, limit: string, minProjects?: string): string {
  return `developers:${page}:${limit}:${minProjects || 'none'}`;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    const minProjects = searchParams.get('min_projects');

    // Check cache
    const cacheKey = getCacheKey(page, limit, minProjects || undefined);
    const cached = cache.get(cacheKey);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION * 1000) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          'X-Cache': 'HIT',
        },
      });
    }

    // Build the URL with query parameters
    const baseUrl = API_BASE_URL!.endsWith('/') ? API_BASE_URL!.slice(0, -1) : API_BASE_URL!;
    const url = new URL(`${baseUrl}/developers`);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    if (minProjects) {
      url.searchParams.append('min_projects', minProjects);
    }

    // Log request for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('=== Developers API Proxy Request ===');
      console.log('URL:', url.toString());
    }

    // Forward the request to the backend API
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    // Log response for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('=== Developers API Proxy Response ===');
      console.log('Status:', response.status);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: `API error: ${response.status} ${response.statusText}`,
          data: [],
          error: errorText 
        },
        { 
          status: response.status,
          headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const data = await response.json();
    
    // Store in cache
    cache.set(cacheKey, {
      data,
      timestamp: now,
    });

    // Clean up old cache entries (keep last 50 entries)
    if (cache.size > 50) {
      const entries = Array.from(cache.entries());
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      cache.clear();
      entries.slice(0, 50).forEach(([key, value]) => cache.set(key, value));
    }

    // Return response with caching headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error in developers API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch developers',
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
