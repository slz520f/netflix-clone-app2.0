
// 'use client'

// import useCurrentUser from "@/hooks/useCurrentUser";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import MovieList from "@/components/MovieList";
// import Billboard from "@/components/Billboard";
// import useMovieList from "@/hooks/useMovieList";
// import useFavorites from "@/hooks/useFavorites";
// import InfoModal from "@/components/InfoModal";
// import useInfoModal from "@/hooks/useInfoModal";

// export default function Home() {
//   const router = useRouter();
//   const { data: user, isLoading, error, isUnauthenticated } = useCurrentUser();
//   const { data: movies = [] } = useMovieList();
//   const {data:favorites=[]}=useFavorites();
//   const {isOpen,closeModal}=useInfoModal();

//   if (isLoading) return <LoadingScreen />;
//   if (error) return <ErrorScreen />;
  
//   return (
//     <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
//       <div className="bg-black w-full h-full lg:bg-opacity-50">
//         <InfoModal visible={isOpen} onClose={closeModal}/>
//         <Navbar />
//         <Billboard />
//         <div className="pb-40">
//           <MovieList title="Trending Now" data={movies} />
//           <MovieList title="My List" data={favorites} />
//         </div>

//         {isUnauthenticated ? <AuthPlaceholder /> : <WelcomeMessage />}
//       </div>
//     </div>
//   );
// }

// // **Loading 状态**
// const LoadingScreen = () => (
//   <div className="flex items-center justify-center h-screen">
//     <p className="text-white">Loading...</p>
//   </div>
// );

// // **Error 处理**
// const ErrorScreen = () => (
//   <div className="flex items-center justify-center h-screen">
//     <p className="text-red-500">Error loading user data</p>
//   </div>
// );

// // **未认证时显示占位 UI**
// const AuthPlaceholder = () => (
//   <div className="flex justify-center">
//     <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
//       {/* 登录按钮已移除 */}
//     </div>
//   </div>
// );

// // **认证成功时的欢迎消息**
// const WelcomeMessage = () => (
//   <div className="flex justify-center items-center h-full">
//     <h1 className="text-white text-5xl">Welcome to Netflix</h1>
//   </div>
// );
'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import useInfoModal from '@/hooks/useInfoModal'
import InfoModal from '@/components/InfoModal'
import Navbar from '@/components/Navbar'
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'

export default function Home() {
  const router = useRouter()
  const { status } = useSession()
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()
 

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return null // 已经触发跳转，短暂返回null
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <InfoModal visible={isOpen} onClose={closeModal}/>
        <Navbar />
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
          <MovieList title="My List" data={favorites} />
        </div>
      </div>
    </div>
  )
}