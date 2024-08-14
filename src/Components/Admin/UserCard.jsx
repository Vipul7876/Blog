import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export default function UserCard ( { user, username, Model } ) {
  const dispatch = useDispatch();

  const allBlogs = useSelector( store => store?.blogs?.allBlogs );

  const totalBlogs = allBlogs?.filter( ( blog ) => {
    return blog?.username === user?.username;
  } );

  const totalCount = totalBlogs.length;

  const handledelete = async () => {
    username();
    Model();
  };

  return (
    <div className=" border-b-[1px] border-x-[1px] border-black px-4 md:px-6 py-2 md:py-4 grid grid-cols-3 grid-rows-1 items-center">
      <div className="flex justify-start items-center">
        <h1 className="font-medium md:text-lg alig">{ user?.username }</h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="">{ totalCount }</p>
      </div>
      <div className="flex justify-end items-center">
        <button
          onClick={ handledelete }
          className="bg-red-500 text-white text-xs md:text-base p-2 px-4">Delete</button>
      </div>
    </div>
  );
}
