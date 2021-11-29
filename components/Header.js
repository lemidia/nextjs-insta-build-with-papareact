import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalOpen, modalClose } from "../redux/features/modal/modalSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  // redux code
  const modal = useSelector((state) => state.modal.modalState);
  const dispatch = useDispatch();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center bg-white max-w-6xl py-2 px-5 mx-auto xl:px-0">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:block w-28 h-10 cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1600px-Instagram_logo.svg.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* flex-shrink-0 : size of the element never gets smaller as screen size gets smaller */}
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-10 h-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/2560px-Instagram_simple_icon.svg.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative p-3 rounded-md">
          <div className="absolute pl-3 pointer-none flex items-center top-0 bottom-0">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 pl-10 block w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* right (icons) */}
        <div className="flex items-center space-x-4 justify-end">
          <HomeIcon
            onClick={() => router.push("/")}
            className="h-7 hover:scale-125 transition-all duration-150 ease-out"
          />

          {!session ? (
            <>
              <button onClick={signIn}>Sign In</button>
            </>
          ) : (
            <>
              <div className="relative navBtn">
                <div className="rounded-full transform animate-pulse bg-red-500 -top-2 -right-2 absolute flex items-center justify-center w-5 h-5 text-xs text-white">
                  3
                </div>
                <PaperAirplaneIcon className="rotate-45" />
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => dispatch(modalOpen())}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <MenuIcon className="h-6 md:hidden cursor-pointer" />

              <img
                src={session.user.image}
                alt="profile pic"
                className="object-contain w-12 rounded-full cursor-pointer p-[1.5px] border-[3px] border-pink-400"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
