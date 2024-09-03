import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Badge, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faMapLocation,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import { removeFromFavorites } from "../actions/favoriteAction";

export const Favorites = () => {
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;

  const [favorites, setFavorites] = useState([]);
  const [toRemove, setToRemove] = useState(null);

  const favoriteData = useSelector((state) => state.favorites);
  const { favoriteItems } = favoriteData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteItems) {
      setFavorites(favoriteItems);
    }
  }, [favoriteItems]);

  const sendLocation = (location) => {
    dispatch({ type: "SELECT_FAVORITE", payload: location });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleRemove = (id) => {
    setToRemove(id);
    setTimeout(() => {
      dispatch(removeFromFavorites(id));
    }, 300); // Match this duration with the CSS animation duration
  };

  return (
    <Container>
      <h1>Favorites</h1>
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
            {favorites && favorites.length === 0 ? (
              <h5 style={{ opacity: "50%", margin: "2rem" }}>Empty</h5>
            ) : null}
            {favorites &&
              favorites.map((favorite) => (
                <Card
                  key={favorite.data.place_id}
                  className={`m-2 ${
                    toRemove === favorite.id ? "fade-out" : ""
                  }`}
                  style={{ width: "19rem", height: "28rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      favorite.data.photos
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${favorite.data.photos[0]?.photo_reference}&key=${GOOGLE_KEY}`
                        : "https://via.placeholder.com/150"
                    }
                    style={{ height: "12rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{favorite.data.name}</Card.Title>
                    <Rating
                      value={favorite.data.rating}
                      text={`${favorite.data.rating} reviews (${favorite.data.user_ratings_total})`}
                      color="#f8e825"
                    />

                    {favorite.data.opening_hours &&
                    favorite.data.opening_hours.open_now ? (
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
                      {favorite.data.formatted_address}
                    </h6>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      className="me-2"
                      onClick={() => sendLocation(favorite)}
                    >
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        size="1x"
                        cursor="pointer"
                      />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(favorite.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        cursor="pointer"
                      />
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
