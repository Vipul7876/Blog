/* eslint-disable react/prop-types */
export default function Modal ( { show, Delete,Cancel } ) {
  console.log( show );

  return (
    <div className={ `absolute flex w-full h-full justify-center items-end md:items-center bg-white bg-opacity-35 ${ show ? '' : 'hidden' }` }>
      <div className="h-[15rem] w-[25rem] bg-[#d8ccf5] p-4 flex flex-col justify-center items-center gap-8 outline outline-1 outline-black rounded-2xl z-10">
        <h1 className="text-red-600 font-medium text-xl">Sure you want to delete this blog ?</h1>
        <div className="flex gap-6">
          <button
            onClick={ () => Delete() }
            className="bg-red-600 py-3 px-5 font-medium my-2 text-white rounded-full">
            Delete
          </button>
          <button
            onClick={ () => Cancel() }
            className="bg-green-500 py-3 px-5 font-medium my-2 text-white rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
