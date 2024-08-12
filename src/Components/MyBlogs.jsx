import { useSelector } from "react-redux";
import useUserBlogs from "../Hooks/useUserBlogs";
import { AddBlog, BlogCards } from "./Exports";
import { NavLink } from "react-router-dom";

export default function MyBlogs () {


  const Blogs = useSelector( store => store?.blogs?.userBlogs );

  useUserBlogs();

  return (
    <div className="mb-14 pt-[5rem] px-4 md:px-[15rem] font-ubuntu">
      <AddBlog />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-10 gap-y-10 pt-10 px-6">
        {
          Blogs?.map( ( blog ) => {
            return ( <NavLink key={ blog?.blogId } to={ `/blog/${ blog?.blogId }` } >
              <BlogCards title={ blog?.title } id={ blog?.blogId } author={ blog?.username } timeDate={blog?.timeDate} description={blog?.description} />
            </NavLink> );
          } )
        }
      </div>
      
    </div>
  );
}
