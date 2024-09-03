import { Container, Row, Col } from "react-bootstrap";
import MapComponent from "../components/MapComponent";
import { Favorites } from "../components/Favorites";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const FavoritePage = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Container className="mt-5">
        <Row>{userInfo && <MapComponent />}</Row>
        <Row>
          <Col className="bg-white">
            <Favorites />
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
