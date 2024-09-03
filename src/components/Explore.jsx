import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { citiesData } from "../data/city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faSearch,
  faCrown,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../actions/locationsAction";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";

export const Explore = () => {
  //Useful constants and variables
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;
  const dispatch = useDispatch();

  //State definitions
  const [cities, setCities] = useState(citiesData);
  const [restaurant, setRestaurant] = useState([]);
  const [choices, setChoices] = useState([
    { id: 1, name: "Restaurants" },
    { id: 2, name: "Hotels" },
    { id: 3, name: "Attractions" },
  ]);

  //Redux state
  const [city, setCity] = useState("");
  const [locationType, setLocationType] = useState("Restaurants");

  const locationsDetails = useSelector((state) => state.locations);
  const { loading, error, locations } = locationsDetails;

  //Change location results when locations are fetched
  useEffect(() => {
    if (locations.results) {
      setRestaurant(locations.results);
    }
  }, [locations]);

  //Fetch locations
  const updateData = async () => {
    const locationDetails = {
      cityName: city,
      locationType: locationType,
    };
    dispatch(getLocations(locationDetails));
  };

  //Send location to the store
  const sendLocation = (location) => {
    dispatch({ type: "SELECT_LOCATION", payload: location });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <h1>Explore</h1>
      <Row className="py-3">
        <Col md={6} xs={6}>
          <Form.Select
            aria-label="Select City"
            onChange={(e) =>
              e.target.value !== "Select City" ? setCity(e.target.value) : null
            }
          >
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3} xs={4}>
          <Form.Select
            aria-label="Select Location Type"
            onChange={(e) => setLocationType(e.target.value)}
          >
            {choices.map((choice) => (
              <option key={choice.id}>{choice.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} xs={1}>
          <Button variant="dark" onClick={updateData}>
            <FontAwesomeIcon icon={faSearch} size="1x" cursor="pointer" />
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <div
            className="align-items-center d-flex flex-wrap justify-content-center"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {" "}
            {locations && restaurant.length === 0 ? (
              <h5 style={{ opacity: "50%", margin: "2rem" }}>
                Nothing to display
              </h5>
            ) : null}
            {locations &&
              restaurant.map((restaurant) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  key={restaurant.place_id}
                >
                  <Card
                    className="m-2"
                    style={{ width: "19rem", height: "28rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        restaurant.photos
                          ? ` https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0]?.photo_reference}&key=${GOOGLE_KEY}`
                          : "https://via.placeholder.com/150"
                      }
                      style={{ height: "12rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{restaurant.name}</Card.Title>
                      <Rating
                        value={restaurant.rating}
                        text={`${restaurant.rating} reviews (${restaurant.user_ratings_total})`}
                        color="#f8e825"
                      />

                      {restaurant.opening_hours &&
                      restaurant.opening_hours.open_now ? (
                        <Badge className="mt-2 mb-2" bg="success">
                          Open
                        </Badge>
                      ) : (
                        <Badge className="mt-2 mb-2" bg="danger">
                          Closed
                        </Badge>
                      )}

                      <h6>
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          size="1x"
                          cursor="pointer"
                          className="me-2"
                        />
                        {restaurant.formatted_address?.length > 60
                          ? `${restaurant.formatted_address.substring(
                              0,
                              60
                            )}...`
                          : restaurant.formatted_address}
                      </h6>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="me-2"
                        onClick={(e) => sendLocation(restaurant)}
                      >
                        <FontAwesomeIcon
                          icon={faMapLocation}
                          size="1x"
                          cursor="pointer"
                        />
                      </Button>
                      <FavoriteButton restaurant={restaurant} />
                    </Card.Footer>
                  </Card>
                </motion.div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
