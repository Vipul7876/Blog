import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import store from "../Utils/Store";
import { useEffect } from "react";
import { deleteBlog } from "../Utils/constants";
import { removeBlogs, removeUserBlogs } from "../Utils/BlogSlice";

export default function BlogPage () {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector( store => store?.user?.isLoggedIn );
  const user = useSelector( store => store?.user?.User );

  const { id } = useParams();
  const blogs = useSelector( store => store?.blogs?.allBlogs );
  const thisItemData = blogs?.filter( ( blog ) => {
    if ( blog?.blogId == id ) return blog;
  } );

  const handleDelete = () => {
    const data = deleteBlog( id, user );
    dispatch( removeBlogs() );
    dispatch( removeUserBlogs() );
    navigate( '/' );
  };

  useEffect( () => {
    if ( !blogs ) {
      navigate( '/' );
    }
  }, [] );

  return (
    <div className='flex flex-col items-center pt-6 gap-10'>
      <h1 className='font-semibold text-4xl my-6'>{ thisItemData && thisItemData[ 0 ]?.title }</h1>
      <p className='text-lg max-w-[40%] min-w-[400px]'>{ thisItemData && thisItemData[ 0 ]?.blog }</p>
      <p className='text-xl font-semibold'>~ { thisItemData && thisItemData[ 0 ]?.username }</p>
      { isLoggedIn && user == thisItemData[ 0 ]?.username && id == thisItemData[ 0 ]?.blogId ?
        <button
          onClick={ handleDelete }
          className="bg-red-600 py-3 px-5 font-medium my-2">
          Delete
        </button> : '' }
    </div>
  );
}
