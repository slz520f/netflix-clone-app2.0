'use client'

import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";


export default function Profiles() {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&apos;s watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img src="/defaultblue.jpg" alt="Profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {user?.name || user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}