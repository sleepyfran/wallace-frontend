import { useLocation } from 'react-router'

/**
 * Returns whether the current location's pathname is empty or not.
 */
export const useEmptyPathname = (basePath: string) => {
  const location = useLocation()

  return location.pathname === basePath
}
