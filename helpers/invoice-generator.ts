/**
 * Generates a unique invoice number for conference registrations
 * Format: ICS-YYYYMMDD-###
 *
 * @returns A unique invoice number string
 */
export function generateInvoiceNumber(): string {
  const now = new Date();

  // Format date as YYYYMMDD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}${month}${day}`;

  // Generate a random 3-digit number for uniqueness
  // In production, this would come from a database sequence
  const randomSuffix = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

  return `ICS-${dateString}-${randomSuffix}`;
}

/**
 * Formats a date as a string for invoice display
 * Format: DD Month YYYY (e.g., "15 January 2025")
 *
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatInvoiceDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
