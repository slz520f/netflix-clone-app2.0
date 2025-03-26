// import fetcher from "@/app/lib/fetcher";
// import useSWR from "swr";

// // 获取当前用户
// const useCurrentUser = () => {
//   const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
//   return { data, error, isLoading, mutate };
// };

// export default useCurrentUser;
// src/hooks/useCurrentUser.ts
import fetcher from "@/app/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher, {
    shouldRetryOnError: false, // 不重试错误
    revalidateOnFocus: false, // 不自动重新验证
  });
  
  return { 
    data, 
    error, 
    isLoading,
    mutate,
    isUnauthenticated: error?.status === 401 // 添加未登录状态标识
  };
};

export default useCurrentUser;