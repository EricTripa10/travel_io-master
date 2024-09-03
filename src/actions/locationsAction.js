import axios from "axios";
import { LOCATION_SUCCESS, LOCATION_FAIL, LOCATION_REQUEST } from "../constants/locationsConstants";


export const getLocations = (requiredLocation) => async (dispatch) => {
    try {
        dispatch({ type: LOCATION_REQUEST });

        const { data } = await axios.post("/api/map/locations", requiredLocation);

        dispatch({
            type: LOCATION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOCATION_FAIL,
            payload:
                error.response && error.response.data.error_message
                    ? error.response.data.error_message
                    : error.message,
        });
    }
};

