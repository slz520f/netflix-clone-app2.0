
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

interface BillboardMovie {
  id:string
  thumbnailUrl: string;
  videoUrl: string;
  title?: string;
  description?: string;
}

const useBillboard = () => {
  const { data, error, isLoading } = useSWR<BillboardMovie>("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data,
    error,
    isLoading
  };
};

export default useBillboard;