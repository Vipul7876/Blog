import { IoCallSharp } from "react-icons/io5";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import India from '../assets/india.svg';
import { useDispatch } from "react-redux";
import { removeAdmin } from "../Utils/UserSlice";

export default function Footer () {

  const dispatch = useDispatch();

  const handleAdmin = async () => {
    dispatch( removeAdmin() );
  }

  return (
    <div className="bg-[#4c3290] grid grid-cols-3 gap-y-3 md:gap-y-8 text-white  pl-[1rem] xl:pl-[10rem] 2xl:pl-[15rem] pt-[1rem] md:pt-[3rem] pr-20 md:pr-0 pb-2 md:pb-6 font-ubuntu">
      <div>
        <h1 className="font-semibold text-lg  md:text-4xl text-white playwrite-ar-Blog">
          <NavLink to='/'>
            Blogg
          </NavLink>
        </h1>
      </div>
      <div className="text-xs md:text-lg font-medium">
        <ul className="flex flex-col items-center md:items-start gap-2 md:gap-4 xl:gap-6">
          <li>
            <NavLink to='/' >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' >
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/' >
              Help
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin' onClick={ handleAdmin } >
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
      <div className=" flex flex-col">
        <ul className="flex flex-col gap-3 md:gap-4 xl:gap-6 text-xs md:text-lg md:font-medium items-end md:items-start">
          <li className="flex items-center gap-2">
            <NavLink to='mailto:vipulsharma3001@gmail.com' >
              <MdEmail size={'1rem'}/>
            </NavLink><span className="text-nowrap hidden md:block">vipulsharma3001@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <NavLink to='tel:+917876127982' >
              <IoCallSharp size={`1rem`} />
            </NavLink>
            <span className="text-nowrap hidden md:block">+91 78761-27982</span>
          </li>
          <li className="flex items-center gap-2">
            <NavLink to='https://maps.app.goo.gl/E11fw39UximLChJF6' target='_blank' >
              <MdLocationOn size={`1.2rem`} />
            </NavLink>
            <span className="min-w-[7rem] hidden md:block">Nangal, Rupnagar, Punjab(140133)</span>
            <img src={ India } alt="India" className="w-4 md:w-8 hidden md:block" />
          </li>
        </ul>
      </div>
      <div className="col-span-3 text-end md:text-center md:pr-[15rem]">
        <p className=" text-xs md:text-base">© 2024 All Rights Reserved by <span>Vipul Sharma</span></p>
      </div>
    </div>
  );
}
