// 'use client'

// import { signIn } from "next-auth/react";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";

// export default function Home() {
//   const router = useRouter();
//   const { data: user, isLoading, error, isUnauthenticated } = useCurrentUser();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-white">Loading...</p>
//       </div>
//     );
//   }

//   if (isUnauthenticated) {
//     return (
//       <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
//         <div className="bg-black w-full h-full lg:bg-opacity-50">
//           <Navbar />
//           <div className="flex justify-center">
//             <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
//               <h2 className="text-white text-4xl mb-8 font-semibold">
//                 Sign in
//               </h2>
//               <button 
//                 onClick={() => signIn()}
//                 className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">Error loading user data</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
//       <Navbar />
//       <div className="flex justify-center items-center h-full">
//         <h1 className="text-white text-5xl">Welcome to Netflix</h1>
//       </div>
//     </div>
//   );
// } ホームページ内ボタンある
'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { data: user, isLoading, error, isUnauthenticated } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (isUnauthenticated) {
    return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <Navbar />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              {/* <h2 className="text-white text-4xl mb-8 font-semibold">
                Welcome
              </h2> */}
              {/* 移除了登录按钮 */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading user data</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <h1 className="text-white text-5xl">Welcome to Netflix</h1>
      </div>
    </div>
  );
}