import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUserBio } from '../Utils/UserSlice';

export default function useGetUserBio () {
  const dispatch = useDispatch();
  const Bio = useSelector( ( store ) => store?.user?.userBio );
  const username = useSelector( ( store ) => store?.user?.User );

  const getData = async () => {
    try {
      const result = await axios.post( import.meta.env.VITE_APP_UPDATEBIO ,{ username } );
        const data = result?.data;
        dispatch( addUserBio( data?.bio ) );
    } catch ( error ) {
      console.error( "Error fetching user Bio", error );
    }
  };

  useEffect( () => {
    if ( !Bio && username ) {
      getData();
    }
  }, [ Bio ] );
}
