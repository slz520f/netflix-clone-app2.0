"use client"
import {  useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from "react-icons/fa6";
interface PlayButtonProps{
    movieId:string;
}
const PlayButton:React.FC<PlayButtonProps>=({movieId})=>{
    const router =useRouter();
    const handlePlay = () => {
        try {
          router.push(`/watch/${movieId}`);
        } catch (error) {
          console.error("Navigation failed:", error);
        }
      };
    return(
        <button onClick={handlePlay} 
        className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition'>
            <FaPlay className='mr-1' size={25} />
            Play

        </button>
    )
}
export default PlayButton;