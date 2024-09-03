import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers";
import { locationsReducer, selectedFavoriteReducer, selectedLocationReducer } from "./reducers/locationsReducers";
import { favoritesReducer } from "./reducers/favoritesReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    locations: locationsReducer,
    selectedLocation: selectedLocationReducer,
    selectedFavorite: selectedFavoriteReducer,
    favorites: favoritesReducer,
});



const favoriteItemsFromStorage = localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems"))
    : [];


const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    favorites: {
        favoriteItems: favoriteItemsFromStorage,
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
