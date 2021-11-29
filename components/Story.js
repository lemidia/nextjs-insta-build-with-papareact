function Story({ username, avatar }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={avatar}
        alt="profile pic"
        className="w-14 h-14 rounded-full object-contain p-[1.5px] border-red-400 border-[0.15rem] cursor-pointer hover:scale-110 transition-all ease-out duration-200 mb-1"
      />
      <p className="text-sm truncate w-16">{username}</p>
    </div>
  );
}

export default Story;
