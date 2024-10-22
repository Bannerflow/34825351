/**
 * used for route paths that maps a string (key) to a route path
 * that increases reusability and avoid bugs
 */
export type RoutePaths = Record<string, string | ((...args: any) => string)>;
