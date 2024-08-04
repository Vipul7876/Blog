/* eslint-disable react/prop-types */
export default function Modal (  {show, Delete } ) {
  console.log(show);
  
  return (
    <div className={ `absolute flex w-full h-[80vh] justify-center items-center bg-white bg-opacity-35 ${ show ? '' : 'hidden' }` }>
      <div className="h-[30%] w-[25rem] bg-[#d8ccf5] p-4 flex flex-col justify-center items-center gap-8 outline outline-1 outline-black rounded-2xl">
        <h1 className="text-red-600 font-medium text-xl">Sure you want to delete this blog ?</h1>
        <button
          onClick={ ()=>Delete() }
          className="bg-red-600 py-3 px-5 font-medium my-2 text-white rounded-full">
          Delete
        </button>
      </div>
    </div>
  );
}
