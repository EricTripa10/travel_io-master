import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import view from "../assets/view.jpg";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <Container
        fluid
        className="base-container align-items-center p-5 mt-5 card-bg"
      >
        <Row className="align-items-center">
          <Col md={6} className="mb-3">
            <h1>Welcome to Travel.io</h1>
            <p className="lead">Explore Romania with us</p>
            <hr />
            <p style={{ textAlign: "justify" }}>
              Travel.io is a travel app that allows you to explore the beautiful
              country of Romania. You can discover new places, save your
              favorite locations, and get directions to your favorite spots.
            </p>
            <Col className="">
              <Button
                variant="outline-primary"
                href="/explore"
                className="mt-3"
              >
                Explore
              </Button>
            </Col>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5 }}
            >
              <Image src={view} alt="Background" loading="lazy" fluid rounded />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
