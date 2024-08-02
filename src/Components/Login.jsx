import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, validate, Signup } from '../Utils/constants';
import { addUser } from '../Utils/UserSlice';

export default function Login () {

  const [ signup, setSignup ] = useState( false );
  const [ err, setErr ] = useState( null );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const password = useRef( null );
  const confPassword = useRef( null );
  const name = useRef( null );

  const handlesubmit = async ( e ) => {
    e.preventDefault();
    const msg = validate( name?.current?.value, password?.current?.value, confPassword?.current?.value );
    setErr( msg );
    if ( msg ) return;

    if ( signup ) {
      const data = await Signup( name?.current?.value, password?.current?.value );
      if ( data?.status == 'success' ) {
        dispatch( addUser( name?.current?.value ) );
        navigate( '/' );
      }
    }
    else {
      const data = await login( name?.current?.value, password?.current?.value );
      if ( data?.status == 'success' ) {
        dispatch( addUser( name?.current?.value ) );
        navigate( '/' );
      }

    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ ` w-full md:w-3/12 absolute p-12 bg-gray-600  mx-auto right-0 left-0 rounded-lg bg-opacity-80 flex flex-col gap-10 ${ signup ? 'my-14' : 'my-36' }` }>
      <h1
        className="text-3xl font-bold">{ signup ? 'Sign Up' : 'Log In' }</h1>
      <input
        type='text'
        placeholder={ `Username` }
        ref={ name }
        className='p-3 outline-none' />
      <input
        type='password'
        placeholder='Password'
        ref={ password }
        className='p-3 outline-none' />
      { signup ?
        <input
          className='p-3 outline-none'
          type='password'
          placeholder='Confirm Password'
          ref={ confPassword }
        />
        : '' }
      { err ?
        <p
          className="text-red-500">{ 'Error :' + err }</p> : '' }
      <button
        className=' bg-gray-300 py-3 font-medium text-lg'
        type='submit' >
        { signup ? 'Sign up' : 'Log In' }
      </button>
      <div className='flex flex-col gap-6'>
        <p className=" text-center hover:underline cursor-pointer">Forgot Password?</p>
        <p className="" >{ signup ? 'Already have an account ?' : 'New to Blog?' } <span
          className="font-semibold hover:underline cursor-pointer"
          onClick={ () => setSignup( !signup ) }
        >
          { signup ? 'Log In' : 'Sign up now.' }
        </span>
        </p>
      </div>
    </form>
  );
}
