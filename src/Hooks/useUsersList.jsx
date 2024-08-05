import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../Utils/AdminSlice';
import { useEffect } from 'react';
import axios from 'axios';

export default function useUserBlogs () {
  const dispatch = useDispatch();
  const data = useSelector( ( store ) => store?.admin?.allUsers );
  const isAdmin = useSelector( ( store ) => store?.user?.isAdmin );

  const getData = async () => {
    try {
      if ( isAdmin ) {
        const result = await axios.get( import.meta.env.VITE_APP_USERSLIST );
        const data = result?.data;
        dispatch( addUsers( data ) );
      }
    } catch ( error ) {
      console.error( "Error fetching user blogs:", error );
    }
  };

  useEffect( () => {
    if ( !data && isAdmin ) {
      getData();
    }
  }, [ data ] );
}