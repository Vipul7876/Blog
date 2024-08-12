/* eslint-disable react/prop-types */
export default function SearchCards ( { event, blog } ) {

  const handleClick = () => {
    event( blog?.blogId );
  };

  return (
    <div className="border-b-[1px] border-black pl-2 py-2 hover:bg-gray-200 cursor-pointer" onClick={ handleClick }>
      <p className="text-xs md:text-sm">{ blog?.username }</p>
      <h1 className="text-lg md:text-xl">{ blog?.title  }</h1>
      <p className="text-xs md:text-sm">{ blog?.description }</p>
    </div>
  );
}
