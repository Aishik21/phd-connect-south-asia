
/**
 * This file contains utility functions for integrating with the Python scraper.
 * In a production environment, these functions would interact with a backend API
 * that runs the scraper and manages the database.
 */

import { Professor, DataUpdateLog } from './types';

/**
 * Import professor data from the Python scraper output file
 * @param jsonData JSON string or object containing professor data
 * @returns Array of formatted professor objects
 */
export function importProfessorData(jsonData: string | object): Professor[] {
  const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  
  // Map the scraper's JSON format to our Professor type
  return Array.isArray(data) ? data.map(transformProfessorData) : [];
}

/**
 * Transform raw professor data from scraper to our app's format
 */
function transformProfessorData(raw: any): Professor {
  // Generate a unique ID if none exists
  const id = raw.id || generateUniqueId();
  
  // Extract research interests from string or array
  let researchInterests: string[] = [];
  if (raw.research_interests) {
    if (typeof raw.research_interests === 'string') {
      researchInterests = raw.research_interests
        .split(',')
        .map((interest: string) => interest.trim())
        .filter(Boolean);
    } else if (Array.isArray(raw.research_interests)) {
      researchInterests = raw.research_interests
        .map((interest: any) => String(interest).trim())
        .filter(Boolean);
    }
  }
  
  // Extract publications
  let publications: string[] = [];
  if (raw.publications) {
    if (typeof raw.publications === 'string') {
      publications = raw.publications
        .split('\n')
        .map((pub: string) => pub.trim())
        .filter(Boolean);
    } else if (Array.isArray(raw.publications)) {
      publications = raw.publications
        .map((pub: any) => String(pub).trim())
        .filter(Boolean);
    }
  }
  
  // Transform to our app's format
  return {
    id,
    name: raw.name || 'Unknown Professor',
    department: raw.department || 'N/A',
    university: raw.university || 'N/A',
    researchInterests,
    email: raw.email || 'N/A',
    phone: raw.phone || undefined,
    office: raw.office || undefined,
    website: raw.website || undefined,
    country: raw.country || undefined,
    rating: 0, // Default rating starts at 0 until reviews are added
    reviewCount: 0,
    publications,
    crawlTimestamp: raw.crawl_timestamp || new Date().toISOString(),
    sourceUrl: raw.source_url || undefined,
  };
}

/**
 * Generate a unique ID for a professor
 */
function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Mock function to simulate scheduling a scraper run
 * In production, this would call a backend API endpoint
 */
export async function scheduleScraper(
  targetUrls: string[],
  options?: { 
    refreshAll?: boolean, 
    departmentIds?: string[] 
  }
): Promise<DataUpdateLog> {
  // This would make an API call to the backend in production
  console.log('Scheduling scraper run for:', targetUrls, 'with options:', options);
  
  // Simulate API response
  return {
    id: generateUniqueId(),
    updateType: 'scheduled',
    startTime: new Date().toISOString(),
    status: 'running',
    professorsAdded: 0,
    professorsUpdated: 0,
  };
}

/**
 * Mock function to check the status of a scraper run
 */
export async function checkScraperStatus(updateId: string): Promise<DataUpdateLog> {
  // This would make an API call to the backend in production
  console.log('Checking status of scraper run:', updateId);
  
  // Simulate API response
  return {
    id: updateId,
    updateType: 'scheduled',
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    endTime: new Date().toISOString(),
    status: 'completed',
    professorsAdded: 125,
    professorsUpdated: 42,
  };
}
