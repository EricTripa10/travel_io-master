import express from "express";
const router = express.Router();
import {
    getLocations,
} from "../controllers/mapController.js";

// Defining the locations routes

router.route("/locations").post(getLocations);

export default router;
