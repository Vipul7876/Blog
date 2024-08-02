import { useSelector } from "react-redux";
import useGetData from "../Hooks/useGetData";
import { BlogCards } from "./Exports";
import { NavLink } from "react-router-dom";


export default function Home () {

  useGetData();
  const blogs = useSelector( store => store?.blogs?.allBlogs );

  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-10 pt-[5rem] px-[15rem] ">
      {  blogs?.map( ( blog ) => {
        return ( <NavLink key={ blog?.username } to={ `/blog/${ blog?.blogId }` } >
          <BlogCards title={ blog?.title } author={ blog?.username } />
          </NavLink> );
        } ) 
      }
    </div>
  );
}
