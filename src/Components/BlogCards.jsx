/* eslint-disable react/prop-types */
export default function BlogCards ( { title, id, author, timeDate, description } ) {

  const date = timeDate?.split( ' ' );

  return (
    <div className='relative outline outline-2 outline-gray-200 h-[10rem] p-3 rounded-md flex flex-col font-ubuntu'>
      <h1 className='font-medium text-sm mb-2'>{ author }</h1>
      <h1 className='font-medium text-3xl'>{ title }</h1>
      <p className='font-medium mt-2'>{ description }</p>
      <div className="font-medium text-sm flex justify-between absolute bottom-0 w-[95%]">
        { timeDate ? <p className="">{ date[ 1 ] }</p> : '' }
        { id ? <h3 className="font-medium ">id: { id }</h3> : '' }
      </div>
    </div>
  );
}
