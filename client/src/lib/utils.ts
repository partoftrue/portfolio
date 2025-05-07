import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string using date-fns format
 * @param dateString ISO date string
 * @param formatStr format string (default: 'PP')
 * @returns formatted date string
 */
export function formatDate(dateString: string, formatStr = 'PP'): string {
  try {
    return format(parseISO(dateString), formatStr)
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param text Text to truncate
 * @param maxLength Maximum length before truncating
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
