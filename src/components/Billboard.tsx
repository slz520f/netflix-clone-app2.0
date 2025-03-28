import React, { useCallback, useRef } from 'react';
import useBillboard from '@/hooks/useBillboard';
import { IoIosInformationCircleOutline } from "react-icons/io";
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
  const { data } = useBillboard();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useInfoModal(); 

  const handleOpenModal = useCallback(() => {
    console.log("More Info 按钮被点击");  
    if (data?.id) {
      console.log("打开 Modal movieId:", data.id);  
      openModal(data.id);
    } else {
      console.log("data.id 为空");  
    }
  }, [openModal, data?.id]);
  

  if (!data) return null;

  return (
    <div className="relative h-[56.25vw] ">
      <video
        ref={videoRef}
        src={data.videoUrl}
        className="w-full h-full object-cover brightness"
        muted
        loop
        autoPlay
        playsInline
        poster={data.thumbnailUrl}
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="bg-[rgba(255,255,255,0.3)] text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <IoIosInformationCircleOutline className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
