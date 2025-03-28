import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import React from "react";

interface AccountMenuProps{
    visible?:boolean;
}
const AccountMenu: React.FC<AccountMenuProps>= ({visible})=>{
    const {data} =useCurrentUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            redirect: false, // 禁用默认重定向
        });
        router.push("/auth/login"); // 手动跳转到登录页
    };
    if(!visible){
        return null;
    };
    return(
        <div className="bg-black w-56 absolute top-24 right-0 py-5 flex-col border-2 border-gray-800 flex z-50 ">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 item-center w-full">
                    <img src="/defaultblue.jpg" alt="" className="w-6 h-6 rounded object-cover"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        {data?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4 z-51" />
                <div onClick={handleSignOut} className=" px-3 text-center text-white text-sm hover:underline" >
                    Sign out of Netflix

                </div>
            </div>

        
        </div>

    )
};
export default AccountMenu;