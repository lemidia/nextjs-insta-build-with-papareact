import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, profileImg, image, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async (e) => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  // to check whether the user smashed likes button or not
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  return (
    <div className="my-7 bg-white border border-gray-200 rounded-sm">
      {/* header */}
      <div className="flex items-center justify-between p-4 ">
        <img
          src={profileImg}
          alt=""
          className="w-14 h-14 rounded-full p-1 border mr-4 object-contain"
        />
        <span className="flex-1 font-semibold">{username}</span>

        <DotsHorizontalIcon className="btn" />
      </div>
      {/* pic */}
      <img src={image} alt="" className="w-full object-cover" />
      {/* buttons */}
      {session && (
        <div className="flex items-center justify-between pt-4 px-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn text-red-500" onClick={likePost} />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <div>
            <BookmarkIcon className="btn" />
          </div>
        </div>
      )}

      <p className="pt-4 pl-5 font-bold">
        {likes.length > 0 && likes.length + " Likes"}
      </p>

      {/* caption */}
      <p className="p-5 pt-3 truncate">
        <span className="mr-2 font-bold">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.map((comment) => (
        <div className="flex p-5 items-start space-x-2" key={comment.id}>
          <img
            className="w-7 h-7 rounded-full object-contain"
            src={comment.data().userImage}
            alt=""
          />
          <span className="font-bold">{comment.data().username}</span>{" "}
          <div className="flex-1">
            <p className="">{comment.data().comment}</p>
          </div>
          <Moment fromNow className="text-sm text-gray-500 pr-3">
            {comment.data().timestamp?.toDate()}
          </Moment>
        </div>
      ))}
      {/* input box */}

      <form className="flex items-center p-5">
        <EmojiHappyIcon className="h-7 mr-2" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!session}
          placeholder={
            !session
              ? "Must be logged in to add a comment."
              : "Add a comment..."
          }
          className="border-none flex-1 focus:ring-black outline-none mx-4"
        />
        <button
          disabled={!session || !comment.trim()}
          onClick={sendComment}
          className="font-semibold text-blue-500 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
