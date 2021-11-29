import { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const users = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(users);
  }, []);

  return (
    <div className="flex space-x-5 p-5 bg-white mt-5 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-pink-100">
      {session && (
        <Story avatar={session?.user.image} username={session?.user.username} />
      )}

      {suggestions.map((user) => (
        <Story username={user.username} avatar={user.avatar} />
      ))}
    </div>
  );
}

export default Stories;
