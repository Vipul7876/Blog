import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBio } from "../Utils/constants";
import { addUserBio } from "../Utils/UserSlice";
import useGetUserBio from '../Hooks/useGetUserBio';

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

  useGetUserBio();

  return (
    <div className="font-ubuntu flex flex-col h-[40rem] items-center py-20 ">
      <div className=" flex flex-col gap-10 items-center">
        <h1 className="text-5xl font-semibold">{ username }</h1>
        { userBio ? <p className="font-medium text-lg p-3 outline outline-[1px] outline-gray-300 rounded-lg max-w-[30rem]">{ userBio }</p> : <textarea
          ref={ bio }
          placeholder="Bio"
          className="outline outline-[1px] outline-gray-300 p-3 w-96 " /> }
        <div className="flex py-3 px-5 outline outline-[1px] outline-gray-300 hover:bg-gray-200 items-center rounded-lg gap-32 cursor-pointer">
          <h1 className="font-medium text-3xl">Total Blogs</h1>
          <p className="font-medium text-4xl">{ totalCount }</p>
        </div>
        { userBio ? '' : <button
          onClick={ handleUpdate }
          className="bg-[#9b7ee5] font-medium text-lg text-white py-2 px-3 rounded-full">Update</button> }
      </div>
    </div>
  );
}
