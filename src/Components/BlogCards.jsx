/* eslint-disable react/prop-types */
export default function BlogCards ( { title, id, author, timeDate, description } ) {

  const date = timeDate?.split( ' ' );

  return (
    <div className='relative outline outline-2 outline-gray-200 min-h-[8rem] md:min-h-[10rem] p-3 rounded-md flex flex-col font-ubuntu'>
      <h1 className='font-medium text-xs md:text-sm md:mb-2'>{ author }</h1>
      <h1 className='font-medium text-lg xl:text-2xl 2xl:text-3xl'>{ title }</h1>
      <p className='font-medium text-sm md:text-base py-1 md:py-2 mb-2 h-[3rem] md:h-[5.3rem] overflow-y-hidden'>{ description }</p>
      <div className="font-medium text-xs md:text-sm flex justify-between absolute bottom-0 w-[95%] ">
        { timeDate ? <p className="">{ date[ 1 ] }</p> : '' }
        { id ? <h3 className="font-medium ">id: { id }</h3> : '' }
      </div>
    </div>
  );
}
