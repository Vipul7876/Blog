import { useSelector } from "react-redux";
import useGetData from "../Hooks/useGetData";
import { BlogCards } from "./Exports";
import { NavLink } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useState } from "react";


export default function Home () {
  const [ color, setColor ] = useState( "#4c3290" );
  useGetData();
  const blogs = useSelector( store => store?.blogs?.allBlogs );

  return (
    blogs ? <div className="flex pl-[20%] md:pl-[30%] pt-[5%]">
      <div className="flex flex-col justify-start gap-y-6 w-3/4 md:w-2/5 mb-[5rem] md:mb-[10rem]">
        { blogs?.map( ( blog ) => {
          return ( <NavLink key={ blog?.blogId } to={ `/blog/${ blog?.blogId }` } >
            <BlogCards title={ blog?.title } author={ blog?.username } timeDate={ blog?.timeDate } description={ blog?.description } />
          </NavLink> );
        } )
        }
      </div>
    </div> : <div className="flex justify-center items-center h-[40rem]"><FadeLoader color={ color } /></div>
  );
}
