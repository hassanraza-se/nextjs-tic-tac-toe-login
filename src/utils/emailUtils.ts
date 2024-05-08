/**
 * Checks if a string is a valid email address
 * @param {string} email - The email address to check
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Normalizes an email address (e.g., lowercasing, trimming)
 * @param {string} email - The email address to normalize
 * @returns {string} - The normalized email address
 */
export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}