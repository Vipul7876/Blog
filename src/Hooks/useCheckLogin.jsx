import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/UserSlice";

export default async function useCheckLogin () {
  const token = localStorage.getItem( 'Token' );

  const dispatch = useDispatch();
  const username = useSelector( ( store ) => store?.user?.User );
  const getData = async () => {

    const response = await axios.post( import.meta.env.VITE_APP_LOGININFO, {}, {
      headers: {
        Authorization: `${ token }`,
      }
    } );
    const json = await response.data;

    dispatch( addUser( json?.User?.username ) );
  };

  useEffect( () => {
    getData();
  }, [] );
}