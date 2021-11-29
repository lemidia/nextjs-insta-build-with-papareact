import { getProviders, signIn as nextSignIn } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <div>
      <Header />
      <div className="text-center mt-52">
        <img
          src="http://localhost:3000/_next/image?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F2a%2FInstagram_logo.svg%2F1600px-Instagram_logo.svg.png&w=2048&q=75"
          alt=""
          className="h-28 inline"
        />
        <p className="text-xl text-gray-600 mt-3 mb-10">
          Looking for the Awesome World around you!{" "}
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="border border-gray-500 p-3 rounded-lg"
              onClick={() => nextSignIn(provider.id, { callbackUrl: "/" })}
            >
              Sign In with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
