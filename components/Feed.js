import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`mx-auto px-3 xl:px-0 grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl ${
        !session && "!grid-cols-1 !max-w-3xl"
      } `}
    >
      {/* section */}
      <section className="col-span-1 md:col-span-2">
        <Stories />
        <Posts />
      </section>
      {/* section */}
      {session && (
        <section className="hidden xl:block">
          <MiniProfile />
          <Suggestions />
        </section>
      )}
    </main>
  );
}

export default Feed;
