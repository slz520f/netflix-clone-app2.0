"use client";
import { useEffect } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { use } from "react"; // 必须导入 use
import { FaArrowLeft } from "react-icons/fa";

interface WatchParams {
  movieId: string;
}

const WatchPage = ({ params }: { params: Promise<WatchParams> }) => {
  const router = useRouter();
  const { movieId } = use(params); // 使用 React.use() 解包 Promise
  const { data, error, isLoading } = useMovie(movieId);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video && data?.videoUrl) {
      video.muted = true;
      video.play().catch(e => console.log('播放失败:', e));
    }
  }, [data?.videoUrl]);

  if (isLoading) return <div className="text-white">加载中...</div>;
  if (error) return <div className="text-white">加载失败，请重试</div>;
  if (!data) return <div className="text-white">没有找到该视频</div>;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <FaArrowLeft 
          className="text-white cursor-pointer hover:opacity-80 transition" 
          size={40} 
          onClick={() => router.back()} 
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data.title}
        </p>
      </nav>
      <video
        key={data.videoUrl}
        controls
        className="h-full w-full object-contain"
        src={data.videoUrl}
        autoPlay
        muted
        playsInline
        onError={(e) => console.error("视频错误:", e.currentTarget.error)}
      />
    </div>
  );
};

export default WatchPage;