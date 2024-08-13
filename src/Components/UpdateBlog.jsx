import ReactQuill from "react-quill";
import { FadeLoader } from "react-spinners";
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";
import { updateUserBlog } from "../Utils/constants";

export default function UpdateBlog () {

  const [ blogUsername, setBlogUsername ] = useState( null );
  const [ showSpinner, setShowspinner ] = useState( false );
  const [ color, setColor ] = useState( '#9b7ee5' );
  const [ err, setErr ] = useState( null );

  const [ title, setTitle ] = useState();
  const [ blog, setBlog ] = useState();
  const [ blogId, setBlogId ] = useState( '' );
  const [ description, setDescription ] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { id } = useParams();

  const blogs = useSelector( store => store?.blogs?.allBlogs );
  const user = useSelector( store => store?.user?.User );
  const isAdmin = useSelector( store => store?.user?.isAdmin );

  useEffect( () => {
    const thisItemData = blogs?.filter( ( blog ) => {
      if ( blog?.blogId == id ) return blog;
    } );
    if ( thisItemData ) {
      setTitle( thisItemData[0].title );
      setDescription( thisItemData[0].description );
      setBlog( thisItemData[0].blog );
      setBlogUsername( thisItemData[0].username );
      setBlogId( id );

    }
  }, [ blogs, id ] );

  const username = ( isAdmin ? blogUsername : user );

  const modules = {
    toolbar: [
      [ { 'font': [ 'Sans Serif' ] } ],
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


    if ( !title || !blog || !description ) {
      setShowspinner( ( prev ) => !prev );
      setErr( 'Please update the form first!' );
      return;
    }

    try {
      const data = await updateUserBlog( blogId, username, title, blog, description );
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

  };

  return (
    <form
      onSubmit={ handlesubmit }
      className={ `w-[100%] md:w-[35rem] 2xl:w-[52rem] p-6 md:p-12 bg-[#9b7ee5] mx-auto right-0 left-0 rounded-lg flex flex-col gap-6 md:gap-10 my-16` }>
      <h1
        className="font-medium text-xl md:text-3xl text-center">
        Update Blog
      </h1>
      <input
        value={ title }
        onChange={ ( e ) => setTitle( e.target.value ) }
        type="text"
        placeholder="Title"
        className="outline outline-black outline-1 text-sm md:text-base p-2" />
      <input
        value={ description }
        onChange={ ( e ) => setDescription( e.target.value ) }
        maxLength={ 54 }
        type="text"
        placeholder="Description     (shown below the title at card)"
        className="outline outline-black outline-1 text-sm md:text-base p-2" />
      <div className="bg-white outline outline-black outline-1 text-sm md:text-base p-2 max-h-[100vh]">
        <ReactQuill
          style={ { maxHeight: '50vh', overflowY: 'scroll' } }
          modules={ modules }
          theme="snow"
          value={ blog }
          onChange={ setBlog } />
      </div>
      { err ?
        <p
          className="text-red-600 font-medium">{ 'Error : ' + err }</p> : '' }
      { !showSpinner ? <button
        className='bg-white py-2 md:py-3 font-medium text-sm md:text-lg'
        type='submit' >
        Update
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
      </div>
    </form>
  );
}
