import { useRef, useState } from "react";
import { addBlog, updateUserBlog } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";
import { FadeLoader } from "react-spinners";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function AddBlog () {

  const [ blogValue, setBlogValue ] = useState( '' );
  const [ showSpinner, setShowspinner ] = useState( false );
  const [ color, setColor ] = useState( '#9b7ee5' );
  const [ updateBlog, setUpdateBlog ] = useState( false );
  const [ err, setErr ] = useState( null );

  const dispatch = useDispatch();
  const username = useSelector( store => store?.user?.User );

  const navigate = useNavigate();

  const title = useRef( null );
  const blog = useRef( null );
  const blogId = useRef( null );
  const description = useRef( null );

  const modules = {
    toolbar: [
      [ { 'font': ['Sans Serif'] } ],
      [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
      [ { 'size': [ 'small', false, 'large', 'huge' ] } ],
      [ 'bold', 'italic', 'underline', 'strike' ],
      [ { 'color': [] }, { 'background': [] } ],
      [ { 'script': 'sub' }, { 'script': 'super' } ],
      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'indent': '-1' }, { 'indent': '+1' } ],
      [ { 'direction': 'rtl' } ],
      [ 'blockquote', 'code-block' ],
      [ { 'align': [] } ],
      [ 'link' ],
      [ 'clean' ] // remove formatting button
    ]
  };

  const handlesubmit = async ( e ) => {
    e.preventDefault();
    setShowspinner( ( prev ) => !prev );
    if ( !title.current?.value && !blog.current?.value && !description.current?.value ) {
      setShowspinner( ( prev ) => !prev );
      setErr( 'Please fill the form first!' );
      return;
    }

    if ( updateBlog ) {
      try {
        const data = await updateUserBlog( blogId?.current?.value, username, title?.current?.value, blog?.current?.value, description?.current?.value );
        if ( data.status == 'success' ) {
          setShowspinner( ( prev ) => !prev );
          dispatch( removeBlogs() );
          dispatch( removeUserBlogs() );
          navigate( '/' );
        } else {
          setShowspinner( ( prev ) => !prev );
        }
      } catch ( error ) {
        setShowspinner( ( prev ) => !prev );
        setErr( 'error:' + error );

      }
    }
    else {
      try {
        const data = await addBlog( username, title?.current?.value, blogValue, description?.current?.value );
        if ( data.status == 'success' ) {
          setShowspinner( ( prev ) => !prev );
          dispatch( removeBlogs() );
          dispatch( removeUserBlogs() );
          navigate( '/' );
        } else {
          setShowspinner( ( prev ) => !prev );
        }
      } catch ( error ) {
        setShowspinner( ( prev ) => !prev );
        setErr( 'error:' + error );
      }

    }
  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ `w-[100%] md:w-[35rem] 2xl:w-[52rem] p-6 md:p-12 bg-[#9b7ee5] mx-auto right-0 left-0 rounded-lg flex flex-col gap-6 md:gap-10` }>
      <h1
        className="font-medium text-xl md:text-3xl text-center">
        { updateBlog ? 'Update Blog' : 'Add Blog' }
      </h1>
      {
        updateBlog ?
          <input
            type="text"
            ref={ blogId }
            placeholder="id"
            className="outline outline-black outline-1 text-sm md:text-base p-2" /> : ''
      }
      <input
        type="text"
        ref={ title }
        placeholder="Title"
        className="outline outline-black outline-1 text-sm md:text-base p-2" />
      <input
        maxLength={54}
        type="text"
        ref={ description }
        placeholder="Description     (shown below the title at card)"
        className="outline outline-black outline-1 text-sm md:text-base p-2" />
      <div className="bg-white outline outline-black outline-1 text-sm md:text-base p-2 max-h-[100vh]">
        <ReactQuill
          style={{maxHeight: '50vh', overflowY: 'scroll'}}
          modules={ modules }
          theme="snow"
          value={ blogValue }
          onChange={ setBlogValue } />
      </div>
      { err ?
        <p
          className="text-red-600 font-medium">{ 'Error : ' + err }</p> : '' }
      { !showSpinner ? <button
        className='bg-white py-2 md:py-3 font-medium text-sm md:text-lg'
        type='submit' >
        { updateBlog ? 'Update' : 'Post' }
      </button> : <button
        className='bg-white py-1 md:py-3 pointer-events-none flex justify-center' >
        <FadeLoader
          className="ml-4 md:ml-0 mt-4 md:mt-3 -mb-2"
          height={ 6 }
          margin={ -11 }
          radius={ 1 }
          width={ 2 }
          color={ color } />
      </button> }

      <div
        className='flex flex-col gap-6'>
        <p
          className="text-xs md:text-base" >{ updateBlog ? 'Want to Post new Blog?' : 'Want to Edit existing Blog?' } <span
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
