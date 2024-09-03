import { FAVORITES_ADD_ITEM, FAVORITES_REMOVE_ITEM } from "../constants/favoritesConstants";

export const favoritesReducer = (
    state = { favoriteItems: [] },
    action
) => {
    switch (action.type) {
        case FAVORITES_ADD_ITEM:
            const item = action.payload
            const existItems = state.favoriteItems.find(
                (x) => x.id === item.id
            );

            if (existItems) {
                return {
                    ...state,
                    favoriteItems: state.favoriteItems.map((x) =>
                        x.id === existItems.id ? item : x
                    ),
                };
            } else {
                return { ...state, favoriteItems: [...state.favoriteItems, item] };
            }
        case FAVORITES_REMOVE_ITEM:
            return {
                ...state,
                favoriteItems: state.favoriteItems.filter((x) => x.id !== action.payload),
            };
        default:
            return state;
    }
};
