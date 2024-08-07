import { useLocation, useNavigate } from "react-router-dom";

export default function Error () {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-[50rem] font-ubuntu">
      <h1 className="font-bold text-[15rem] -mt-10 text-[#9b7ee5]">404</h1>
      <h1 className="font-medium text-xl -mt-5 mb-5">This { location ? `${ location?.pathname }` : 'page' } is not available</h1>
      <div className="flex gap-10">
        <button
          onClick={()=>navigate('/')}
          className="font-medium text-xl bg-[#9b7ee5] text-white p-3 px-6 rounded-full">
          Home
        </button>
      </div>
    </div>
  );
}
