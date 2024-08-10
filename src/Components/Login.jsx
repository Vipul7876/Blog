import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, validate, Signup } from '../Utils/constants';
import { addUser, addUserBio, removeAdmin } from '../Utils/UserSlice';
import { FadeLoader } from 'react-spinners';

export default function Login () {

  const [ signup, setSignup ] = useState( false );
  const [ err, setErr ] = useState( null );
  const [ showSpinner, setShowspinner ] = useState( false );
  const [ color, setColor ] = useState( '#9b7ee5' );
  
  const isAdmin = useSelector( state => state?.user?.isAdmin );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const password = useRef( null );
  const confPassword = useRef( null );
  const name = useRef( null );

  const handlesubmit = async ( e ) => {
    e.preventDefault();
    setShowspinner( !showSpinner );

    if ( signup ) {
      const msg = validate( name?.current?.value, password?.current?.value, confPassword?.current?.value, 'signup' );
      setErr( msg );
      if ( msg ) return;
      const data = await Signup( name?.current?.value, password?.current?.value );
      if ( data?.status == 'success' ) {
        setShowspinner( !showSpinner );
        dispatch( removeAdmin() );
        dispatch( addUser( name?.current?.value ) );
        dispatch( addUserBio( data?.User?.bio ) );
        navigate( '/' );
      } else {
        setShowspinner( !showSpinner );
        setErr( data );
      }
    }
    else {
      const msg = validate( name?.current?.value, password?.current?.value, confPassword?.current?.value );
      setErr( msg );
      if ( msg ) return;

      const data = await login( name?.current?.value, password?.current?.value );

      if ( data?.status == 'success' ) {
        setShowspinner( !showSpinner );
        dispatch( removeAdmin() );
        dispatch( addUser( name?.current?.value ) );
        dispatch( addUserBio( data?.User?.bio  ) );
        navigate( '/' );
      } else {
        setShowspinner( !showSpinner );
        setErr( data );
      }

    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ ` w-full md:w-3/12 p-12 bg-[#9b7ee5]  mx-auto right-0 left-0 rounded-lg flex flex-col gap-10 font-ubuntu ${ signup ? 'my-28' : 'my-40' }` }>
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
          className="text-red-600 font-medium">{ 'Error : ' + err }</p> : '' }
      {!showSpinner ? <button
        className=' bg-white py-3 font-medium text-lg'
        type='submit' >
        { signup ? 'Sign up' : 'Log In' }
      </button> : <button
        className='bg-white py-3 pointer-events-none flex justify-center' >
        <FadeLoader
          className="mt-3 -mb-2"
          height={ 6 }
          margin={ -11 }
          radius={ 1 }
          width={ 2 }
          color={ color } />
      </button> }
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
