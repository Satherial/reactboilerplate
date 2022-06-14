import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks'

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: {
  children: any
  redirectPath?: string
}) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
