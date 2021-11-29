import faker from "faker";
import { useEffect, useState } from "react";
function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const users = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(users);
  }, []);
  return (
    <div className="mt-7 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-600">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((el) => (
        <div key={el.id} className="flex items-center justify-start mt-3">
          <img
            src={el.avatar}
            alt=""
            className="w-12 rounded-full border p-[2px] mr-4"
          />
          <div className="">
            <h6 className="font-semibold text-sm">{el.username}</h6>
            <span className="truncate text-xs text-gray-500">
              {el.company.name}
            </span>
          </div>
          <button className="font-semibold text-blue-500 text-sm ml-auto">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
