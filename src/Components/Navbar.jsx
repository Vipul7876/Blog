import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeAdmin } from "../Utils/UserSlice";
import { removeUserBlogs } from "../Utils/BlogSlice";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SearchCards } from "./Exports";
import useCheckLogin from '../Hooks/useCheckLogin';
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Cross from '../assets/cross-15.svg';
import { removeUsers } from "../Utils/AdminSlice";

export default function Navbar () {

  const [ showSearch, setShowSearch ] = useState( false );
  const [ showMenu, setShowMenu ] = useState( false );
  const [ clickedId, setClickedId ] = useState( null );
  const [ searchedText, setSearchedText ] = useState( null );
  const [ searchedResults, setSearchedResults ] = useState( null );
  const [ showHam, setShowHam ] = useState( 'hidden' );


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector( store => store?.user?.isLoggedIn );
  const isAdmin = useSelector( store => store?.user?.isAdmin );
  const User = useSelector( store => store?.user?.User )?.split( ' ' );
  const allblogs = useSelector( store => store?.blogs?.allBlogs );

  function searchWordInTitle ( arr, word ) {
    return arr?.filter( item => item?.title?.toLowerCase().includes( word.toLowerCase() ) );
  }

  const handlogout = () => {
    localStorage.removeItem( 'Token' );
    dispatch( removeUserBlogs() );
    dispatch( removeUsers() );
    dispatch( removeAdmin() );
    setShowMenu( false );
    setShowHam( 'hidden' );
  };

  const handleAccount = () => {
    navigate( '/account' );
    setShowMenu( false );
    setShowHam( 'hidden' );
  };

  const handleSearch = () => {
    setShowSearch( !showSearch );
    const result = searchWordInTitle( allblogs, searchedText );
    setSearchedResults( result );
    setSearchedText( null );
  };

  const handlelogin = () => {
    navigate( '/login' );
    setShowHam( 'hidden' );
  };

  useEffect( () => {
    if ( clickedId !== null ) {
      setShowSearch( !showSearch );
      navigate( `/blog/${ clickedId }` );
      setClickedId( null );
    }
  }, [ clickedId ] );

  useEffect( () => {
    if ( showHam === 'block' ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up the effect when component unmounts or on state change
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [ showHam ] );

  useCheckLogin();

  return (
    <div className='flex justify-between items-center bg-[#4c3290] py-3 md:py-6 px-4 md:px-24 font-ubuntu relative'>
      <h1 className="font-semibold text-lg md:text-3xl text-white playwrite-ar-Blog">
        <NavLink to='/'>
          Blogg
        </NavLink>
      </h1>
      <div className="w-[45%] md:w-[30%] flex items-center relative">

        {/* ------------------------Search--------------------- */ }
        <input
          onChange={ ( e ) => setSearchedText( e.target.value ) }
          className="w-full py-1 md:py-2 pl-4 pr-14 rounded-full focus:outline-none z-20"
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
      <div className="hidden md:flex justify-center items-center gap-3 md:gap-6">
        <div className="text-base md:text-lg font-medium">
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
            { isLoggedIn && isAdmin ? <li>
              <NavLink to='/users-list' >
                Users
              </NavLink>
            </li> : '' }
          </ul>
        </div>

        { isLoggedIn ? (
          <div className="hidden relative md:flex flex-col py-5 px-14">
            <button
              className={ `absolute top-0 left-0 py-2 px-4 text-lg font-medium bg-white z-10 rounded-full ${ showMenu ? 'hidden' : '' }` }
              onClick={ () => setShowMenu( !showMenu ) }>
              { User[ 0 ] }
            </button>
            { showMenu && (
              <div className="hidden absolute md:flex flex-col bg-white top-0 left-0 rounded-md outline outline-[1px] outline-black">
                <button className="px-6 py-2 text-lg font-medium rounded-md hover:bg-gray-200" onClick={ () => setShowMenu( false ) }>
                  { User ? User[ 0 ] : '' }
                </button>
                <button className="py-2 px-2 text-lg font-medium rounded-md text-left hover:bg-gray-200" onClick={ handleAccount }>
                  <span className="flex justify-start items-center gap-2 text-nowrap"><span><MdOutlineAccountCircle size={ 22 } /></span> My Account</span>
                </button>
                <button className="px-3 py-2 text-lg font-medium rounded-md hover:bg-gray-200" onClick={ handlogout }>
                  <span className="flex justify-start items-center gap-2"><span><FiLogOut /></span> Logout</span>
                </button>
              </div>
            ) }
          </div>
        ) : (
          <button className="hidden md:block px-2 md:px-4 py-1 md:py-2 md:text-lg font-medium  bg-white rounded-full" onClick={ handlelogin }>
            Login
          </button>
        ) }
      </div>
      <div className="md:hidden">
        <button
          className="flex justify-center items-center"
          onClick={ () => setShowHam( 'block' ) }>
          <RxHamburgerMenu color="white" className="w-[1.3rem] h-[1.3rem]" />
        </button>
        <div className={ `${ showHam } bg-[#4c3290] absolute flex justify-center items-center left-0 top-0 w-full h-[100vh] z-50 ` }>
          <button
            onClick={ () => setShowHam( 'hidden' ) }
            className=" absolute flex justify-center items-center right-3 top-5">
            <p className=" text-white">
              <img className="w-4 h-4" src={ Cross } alt="Cross" />
            </p>
          </button>
          <div className="absolute">
            <ul className=" flex flex-col gap-4 text-white">
              <li>
                <NavLink to='/' onClick={ () => setShowHam( 'hidden' ) } >
                  Home
                </NavLink>
              </li>
              { isLoggedIn ? <><li>
                <NavLink to='/myblogs' onClick={ () => setShowHam( 'hidden' ) } >
                  My Blogs
                </NavLink>
              </li><li onClick={ handleAccount }>My Account</li> </> : '' }
              { isLoggedIn && isAdmin ? <li>
                <NavLink to='/users-list' >
                  Users
                </NavLink>
              </li> : '' }
              { isLoggedIn ? <li onClick={ handlogout }>
                <span className="flex justify-start items-center gap-2"><span><FiLogOut /></span> Logout</span>
              </li> : <li onClick={ handlelogin }>
                Login
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}




