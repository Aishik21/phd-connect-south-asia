
import { saveAs } from 'file-saver';
import { Professor } from '@/lib/types';

export const exportToCSV = (data: Professor[]) => {
  if (!data || data.length === 0) return;

  // Define the columns for the CSV
  const csvHeaders = ['Name', 'Department', 'University', 'Email', 'Research Interests', 'Rating', 'Reviews', 'Country'];
  
  // Format the data
  const csvRows = data.map(professor => [
    professor.name,
    professor.department,
    professor.university,
    professor.email,
    professor.researchInterests.join('; '),
    professor.rating.toString(),
    professor.reviewCount.toString(),
    professor.country || ''
  ]);

  // Combine headers and rows
  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const filename = `professors_export_${new Date().toISOString().slice(0, 10)}.csv`;
  saveAs(blob, filename);
};

export const exportToJSON = (data: Professor[]) => {
  if (!data || data.length === 0) return;
  
  // Create a formatted JSON string
  const jsonContent = JSON.stringify(data, null, 2);
  
  // Create and download the file
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const filename = `professors_export_${new Date().toISOString().slice(0, 10)}.json`;
  saveAs(blob, filename);
};
