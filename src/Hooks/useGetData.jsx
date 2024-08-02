import { useDispatch, useSelector } from 'react-redux';
import { addBlogs } from '../Utils/BlogSlice';
import { useEffect } from 'react';
import axios from 'axios';

export default async function useGetData () {

  const dispatch = useDispatch();
  const data = useSelector( ( store ) => store?.blogs?.allBlogs );

  const getData = async () => {

    const response = await axios.get( import.meta.env.VITE_APP_GETDATA );
    const json = await response.data;
    dispatch( addBlogs( json ) );
  };

  useEffect( () => {
    !data && getData();
  }, [data] );
}
