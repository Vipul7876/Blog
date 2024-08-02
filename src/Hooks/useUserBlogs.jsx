import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUserblogs } from '../Utils/BlogSlice';
import { useEffect } from 'react';

export default function useUserBlogs () {
  const dispatch = useDispatch();
  const data = useSelector( ( store ) => store?.blogs?.userBlogs );
  const username = useSelector( ( store ) => store?.user?.User );

  const getData = async () => {
    try {
      if ( username ) {
        const result = await axios.get( import.meta.env.VITE_APP_ADDBLOG + `/${ username }` );
        const data = result?.data;
        dispatch( addUserblogs( data ) );
      }
    } catch ( error ) {
      console.error( "Error fetching user blogs:", error );
    }
  };

  useEffect( () => {
    if ( !data && username ) {
      getData();
    }
  }, [ data ] );
}
