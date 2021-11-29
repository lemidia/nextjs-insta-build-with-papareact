import Post from "./Post";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
function Posts() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="my-5">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} {...post.data()} />
      ))}
    </div>
  );
}

export default Posts;
