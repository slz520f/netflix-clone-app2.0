
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { AxiosError } from 'axios';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        if (!movieId) {
            console.error("Error: movieId is undefined");
            return;
        }

        let response;
        try {
            if (isFavorite) {
                response = await axios.delete("/api/favorite", {
                    headers: { "Content-Type": "application/json" },
                    data: { movieId },
                });
            } else {
                response = await axios.post("/api/favorite", { movieId }, {
                    headers: { "Content-Type": "application/json" },
                });
            }

            console.log("Response:", response.data);
            mutate({ ...currentUser, favoriteIds: response.data.favoriteIds });
            mutateFavorites();
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Error toggling favorite:", error.response?.data || error.message);
              } else {
                console.error("An unexpected error occurred:", error);
              }
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
        >
            <Icon className="text-black" size={25} />
        </div>
    );
};

export default FavoriteButton;
