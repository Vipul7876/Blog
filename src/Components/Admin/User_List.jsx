import { useDispatch, useSelector } from 'react-redux';
import useUsersList from '../../Hooks/useUsersList';
import UserCard from './UserCard';
import Modal from '../Modal';
import { useState } from 'react';
import { deleteUser } from '../../Utils/constants';
import { removeUsers } from '../../Utils/AdminSlice';

export default function User_List () {

  const [ showModal, setShowModal ] = useState( false );
  const [ userName, setUserName ] = useState( null );

  const dispatch = useDispatch();

  const List = useSelector( store => store?.admin?.allUsers );

  const handleDelete = async () => {
    const data = await deleteUser( userName );
    if ( data?.status === 'success' ) {
      setShowModal( !showModal );
      dispatch( removeUsers() );
    } else {
     console.warn('User can not be Deleted!')
    }
  };


  useUsersList();

  return (
    <div className='flex flex-col justify-center items-center py-40 md:py-8 2xl:py-28 font-ubuntu'>
      <h1 className='text-3xl md:text-5xl font-semibold'>Users</h1>
      <div className='md:w-[40rem] 2xl:w-[50rem] my-10 md:my-20 border-t-[1px] border-black '>
        <div className=" border-b-[1px] border-x-[1px] border-black px-4  md:px-6 py-2 md:py-4 grid grid-cols-3 grid-rows-1 items-center">
          <div className="flex justify-start items-center">
            <h1 className="font-semibold text-left md:text-xl alig">UserName</h1>
          </div>
          <div className="flex justify-center items-center">
            <p className=" font-semibold text-left md:text-xl">Total Blogs</p>
          </div>
        </div>
        {
          List?.map( ( user ) => {
            return <UserCard key={ user?.username } user={ user } username={ () => setUserName( user?.username ) } Model={ () => setShowModal( !showModal ) } />;
          } )
        }
      </div>
      <Modal show={ showModal } Delete={ handleDelete } Cancel={ () => setShowModal( !showModal ) } message={ `Sure you want to delete ${ userName ? userName : 'User' } ?` } />
    </div>
  );
}
