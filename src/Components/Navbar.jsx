import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/UserSlice";
import { removeUserBlogs } from "../Utils/BlogSlice";

export default function Navbar () {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector( store => store?.user?.isLoggedIn );
  const handlogout = () => {
    dispatch( removeUserBlogs() );
    dispatch( removeUser() );
  };
  const handlelogin = () => {
    navigate( '/login' );
  };

  
  return (
    <div className='flex justify-between items-center bg-gray-500 py-8 px-24'>
      <h1 className="font-semibold text-5xl text-white">
        <NavLink to='/'>
          Blog
        </NavLink>
      </h1>
      <div className="flex justify-center items-center gap-6">
        <div className="text-lg font-medium">
          <ul className="flex gap-6">
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
          </ul>

        </div>
        <button className="outline outline-2 px-4 py-2 text-lg font-medium bg-white rounded-full" onClick={ isLoggedIn ? handlogout : handlelogin }>
          { !isLoggedIn ? 'Login' : 'Logout' }
        </button>
      </div>
    </div>
  );
}
