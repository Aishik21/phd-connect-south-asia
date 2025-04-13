
// Professor Types
export interface Professor {
  id: string;
  name: string;
  department: string;
  university: string;
  researchInterests: string[];
  email: string;
  phone?: string;
  office?: string;
  website?: string;
  country?: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  publications?: string[];
  crawlTimestamp?: string;
  sourceUrl?: string;
}

export interface ProfessorReview {
  id: string;
  professorId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  university?: string;
  department?: string;
  researchInterests?: string[];
  profilePictureUrl?: string;
  createdAt: string;
}

// Search Types
export interface SearchFilters {
  keyword?: string;
  department?: string;
  university?: string;
  country?: string;
  researchArea?: string;
  minRating?: number;
}

export interface SearchResult {
  professors: Professor[];
  total: number;
  page: number;
  pageSize: number;
}

// Email Types
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdBy: string;
  isDefault: boolean;
  createdAt: string;
}

// Department and University Types
export interface Department {
  id: string;
  name: string;
  universityId: string;
  professorCount: number;
}

export interface University {
  id: string;
  name: string;
  country: string;
  website?: string;
  departmentCount: number;
  professorCount: number;
}

// Data Update Types
export interface DataUpdateLog {
  id: string;
  updateType: 'scheduled' | 'manual';
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed';
  professorsAdded: number;
  professorsUpdated: number;
  error?: string;
}
