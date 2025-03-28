
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher, {
    shouldRetryOnError: false, 
    revalidateOnFocus: false, 
  });
  
  return { 
    data, 
    error, 
    isLoading,
    mutate,
    isUnauthenticated: error?.status === 401 
  };
};

export default useCurrentUser;