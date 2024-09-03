import asyncHandler from "express-async-handler";
import axios from "axios";



// @desc Get 
// @route GET /api/map/locations
// @access public
const getLocations = asyncHandler(async (req, res) => {
    const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_KEY;

    const {
        cityName,
        locationType,
    } = req.body;

    const uri = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName}%20in%20${locationType}&key=${GOOGLE_MAPS_API_KEY}`;

    const { data } = await axios.get(uri);

    if (data) {
        res.json(data);
    } else {
        res.status(404);
        throw new Error("Cannot fetch locations");
    }
});

export { getLocations };