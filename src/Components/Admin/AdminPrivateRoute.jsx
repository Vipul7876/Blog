/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ( { element } ) => {
  const isAdmin= useSelector( state => state?.user?.isAdmin );

  return isAdmin ? element : <Navigate to="/" />;
};

export default PrivateRoute;