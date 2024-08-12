import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from '../../Utils/UserSlice';
import axios from "axios";
import { FadeLoader } from "react-spinners";

export default function Login () {

  const [ showSpinner, setShowspinner ] = useState( false );
  const [ color, setColor ] = useState( '#9b7ee5' );
  const [ err, setErr ] = useState( null );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pass = useRef( null );
  const name = useRef( null );



  const handlesubmit = async ( e ) => {
    e.preventDefault();
    setShowspinner( ( prev ) => !prev );

    const username = name?.current?.value;
    const password = pass?.current?.value;
    try {
      const result = await axios.post( import.meta.env.VITE_APP_ADMINLOGIN, { username, password } );
      const data = await result?.data;
      if ( data?.status == 'success' ) {
        setShowspinner( ( prev ) => !prev );
        dispatch( addAdmin( name?.current?.value ) );
        navigate( '/' );
      } else {
        setShowspinner( ( prev ) => !prev );
      }
    } catch ( error ) {
      setShowspinner( ( prev ) => !prev );
      setErr( error );
    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ ` w-[85%] md:w-1/3 2xl:w-3/12 p-6 md:p-12 bg-[#9b7ee5]  mx-auto right-0 left-0 rounded-lg flex flex-col gap-5 md:gap-10 font-ubuntu my-28 md:my-40 ` }>
      <h1
        className="text-lg md:text-3xl font-bold">{ 'Log In' }</h1>
      <input
        type='text'
        placeholder={ `Username` }
        ref={ name }
        className='p-2 md:p-3 text-sm md:text-base outline-none' />
      <input
        type='password'
        placeholder='Password'
        ref={ pass }
        className='p-2 md:p-3 text-sm md:text-base outline-none' />
      { err ?
        <p
          className="text-red-500">{ 'Error :' + err }</p> : '' }
      {!showSpinner ? <button
        className=' bg-white py-2 md:py-3 font-medium text-sm md:text-lg'
        type='submit' >
        Admin Log In
      </button> : <button
        className='bg-white py-2 md:py-3 pointer-events-none flex justify-center' >
        <FadeLoader
          className="ml-4 md:ml-0 mt-3 -mb-3 md:-mb-2"
          height={ 6 }
          margin={ -11 }
          radius={ 1 }
          width={ 2 }
          color={ color } />
      </button>}
      <div className='flex flex-col gap-6'>
        <p className="text-xs md:text-base text-center hover:underline cursor-pointer">Forgot Password?</p>
      </div>
    </form>
  );
}
