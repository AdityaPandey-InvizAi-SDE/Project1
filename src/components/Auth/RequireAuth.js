import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()
  const user = localStorage.getItem("Users")
//   console.warn(auth)
  if (!user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children
}