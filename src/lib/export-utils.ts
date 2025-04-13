
import { Professor } from "@/lib/types";
import { saveAs } from "file-saver";

/**
 * Convert professor data to CSV format
 */
export const convertToCSV = (professors: Professor[]): string => {
  if (professors.length === 0) return "";

  // Define CSV headers
  const headers = [
    "Name",
    "Department",
    "University",
    "Country",
    "Email",
    "Research Interests",
    "Rating",
    "Review Count"
  ];

  // Create CSV content with headers
  let csvContent = headers.join(",") + "\n";

  // Add data rows
  professors.forEach(professor => {
    // Process research interests to handle commas (which would break CSV format)
    const interests = professor.researchInterests 
      ? `"${professor.researchInterests.join("; ")}"`
      : "";
    
    const row = [
      `"${professor.name}"`,
      `"${professor.department}"`,
      `"${professor.university}"`,
      `"${professor.country || ""}"`,
      `"${professor.email}"`,
      interests,
      professor.rating.toString(),
      professor.reviewCount.toString()
    ];
    
    csvContent += row.join(",") + "\n";
  });

  return csvContent;
};

/**
 * Export professors data to CSV file
 */
export const exportToCSV = (professors: Professor[], filename = "professor_search_results"): void => {
  const csvContent = convertToCSV(professors);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${filename}.csv`);
};

/**
 * Export professors data to JSON file
 */
export const exportToJSON = (professors: Professor[], filename = "professor_search_results"): void => {
  // Filter out sensitive or unnecessary data
  const exportData = professors.map(professor => ({
    name: professor.name,
    department: professor.department,
    university: professor.university,
    country: professor.country,
    email: professor.email,
    researchInterests: professor.researchInterests,
    rating: professor.rating,
    reviewCount: professor.reviewCount,
    // Add other fields as needed
  }));
  
  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  saveAs(blob, `${filename}.json`);
};
