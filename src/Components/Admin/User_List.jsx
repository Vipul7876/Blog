import { useSelector } from 'react-redux';
import useUsersList from '../../Hooks/useUsersList';
import UserCard from './UserCard';

export default function User_List () {

  const List = useSelector( store => store?.admin?.allUsers );
  console.log( List );

  useUsersList();

  return (
    <div className='flex flex-col justify-center items-center py-10 font-ubuntu'>
      <h1 className='text-5xl font-semibold'>Users</h1>
      <div className='w-[50rem] my-20 border-t-[1px] border-black '>
        <div className=" border-b-[1px] border-x-[1px] border-black px-6 py-4 grid grid-cols-3 grid-rows-1 items-center">
          <div className="flex justify-start items-center">
            <h1 className="font-semibold text-xl alig">UserName</h1>
          </div>
          <div className="flex justify-center items-center">
            <p className=" font-semibold text-xl">Total Blogs</p>
          </div>
        </div>
        {
          List?.map( ( user ) => {
            return <UserCard key={ user?.username } user={ user } />;
          } )
        }
      </div>
    </div>
  );
}
