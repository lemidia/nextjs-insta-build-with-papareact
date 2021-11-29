import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="mt-10 ml-10 flex items-center justify-between">
      <img
        className="rounded-full border p-[2px] w-16 mr-3"
        src={session?.user.image}
        alt="profile pic"
      />
      <div className="flex-1">
        <h2>{session?.user.username}</h2>
        <h3 className="text-sm text-gray-500">Welcome to Instagram</h3>
      </div>
      <button className="font-semibold text-blue-500" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
