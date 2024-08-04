import { IoCallSharp } from "react-icons/io5";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import India from '../assets/india.svg';

export default function Footer () {
  return (
    <div className="bg-[#4c3290] grid grid-cols-3 gap-y-8 text-white pl-[15rem] pt-[4rem] pb-6 font-ubuntu">
      <div>
        <h1 className="font-semibold text-4xl text-white playwrite-ar-Blog">
          <NavLink to='/'>
            Blogg
          </NavLink>
        </h1>
      </div>
      <div className="text-lg font-medium">
        <ul className="flex flex-col gap-6">
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
        </ul>
      </div>
      <div className=" flex flex-col">
        <ul className="flex flex-col gap-6 font-medium">
          <li className="flex items-center gap-2">
            <NavLink to='/' >
              <MdEmail/>
            </NavLink><span>vipulsharma3001@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <NavLink to='/' >
              <IoCallSharp />
            </NavLink>
            <span>+91 78761-27982</span>
          </li>
          <li className="flex items-center gap-2">
            <NavLink to='/' >
              <MdLocationOn size={`1.2rem`} />
            </NavLink>
            <span>Nangal, Rupnagar, Punjab(140133)</span>
            <img src={ India } alt="" className="w-8" />
          </li>
        </ul>
      </div>
      <div className="col-span-3 text-center pr-[15rem]">
        <p>© 2024 All Rights Reserved by <span>Vipul Sharma</span></p>
      </div>
    </div>
  );
}
