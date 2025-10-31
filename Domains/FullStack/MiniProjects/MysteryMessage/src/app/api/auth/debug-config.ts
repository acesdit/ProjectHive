/**
 * Configuration to control NextAuth debug features
 * Setting debug to false completely prevents the _log API calls
 */
export const debugConfig = {
  // Disable debug in all environments to prevent 405 errors with _log endpoint
  debug: false,
  
  // Custom logger that minimizes logging
  logger: {
    error: (code: string, metadata: any) => {
      console.error("NextAuth error:", code, metadata);
    },
    warn: (code: string) => {
      console.warn("NextAuth warning:", code);
    },
    debug: () => {
      // No debug logging at all to prevent _log API calls
    },
  }
}; 