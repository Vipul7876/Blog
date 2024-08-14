import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";

export default function useCheckLogin () {
  const token = localStorage.getItem( 'Token' );

  const dispatch = useDispatch();
  const getData = async () => {

    try {
      const response = await axios.post( import.meta.env.VITE_APP_LOGININFO, {}, {
        headers: {
          Authorization: `${ token }`,
        }
      } );

      const json = await response?.data;
      if ( json?.status == 'success' ) {
        dispatch( addUser( json?.User?.username ) );
      }
      else {
        localStorage.removeItem( 'Token' );
      }
    } catch ( error ) {
      console.warn( 'Not Found' );
    }

  };

  useEffect( () => {
    getData();
  }, [] );
}