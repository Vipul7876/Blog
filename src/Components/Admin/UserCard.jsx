/* eslint-disable react/prop-types */
export default function UserCard ( { user } ) {

  return (
    <div className=" border-b-[1px] border-x-[1px] border-black px-6 py-4 grid grid-cols-3 grid-rows-1 items-center">
      <div className="flex justify-start items-center">
      <h1 className="font-medium text-lg alig">{ user?.username }</h1>
      </div>
      <div className="flex justify-center items-center">
      <p className="">10</p>
      </div>
      <div className="flex justify-end items-center">
      <button className="bg-red-500 text-white p-2 px-4">Delete</button>
      </div>
    </div>
  );
}
