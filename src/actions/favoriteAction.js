import axios from "axios";
import {
    FAVORITES_ADD_ITEM,
    FAVORITES_REMOVE_ITEM,
} from "../constants/favoritesConstants";

export const addToFavorites = (data) => async (dispatch, getState) => {
    dispatch({
        type: FAVORITES_ADD_ITEM,
        payload: {
            id: data.place_id,
            data: data,
        }
    });

    localStorage.setItem("favoriteItems", JSON.stringify(getState().favorites.favoriteItems));
};

export const removeFromFavorites = (id) => (dipatch, getState) => {
    dipatch({ type: FAVORITES_REMOVE_ITEM, payload: id });
    localStorage.setItem("favoriteItems", JSON.stringify(getState().favorites.favoriteItems));
};
