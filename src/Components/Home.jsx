import { useSelector } from "react-redux";
import useGetData from "../Hooks/useGetData";
import { BlogCards } from "./Exports";
import { NavLink } from "react-router-dom";


export default function Home () {

  useGetData();
  const blogs = useSelector( store => store?.blogs?.allBlogs );

  return (
    <div className="flex pl-[30%] pt-[5%]">
      <div className="flex flex-col justify-start gap-y-6 w-2/5 mb-[10rem]">
        { blogs?.map( ( blog ) => {
          return ( <NavLink key={ blog?.blogId } to={ `/blog/${ blog?.blogId }` } >
            <BlogCards title={ blog?.title } author={ blog?.username } timeDate={blog?.timeDate} description={blog?.description} />
          </NavLink> );
        } )
        } 
      </div>
    </div>
  );
}
