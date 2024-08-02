/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ( { element } ) => {
  const isLoggedIn = useSelector( state => state?.user?.isLoggedIn );

  return isLoggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoute;