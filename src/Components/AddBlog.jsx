import { useRef, useState } from "react";
import { addBlog, updateUserBlog } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";

export default function AddBlog () {

  const dispatch = useDispatch();
  const [ updateBlog, setUpdateBlog ] = useState( false );
  const username = useSelector( store => store?.user?.User );

  const navigate = useNavigate();

  const title = useRef( null );
  const blog = useRef( null );
  const blogId = useRef( null );

  const handlesubmit = async ( e ) => {
    e.preventDefault();

    if ( updateBlog ) {
      const data = await updateUserBlog( blogId?.current?.value, username, title?.current?.value, blog?.current?.value );
      if ( data.status == 'success' ) {
        dispatch( removeBlogs() );
        dispatch( removeUserBlogs() );
        navigate( '/' );
      }
    }
    else {
      const data = await addBlog( username, title?.current?.value, blog?.current?.value );
      if ( data.status == 'success' ) {
        dispatch( removeBlogs() );
        dispatch( removeUserBlogs() );
        navigate( '/' );
      }
    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ `w-full md:w-1/3 p-12 bg-gray-600  mx-auto right-0 left-0 rounded-lg bg-opacity-80 flex flex-col gap-10 mt-36` }>
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
      <textarea
        ref={ blog }
        placeholder="Write Your Blog"
        className="outline outline-black outline-1 p-2 min-h-[20vh]" />
      <button
        className=' bg-gray-300 py-3 font-medium text-lg'
        type='submit' >
        { updateBlog ? 'Update' : 'Post' }
      </button>
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
