"use client"
import React from 'react';
import { FaPlay } from "react-icons/fa6";
import FavoriteButton from './FavoriteButton';
import { useRouter } from 'next/navigation';
import useInfoModal from '@/hooks/useInfoModal';
import { IoChevronDown } from "react-icons/io5";
import Image from 'next/image';
interface Movie {
    id: string;
    title: string;
    description: string;
    thumbnailUrl:string;
    genre   :     string;
    duration  :   string;
}

interface MovieCardProps {
    data: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router =useRouter();
    const {openModal} =useInfoModal();
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            {/* サムネイル画像 */}
            <Image fill
                className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" 
                src={data.thumbnailUrl} 
                alt="Thumbnail" 
            />
            
            {/* ホバー時に表示される詳細情報 */}
            <div className="opacity-0 absolute top-[10%] transition duration-200 z-10 hidden sm:block delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                {/* 拡大された画像 */}
                <Image fill
                    className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" 
                    src={data.thumbnailUrl} 
                    alt="Thumbnail" 
                />
                
                {/* 情報カード */}
                <div className="z-10 bg-zinc-100 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <div 
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                            onClick={() => router.push(`/watch/${data?.id}`)}
                        >
                            <FaPlay size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id}/>
                        <div onClick={()=>openModal(data?.id)}
                        className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
                            <IoChevronDown  className='text-white group-hover/item:text-neutral-300' size={30}/>
                        </div>
                    </div>
                    
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-black">2023</span>
                    </p>
                    
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-black text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-black text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
