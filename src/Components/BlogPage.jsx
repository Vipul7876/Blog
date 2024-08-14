import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import store from "../Utils/Store";
import { useEffect, useState } from "react";
import { deleteBlog } from "../Utils/constants";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";
import { Modal } from './Exports';
import './BlogPageCss.css';


export default function BlogPage () {

  const [ showModal, setShowModal ] = useState( false );
  const [ deleteblog, setDeleteblog ] = useState( false );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector( store => store?.user?.isLoggedIn );
  const user = useSelector( store => store?.user?.User );
  const isAdmin = useSelector( store => store?.user?.isAdmin );

  const { id } = useParams();
  const blogs = useSelector( store => store?.blogs?.allBlogs );
  const thisItemData = blogs?.filter( ( blog ) => {
    if ( blog?.blogId == id ) return blog;
  } );

  const username = ( isAdmin ? thisItemData[ 0 ]?.username : user );

  if ( deleteblog ) {
    deleteBlog( id, username );
    dispatch( removeBlogs() );
    dispatch( removeUserBlogs() );
    navigate( '/' );
  }
  
  const handleupdate = () => {
    navigate( `/blog/${ id }/update` );
  };

  useEffect( () => {
    if ( !blogs ) {
      navigate( '/' );
    }
  }, [] );

  return (
    <div className={ `relative flex flex-col justify-center items-center pt-6 gap-10 font-ubuntu min-h-[85vh]` }>
      <div className="w-[85%] md:max-w-[40%] flex flex-col items-center mb-10">
        <h1 className='font-semibold md:w-auto text-3xl md:text-4xl mx-4 md:mx-0 my-6'>{ thisItemData && thisItemData[ 0 ]?.title }</h1>
        <p className='text-xl font-medium my-5'>{ `" ${ thisItemData && thisItemData[ 0 ]?.description } "` }</p>
        <div
          className=" editor"
          dangerouslySetInnerHTML={ { __html: thisItemData && thisItemData[ 0 ]?.blog } }>
        </div>
        <p className='text-xl font-semibold my-4'>~ { thisItemData && thisItemData[ 0 ]?.username }</p>
        { isAdmin || isLoggedIn && user == thisItemData[ 0 ]?.username && id == thisItemData[ 0 ]?.blogId ? <div className="flex gap-4">
          <button
            onClick={ () => setShowModal( !showModal ) }
            className="bg-red-600 py-3 px-5 font-medium my-2 text-white rounded-full">
            Delete
          </button>
          <button
            onClick={ handleupdate }
            className="bg-green-500 py-3 px-5 font-medium my-2 text-white rounded-full">
            Update
          </button> </div> : '' }
      </div>
      <Modal show={ showModal } Delete={ () => setDeleteblog( !deleteblog ) } Cancel={ () => setShowModal( !showModal ) } message={ 'Sure you want to delete this blog ?'} />
    </div>
  );
}
