import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../actions/favoriteAction";
const FavoriteButton = ({ restaurant }) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToFavorites(restaurant));
    setIsClicked(!isClicked);
  };

  return (
    <Button
      className={`button-favorite ${isClicked ? "clicked" : ""}`}
      variant="warning"
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faCrown}
        size="1x"
        cursor="pointer"
        className={`icon ${isClicked ? "clicked" : ""}`}
        color="white"
      />
    </Button>
  );
};

export default FavoriteButton;
