/* eslint-disable react/prop-types */
export default function BlogCards ( { title, id, author } ) {
  return (
    <div className='outline outline-2 outline-gray-400 rounded-lg py-4 px-3 flex flex-col gap-4'>
      <h1 className='font-medium text-3xl text-center'>{ title }</h1>
      { id ? <h3 className="font-medium text-xl text-center">id: { id }</h3> : '' }
      <h1 className='font-medium text-right'>~ { author }</h1>
    </div>
  );
}
