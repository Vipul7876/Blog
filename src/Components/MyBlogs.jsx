import { useSelector } from "react-redux";
import useUserBlogs from "../Hooks/useUserBlogs";
import { AddBlog, BlogCards } from "./Exports";
import { NavLink } from "react-router-dom";

export default function MyBlogs () {


  const Blogs = useSelector( store => store?.blogs?.userBlogs );

  useUserBlogs();

  return (
    <div className="mb-14 pt-[5rem] px-[15rem]">
      <div className="grid grid-cols-3 gap-x-10 gap-y-10 pt-10 px-6">
        {
          Blogs?.map( ( blog ) => {
            return ( <NavLink key={ blog?.blogId } to={ `/blog/${ blog?.blogId }` } >
              <BlogCards title={ blog?.title } id={ blog?.blogId } author={ blog?.username } />
            </NavLink> );
          } )
        }
      </div>
      <AddBlog />
    </div>
  );
}
