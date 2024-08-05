import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/UserSlice";
import { removeUserBlogs } from "../Utils/BlogSlice";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SearchCards } from "./Exports";
import useCheckLogin from '../Hooks/useCheckLogin';

export default function Navbar () {

  const [ showSearch, setShowSearch ] = useState( false );
  const [ clickedId, setClickedId ] = useState( null );
  const [ searchedText, setSearchedText ] = useState( null );
  const [ searchedResults, setSearchedResults ] = useState( null );


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector( store => store?.user?.isLoggedIn );
  const isAdmin = useSelector( store => store?.user?.isAdmin);
  const allblogs = useSelector( store => store?.blogs?.allBlogs );

  function searchWordInTitle ( arr, word ) {
    return arr?.filter( item => item?.title?.toLowerCase().includes( word.toLowerCase() ) );
  }

  const handlogout = () => {
    localStorage.removeItem('Token');
    dispatch( removeUserBlogs() );
    dispatch( removeUser() );
  };

  const handleSearch = () => {
    setShowSearch( !showSearch );
    const result = searchWordInTitle( allblogs, searchedText );
    setSearchedResults( result );
    setSearchedText( null );
  };

  const handlelogin = () => {
    navigate( '/login' );
  };

  useEffect( () => {
    if ( clickedId !== null ) {
      setShowSearch( !showSearch );
      navigate( `/blog/${ clickedId }` );
      setClickedId( null );
    }
  }, [ clickedId ] );

  useCheckLogin();

  return (
    <div className='flex justify-between items-center bg-[#4c3290] py-6 px-24 font-ubuntu'>
      <h1 className="font-semibold text-3xl text-white playwrite-ar-Blog">
        <NavLink to='/'>
          Blogg
        </NavLink>
      </h1>
      <div className="w-[30%] flex items-center relative">

        {/* ------------------------Search--------------------- */ }
        <input
          onChange={ ( e ) => setSearchedText( e.target.value ) }
          className="w-full py-2 pl-4 pr-14 rounded-full focus:outline-none z-20"
          type="text"
          placeholder="Search" />
        <button
          onClick={ handleSearch }
          className="rounded-full p-2 absolute right-0 z-20">
          <IoSearch size={ `1.4rem` } />
        </button>
        <div className={ `absolute w-full z-10 bg-white pt-12 top-0 rounded-tr-3xl rounded-tl-3xl  ${ showSearch ? '' : 'hidden' } ` }>
          <div className="max-h-[16rem] overflow-y-scroll" >
            { searchedResults?.map( ( blog ) => {
              return <SearchCards key={ blog?.blogId } blog={ blog } event={ ( e ) => setClickedId( e ) } />;
            } ) }
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6">
        <div className="text-lg font-medium">
          <ul className="flex gap-6 text-white">
            <li>
              <NavLink to='/' >
                Home
              </NavLink>
            </li>
            { isLoggedIn ? <li>
              <NavLink to='/myblogs' >
                My Blogs
              </NavLink>
            </li> : '' }
            { isLoggedIn && isAdmin  ? <li>
              <NavLink to='/users-list' >
                Users
              </NavLink>
            </li> : '' }
          </ul>

        </div>
        <button className="px-4 py-2 text-lg font-medium bg-white rounded-full"
          onClick={ isLoggedIn ? handlogout : handlelogin }>
          { !isLoggedIn ? 'Login' : 'Logout' }
        </button>
      </div>
    </div>
  );
}




