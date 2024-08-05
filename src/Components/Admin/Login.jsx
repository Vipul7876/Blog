import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from '../../Utils/UserSlice';
import axios from "axios";

export default function Login () {

  const [ err, setErr ] = useState( null );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pass = useRef( null );
  const name = useRef( null );

  

  const handlesubmit = async ( e ) => {
    e.preventDefault();

    const username = name?.current?.value;
    const password = pass?.current?.value;

    const result = await axios.post( import.meta.env.VITE_APP_ADMINLOGIN, { username, password } );
    const data = await result?.data;
    if ( data?.status == 'success' ) {
      dispatch( addAdmin( name?.current?.value ) );
      navigate( '/' );
    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ ` w-full md:w-3/12 p-12 bg-[#9b7ee5]  mx-auto right-0 left-0 rounded-lg flex flex-col gap-10 font-ubuntu ${ 'my-40' }` }>
      <h1
        className="text-3xl font-bold">{ 'Log In' }</h1>
      <input
        type='text'
        placeholder={ `Username` }
        ref={ name }
        className='p-3 outline-none' />
      <input
        type='password'
        placeholder='Password'
        ref={ pass }
        className='p-3 outline-none' />
      { err ?
        <p
          className="text-red-500">{ 'Error :' + err }</p> : '' }
      <button
        className=' bg-white py-3 font-medium text-lg'
        type='submit' >
        Admin Log In
      </button>
      <div className='flex flex-col gap-6'>
        <p className=" text-center hover:underline cursor-pointer">Forgot Password?</p>
      </div>
    </form>
  );
}
