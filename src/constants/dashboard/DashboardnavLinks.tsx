import { AdminNavLinks } from './AdminNavLinks'
import { SuperAdminNavLinks } from './SuperAdminNavLinks'
import { UserNavLinks } from './UserNavLinks'

export const dashboardNavLinks = (userRole: 'user' | 'admin' | 'super_admin') => {
  if (userRole === 'user') {
    return UserNavLinks
  } else if (userRole === 'admin') {
    return AdminNavLinks
  } else if (userRole === 'super_admin') {
    return SuperAdminNavLinks
  } else {
    return []
  }
}
