// @ts-nocheck

import {Navigate} from 'react-router-dom'


function PrivateRoute({element}) {
  const access_token = localStorage.getItem('access_token')
  return access_token? element: <Navigate to='/login'/>
}

export default PrivateRoute
