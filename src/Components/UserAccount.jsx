import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBio, deleteUser } from "../Utils/constants";
import { addUserBio } from "../Utils/UserSlice";
import useGetUserBio from '../Hooks/useGetUserBio';
import { removeAdmin } from "../Utils/UserSlice";

export default function UserAccount () {

  const bio = useRef( null );

  const dispatch = useDispatch();

  const allBlogs = useSelector( store => store?.blogs?.allBlogs );
  const username = useSelector( store => store?.user?.User );
  const userBio = useSelector( store => store?.user?.userBio );

  const totalBlogs = allBlogs?.filter( ( blog ) => {
    return blog?.username === username;
  } );

  const totalCount = totalBlogs.length;

  const handleUpdate = () => {
    if ( !userBio ) {
      const data = addBio( username, bio?.current?.value );
      if ( data?.username === username ) {
        dispatch( addUserBio( data?.bio ) );
      }
    }
  };

  const handleDelete = async() => {
    const data = await deleteUser( username );
    dispatch( removeAdmin() );
    console.log( data?.User + ' is deleted' );
  }

  useGetUserBio();

  return (
    <div className="font-ubuntu flex flex-col h-[40rem] items-center py-20 ">
      <div className=" flex flex-col gap-10 items-center">
        <h1 className="text-3xl md:text-5xl font-semibold">{ username }</h1>
        { userBio ? <p className="font-medium md:text-lg p-3 outline outline-[1px] outline-gray-300 rounded-lg max-w-[20rem]  md:max-w-[30rem]">{ userBio }</p> : <textarea
          ref={ bio }
          placeholder="Bio"
          className="outline outline-[1px] outline-gray-300 p-3 w-60 md:w-96 " /> }
        <div className="flex py-3 px-5 outline outline-[1px] outline-gray-300 hover:bg-gray-200 items-center rounded-lg gap-32 cursor-pointer">
          <h1 className="font-medium text-xl md:text-3xl">Total Blogs</h1>
          <p className="font-medium text-2xl md:text-4xl">{ totalCount }</p>
        </div>
        <div className="flex gap-6">
          { userBio ? '' : <button
            onClick={ handleUpdate }
            className="bg-[#9b7ee5] py-3 px-5 font-medium my-2 text-white rounded-full">Update</button> }
          <button
            onClick={handleDelete}
            className="bg-red-600 py-3 px-5 font-medium my-2 text-white rounded-full">Delete</button>
        </div>
      </div>
    </div>
  );
}
