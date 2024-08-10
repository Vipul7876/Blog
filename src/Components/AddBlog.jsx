import { useRef, useState } from "react";
import { addBlog, updateUserBlog } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";
import { FadeLoader } from "react-spinners";

export default function AddBlog () {


  const [ showSpinner, setShowspinner ] = useState( false );
  const [ color, setColor ] = useState( '#9b7ee5' );
  const dispatch = useDispatch();
  const [ updateBlog, setUpdateBlog ] = useState( false );
  const username = useSelector( store => store?.user?.User );

  const navigate = useNavigate();

  const title = useRef( null );
  const blog = useRef( null );
  const blogId = useRef( null );
  const description = useRef( null );

  const handlesubmit = async ( e ) => {
    e.preventDefault();
    setShowspinner( !showSpinner );

    if ( updateBlog ) {
      try {
        const data = await updateUserBlog( blogId?.current?.value, username, title?.current?.value, blog?.current?.value, description?.current?.value );
        if ( data.status == 'success' ) {
          setShowspinner( !showSpinner );
          dispatch( removeBlogs() );
          dispatch( removeUserBlogs() );
          navigate( '/' );
        }
      } catch ( error ) {
        setShowspinner( !showSpinner );
        console.warn( 'Error:' + error );

      }
    }
    else {
      try {
        const data = await addBlog( username, title?.current?.value, blog?.current?.value, description?.current?.value );
        if ( data.status == 'success' ) {
          setShowspinner( !showSpinner );
          dispatch( removeBlogs() );
          dispatch( removeUserBlogs() );
          navigate( '/' );
        }
      } catch ( error ) {
        setShowspinner( !showSpinner );
        console.warn( 'Error:' + error );
      }

    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ `w-full md:w-1/2 p-12 bg-[#9b7ee5]  mx-auto right-0 left-0 rounded-lg flex flex-col gap-10` }>
      <h1
        className="font-medium text-3xl text-center">
        { updateBlog ? 'Update Blog' : 'Add Blog' }
      </h1>
      {
        updateBlog ?
          <input
            type="text"
            ref={ blogId }
            placeholder="id"
            className="outline outline-black outline-1 p-2" /> : ''
      }
      <input
        type="text"
        ref={ title }
        placeholder="Title"
        className="outline outline-black outline-1 p-2" />
      <input
        type="text"
        ref={ description }
        placeholder="Description"
        className="outline outline-black outline-1 p-2" />
      <textarea
        ref={ blog }
        placeholder="Write Your Blog"
        className="outline outline-black outline-1 p-2 min-h-[20vh]" />
      { !showSpinner ? <button
        className='bg-white py-3 font-medium text-lg'
        type='submit' >
        { updateBlog ? 'Update' : 'Post' }
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

      <div
        className='flex flex-col gap-6'>
        <p
          className="" >{ updateBlog ? 'Want to Post new Blog?' : 'Want to Edit existing Blog?' } <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={ () => setUpdateBlog( !updateBlog ) }
          >
            { updateBlog ? 'Post' : 'Update' }
          </span>
        </p>
      </div>
    </form>
  );
}
