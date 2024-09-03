import { LOCATION_SUCCESS, LOCATION_REQUEST, LOCATION_FAIL, SELECT_LOCATION, SELECT_FAVORITE } from "../constants/locationsConstants";

export const locationsReducer = (state = { locations: {} }, action) => {
    switch (action.type) {
        case LOCATION_REQUEST:
            return { ...state, loading: true };
        case LOCATION_SUCCESS:
            return { loading: false, locations: action.payload };
        case LOCATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const selectedLocationReducer = (state = { selectedLocation: {} }, action) => {
    switch (action.type) {
        case SELECT_LOCATION:
            return { selectedLocation: action.payload };
        default:
            return state;
    }
};

export const selectedFavoriteReducer = (state = { selectedLocation: {} }, action) => {
    switch (action.type) {
        case SELECT_FAVORITE:
            if (action.payload === null) {
                return { selectedFavorite: null };
            }
            return { selectedFavorite: action.payload };
        default:
            return state;
    }
};

